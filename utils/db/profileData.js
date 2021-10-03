import prisma from "../../lib/prisma";

export const profileData = async (username) => {
  console.time("prisma");
  let user = await prisma.profile.findUnique({
    where: {
      username,
    },
    include: {
      nodes: {
        orderBy: {
          id: "desc",
        },
        include: {
          imageTags: true,
          imageHashtags: true,
          imageLocations: {
            select: {
              location: true,
            },
          },
        },
      },
    },
  });

  console.timeEnd("prisma");

  return user;
};
