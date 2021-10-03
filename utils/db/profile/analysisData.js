import prisma from "../../../lib/prisma";

export const profileAnalysisData = async (username) => {
  let { _sum } = await prisma.image.aggregate({
    where: {
      profile: {
        username,
      },
    },
    _sum: {
      liked: true,
      comment_count: true,
    },
  });

  let { liked, comment_count } = _sum;

  const dayData = await prisma.image.groupBy({
    by: ["day"],
    where: {
      profile: {
        username,
      },
    },
    _count: {
      day: true,
    },
  });

  const hourData = await prisma.image.groupBy({
    by: ["hour"],
    where: {
      profile: {
        username,
      },
    },
    _count: {
      hour: true,
    },
  });

  let hashtags = await prisma.imageHashtags.groupBy({
    by: ["name"],
    where: {
      node: {
        profileUsername: username,
      },
    },
    _sum: {
      count: true,
    },
  });

  hashtags = hashtags.map((x) => {
    return {
      name: x.name,
      amount: x._sum.count,
    };
  });

  let tags = await prisma.imageTags.groupBy({
    by: ["username"],
    where: {
      node: {
        profileUsername: username,
      },
    },
    _sum: {
      count: true,
    },
  });

  tags = tags.map((x) => {
    return {
      name: "@" + x.username,
      amount: x._sum.count,
    };
  });

  let locations = await prisma.imageLocations.groupBy({
    by: ["name"],
    where: {
      node: {
        profileUsername: username,
      },
    },
    _count: {
      name: true,
    },
  });

  locations = locations.map((x) => {
    return {
      name: x.name,
      amount: x._count.name,
    };
  });

  return {
    liked,
    comment_count,
    dayData,
    hourData,
    hashtags,
    tags,
    locations,
  };
};
