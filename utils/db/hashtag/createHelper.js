import prisma from "../../../lib/prisma";
import { isEmpty } from "lodash";
import { uploadImageToBunny } from "../../bunny/upload";

export const hashtagCreation = async (entry) => {
  const thumbnail =
    (await uploadImageToBunny({
      type: "hashtag",
      slug: entry.name,
      image: entry.thumbnail,
      name: "profile_pic",
    })) || null;

  //const missingNodes = await Promise.all(
  //entry.nodes.map(async (node) => {
  //const image = await prisma.image.findUnique({ where: { id: node.id } });

  //if (image && image.thumbnail.includes("img-wmc")) {
  //return {
  //exists: true,
  //node,
  //};
  //} else
  //return {
  //exists: false,
  //node,
  //};
  //})
  //);

  const cdnImages = entry.nodes.map((item) => {
    const thumbnail = uploadImageToBunny({
      type: "hashtag",
      slug: entry.name,
      image: item.thumbnail,
      name: item.id,
    });

    return thumbnail;
  });

  console.time("hashtag resolve");
  const resolvedImages = await Promise.all(cdnImages);
  console.timeEnd("hashtag resolve");

  const data = {
    id: entry.id,
    name: entry.name,
    post_count: entry.post_count,
    thumbnail,
  };

  const nodes = {
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
          //...(Object.keys(locationProps).length == 0 ? {} : locationProps),
          ...(Object.keys(tagProps).length == 0 ? {} : tagProps),
          ...(Object.keys(hashtagProps).length == 0 ? {} : hashtagProps),
        },
      };
    }),
  };

  const hashtagData = {
    ...data,
    nodes,
  };

  console.time("hashtag");
  const hashtag = await prisma.hashtag.upsert({
    where: {
      name: entry.name,
    },
    create: hashtagData,
    update: hashtagData,
  });
  console.timeEnd("hashtag");

  return hashtag;
};
