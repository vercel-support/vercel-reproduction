import prisma from "lib/prisma";

async function handler(req, res) {
  try {
    const users = await prisma.profile.findMany({
      where: {
        id: { not: null },
      },
    });

    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(404);
  }
}

export default handler;
