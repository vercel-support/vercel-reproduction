import prisma from "../../../lib/prisma";
import { isEmpty } from "lodash";
import { uploadImageToBunny } from "../../bunny/upload";

export const locationCreation = async (entry) => {
  const thumbnail =
    (await uploadImageToBunny({
      type: "location",
      slug: entry.slug,
      image: entry.thumbnail,
      name: "profile_pic",
    })) || null;

  const missingNodes = await Promise.all(
    entry.nodes.map(async (node) => {
      const image = await prisma.image.findUnique({ where: { id: node.id } });

      if (image && image.thumbnail.includes("img-wmc")) {
        return {
          exists: true,
          node,
        };
      } else
        return {
          exists: false,
          node,
        };
    })
  );

  const cdnImages = missingNodes.map((item) => {
    if (item.exists) return item.node.thumbnail;

    const thumbnail = uploadImageToBunny({
      type: "location",
      slug: entry.slug,
      image: item.node.thumbnail,
      name: item.node.id,
    });

    return thumbnail;
  });

  const resolvedImages = await Promise.all(cdnImages);

  const data = {
    id: entry.id,
    name: entry.name,
    slug: entry.slug,
    post_count: entry.post_count,
    thumbnail,
    nodes: {
      connectOrCreate: entry.nodes.map((node, index) => {
        const tagValues = Object.values(node.tags ?? {}).filter(
          (x) => !isEmpty(x)
        );

        const tagProps = {
          ...(tagValues
            ? {
                imageTags: {
                  create: tagValues.map((tag) => {
                    const { name, amount: count } = tag;

                    const username = name.substring(1);

                    return {
                      profile: {
                        connectOrCreate: {
                          where: {
                            username,
                          },
                          create: {
                            username,
                          },
                        },
                      },
                      count,
                    };
                  }),
                },
              }
            : {}),
        };

        const hashtagValues = Object.values(node.hashtags ?? {}).filter(
          (x) => !isEmpty(x)
        );

        const hashtagProps = {
          ...(hashtagValues
            ? {
                imageHashtags: {
                  create: hashtagValues.map((tag) => {
                    let { name, amount: count } = tag;
                    name = name.substring(1);

                    return {
                      hashtag: {
                        connectOrCreate: {
                          where: {
                            name,
                          },
                          create: {
                            name,
                          },
                        },
                      },
                      count,
                    };
                  }),
                },
              }
            : {}),
        };

        const staticProps = {
          id: node.id,
          shortcode: node.shortcode,
          day: node.day,
          hour: node.hour,
          date: node.date,
          thumbnail: resolvedImages[index],
          caption: JSON.stringify(node.link_caption),
        };

        const dynamicProps = {
          liked: node.liked,
          comment_count: node.comment_count,
          engagement_rate: node.engagement_rate,
        };

        return {
          where: { id: node.id },
          create: {
            ...staticProps,
            ...dynamicProps,
            ...(Object.keys(tagProps).length == 0 ? {} : tagProps),
            ...(Object.keys(hashtagProps).length == 0 ? {} : hashtagProps),
          },
        };
      }),
    },
  };

  const location = await prisma.location.upsert({
    where: {
      id: entry.id,
    },
    create: data,
    update: data,
  });

  return location;
};
