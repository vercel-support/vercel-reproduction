import prisma from "../../lib/prisma";
import { isEmpty } from "lodash";
import { uploadImageToBunny } from "../bunny/upload";

export const profileCreation = async (entry) => {
  const profile_pic = await uploadImageToBunny({
    type: "profile",
    slug: entry.username,
    image: entry.profile_pic_url,
    name: "profile_pic",
  });

  const cdnImages = entry.nodes.map((node) => {
    const thumbnail = uploadImageToBunny({
      type: "profile",
      slug: entry.username,
      image: node.thumbnail,
      name: node.id,
    });

    return thumbnail;
  });

  const resolvedImages = await Promise.all(cdnImages);

  const data = {
    id: entry.id,
    username: entry.username,
    is_private: entry.is_private,
    is_verified: entry.is_verified,
    full_name: entry.full_name,
    biography: entry.biography,
    profile_pic_url: profile_pic,
    post_amount: entry.post_amount,
    follower: entry.follower,
    following: entry.following,
  };

  // TODO add node entry
  const nodes = {
    connectOrCreate: entry.nodes.map((node, index) => {
      const locationProps = {
        ...(node.location
          ? {
              imageLocations: {
                create: {
                  location: {
                    connectOrCreate: {
                      where: {
                        name: node.location.name,
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

      const imageProps = {
        id: node.id,
        thumbnail: resolvedImages[index],
        shortcode: node.shortcode,
        liked: node.liked,
        comment_count: node.comment_count,
        engagement_rate: node.engagement_rate,
        day: node.day,
        hour: node.hour,
        date: node.date,
        caption: JSON.stringify(node.link_caption),
      };

      const dbData = {
        ...imageProps,
        ...(Object.keys(locationProps).length == 0 ? {} : locationProps),
        ...(Object.keys(tagProps).length == 0 ? {} : tagProps),
        ...(Object.keys(hashtagProps).length == 0 ? {} : hashtagProps),
      };

      return {
        where: { id: node.id },
        create: dbData,
      };
    }),
  };

  const profileData = {
    ...data,
    nodes,
  };

  const profile = await prisma.profile.upsert({
    where: {
      username: entry.username,
    },
    create: profileData,
    update: profileData,
  });

  return profile;
};
