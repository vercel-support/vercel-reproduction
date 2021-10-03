import prisma from "../../lib/prisma";
import { isEmpty } from "lodash";
import { uploadImageToBunny } from "../bunny/upload";
import { uploadToKV } from "utils/kv";

export const profileUpdate = async (entry, refresh = false) => {
  const profile_pic = await uploadImageToBunny({
    type: "profile",
    slug: entry.username,
    image: entry.profile_pic_url,
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

  const cdnImages = entry.nodes.map((item) => {
    const thumbnail = uploadImageToBunny({
      type: "profile",
      slug: entry.username,
      image: item.thumbnail,
      name: item.id,
    });

    return thumbnail;
  });

  const resolvedImages = await Promise.all(cdnImages);

  const refreshEntries = {
    is_private: entry.is_private,
    is_verified: entry.is_verified,
    full_name: entry.full_name,
    profile_pic_url: profile_pic,
    biography: entry.biography,
    post_amount: entry.post_amount,
    follower: entry.follower,
    following: entry.following,
  };

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

  const cachedUser = {
    ...refreshEntries,
    username: entry.username,
    id: entry.id,
    nodes: cachedNodes,
    timeline: cachedNodes.slice(0, 24),
    timeRanges: {
      new: cachedNodes?.[0]?.date ?? "",
      old: cachedNodes?.[cachedNodes.length - 1]?.date ?? "",
    },
  };

  console.time("updating kv profile data", entry.username);
  await uploadToKV({
    type: "profile",
    key: entry.username,
    value: cachedUser,
  });
  console.timeEnd("updating kv profile data", entry.username);

  const profile = await prisma.profile.update({
    where: {
      username: entry.username,
    },
    data: {
      ...(refresh ? { ...refreshEntries } : {}),
      nodes: {
        upsert: entry.nodes.map((node, index) => {
          const locationProps = {
            ...(node.location
              ? {
                  imageLocations: {
                    create: {
                      location: {
                        connectOrCreate: {
                          where: {
                            id: node.location.id,
                          },
                          create: {
                            id: node.location.id,
                            slug: node.location.slug,
                            name: node.location.name,
                          },
                        },
                      },
                    },
                  },
                }
              : {}),
          };

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
              ...(Object.keys(locationProps).length == 0 ? {} : locationProps),
              ...(Object.keys(tagProps).length == 0 ? {} : tagProps),
              ...(Object.keys(hashtagProps).length == 0 ? {} : hashtagProps),
            },
          };
        }),
      },
    },
  });

  return profile;
};
