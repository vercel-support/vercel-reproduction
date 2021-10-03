import prisma from "../../../lib/prisma";

export const searchData = async (term) => {
  const search = await prisma.search.findUnique({
    where: {
      term,
    },
    include: {
      profiles: {
        orderBy: {
          order: "asc",
        },
        include: {
          profile: {
            select: {
              profile_pic_url: true,
            },
          },
        },
      },
      hashtags: {
        orderBy: {
          order: "asc",
        },
        include: {
          hashtag: {
            select: {
              post_count: true,
            },
          },
        },
      },
      locations: {
        orderBy: {
          order: "asc",
        },
        include: {
          location: true,
        },
      },
    },
  });

  return search;
};
