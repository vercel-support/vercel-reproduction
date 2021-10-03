import prisma from "../../../lib/prisma";

export const hashtagData = async (name) => {
  console.time("prisma hashtag");
  const hashtag = await prisma.hashtag.findUnique({
    where: {
      name,
    },
    include: {
      nodes: {
        orderBy: {
          date: "desc",
        },
      },
    },
  });
  console.timeEnd("prisma hashtag");

  return hashtag;
};

export const recommendedHashtags = async () => {
  try {
    const recommended = await prisma.$queryRaw(`
    SELECT name
    FROM hashtag
    TABLESAMPLE extensions.system_rows(25)
    `);

    return recommended ?? [];
  } catch (err) {
    console.error(err);
    return [];
  }
};
