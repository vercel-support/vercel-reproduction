import prisma from "../../../lib/prisma";

export const locationData = async (id) => {
  const location = await prisma.location.findUnique({
    where: {
      id,
    },
    include: {
      nodes: {
        orderBy: {
          date: "desc",
        },
      },
    },
  });

  return location;
};

export const recommendedLocations = async () => {
  try {
    const recommended = await prisma.$queryRaw(`
    SELECT *
    FROM location
    TABLESAMPLE extensions.system_rows(25)
    `);

    return recommended ?? [];
  } catch (err) {
    console.error(err);
    return [];
  }
};
