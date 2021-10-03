import prisma from "../../../lib/prisma";
import { uploadImageToBunny } from "../../bunny/upload";

export const searchCreation = async (entry) => {
  const profileImages = entry.userData.map((profile) => {
    const thumbnail = uploadImageToBunny({
      type: "profile",
      slug: profile.username,
      image: profile.picture,
      name: "profile_pic",
    });

    return thumbnail;
  });

  const resolvedImages = await Promise.all(profileImages);

  // add img to profile connection
  const profileUpdates = entry.userData.map((profile, index) => {
    return prisma.profile.upsert({
      where: {
        username: profile.username,
      },
      update: {
        profile_pic_url: resolvedImages[index],
      },
      create: {
        username: profile.username,
        profile_pic_url: resolvedImages[index],
      },
    });
  });

  const data = {
    term: entry.term,
    profiles: {
      create: entry.userData.map((profile, index) => {
        return {
          profile: {
            connectOrCreate: {
              where: {
                username: profile.username,
              },
              create: {
                username: profile.username,
                profile_pic_url: resolvedImages[index],
              },
            },
          },
          order: index,
        };
      }),
    },
    hashtags: {
      create: entry.hashtagData.map((hashtag, index) => {
        return {
          hashtag: {
            connectOrCreate: {
              where: {
                name: hashtag.name,
              },
              create: {
                name: hashtag.name,
                post_count: hashtag.media_count,
              },
            },
          },
          order: index,
        };
      }),
    },
    locations: {
      create: entry.locationData.map((location, index) => {
        return {
          location: {
            connectOrCreate: {
              where: {
                id: location.id,
              },
              create: {
                id: location.id,
                name: location.name,
                slug: location.slug,
              },
            },
          },
          order: index,
        };
      }),
    },
  };

  const search = prisma.search.upsert({
    where: {
      term: entry.term,
    },
    create: data,
    update: data,
  });

  try {
    await prisma.$transaction([...profileUpdates, search]);
    return { success: true };
  } catch (err) {
    return { success: false };
  }
};
