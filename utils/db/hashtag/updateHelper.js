import prisma from "../../../lib/prisma";
import { isEmpty } from "lodash";
import { uploadImageToBunny } from "../../bunny/upload";
import { uploadToKV } from "utils/kv";

export const hashtagUpdate = async (entry) => {
  const thumbnail = await uploadImageToBunny({
    type: "hashtag",
    slug: entry.name,
    image: entry.thumbnail,
    name: "profile_pic",
  });

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

  const cdnImages = missingNodes.map((item) => {
    const thumbnail = uploadImageToBunny({
      type: "hashtag",
      slug: entry.name,
      image: item.thumbnail,
      name: item.id,
    });

    return thumbnail;
  });

  const resolvedImages = await Promise.all(cdnImages);

  const cachedNodes = entry.nodes.map((node, index) => {
    return {
      id: node.id,
      thumbnail: resolvedImages[index],
      shortcode: node.shortcode,
      liked: node.liked,
      comment_count: node.comment_count,
      engagement_rate: node.engagement_rate,
      day: node.day,
      hour: node.hour,
      date: node.date,
      caption: node.link_caption,
      tags: node?.tags || [],
      hashtags: node?.hashtags || [],
      locations: node?.locations || [],
    };
  });

  const cachedHashtag = {
    name: entry.name,
    id: entry.id,
    thumbnail,
    post_count: entry.post_count,
    nodes: cachedNodes,
  };

  console.time("updating hashtag kv data", entry.name);
  await uploadToKV({
    type: "hashtag",
    key: entry.name,
    value: cachedHashtag,
  });
  console.timeEnd("updating hashtag kv data", entry.name);

  const hashtag = await prisma.hashtag.update({
    where: {
      name: entry.name,
    },
    data: {
      thumbnail,
      post_count: entry.post_count,
      nodes: {
        upsert: entry.nodes.map((node, index) => {
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
            update: {
              ...dynamicProps,
            },
            create: {
              ...staticProps,
              ...dynamicProps,
              //...(Object.keys(locationProps).length == 0 ? {} : locationProps),
              ...(Object.keys(tagProps).length == 0 ? {} : tagProps),
              ...(Object.keys(hashtagProps).length == 0 ? {} : hashtagProps),
            },
          };
        }),
      },
    },
  });

  return hashtag;
};
