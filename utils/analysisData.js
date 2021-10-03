export const prepareDayAndHourArrays = () => {
  const days = new Array(7);
  const hours = new Array(24);

  for (let i = 0; i < days.length; i++) days[i] = 0;
  for (let i = 0; i < hours.length; i++) hours[i] = 0;

  return { days, hours };
};

export const getAnalysisData = (nodes) => {
  let total_likes = 0;
  let total_comments = 0;

  const { days, hours } = prepareDayAndHourArrays();

  const tags = new Map();
  const hashtags = new Map();
  const locations = new Map();

  nodes.forEach((node) => {
    total_likes += node.liked;
    total_comments += node.comment_count;

    days[node.day]++;
    hours[node.hour]++;

    if (node.tags && node.tags.length > 0) {
      node.tags.forEach((tag) => {
        tags.set(tag.name, {
          name: tag.name,
          amount: (tags.get(tag.name)?.amount ?? 0) + tag.amount,
        });
      });
    } else if (node.imageTags && node.imageTags.length > 0) {
      node.imageTags.forEach((tag) => {
        const username = "@" + tag.username;

        tags.set(username, {
          name: username,
          amount: (tags.get(username)?.amount ?? 0) + tag.count,
        });
      });
    }

    if (node.hashtags && node.hashtags.length > 0) {
      node.hashtags.forEach((hashtag) => {
        hashtags.set(hashtag.name, {
          name: hashtag.name,
          amount: (hashtags.get(hashtag.name)?.amount ?? 0) + hashtag.amount,
        });
      });
    } else if (node.imageHashtags && node.imageHashtags.length > 0) {
      node.imageHashtags.forEach((hashtag) => {
        hashtags.set(hashtag.name, {
          name: hashtag.name,
          amount: (hashtags.get(hashtag.name)?.amount ?? 0) + hashtag.count,
        });
      });
    }

    if (node.location) {
      locations.set(node.location.name, {
        ...node.location,
        amount: (locations.get(node.location.name)?.amount ?? 0) + 1,
      });
    } else if (node.imageLocations && node.imageLocations.length > 0) {
      node.imageLocations.forEach(({ location }) => {
        locations.set(location.name, {
          ...location,
          amount: (locations.get(location.name)?.amount ?? 0) + 1,
        });
      });
    }
  });

  return {
    total_likes,
    total_comments,
    days,
    hours,
    tags: [...tags.values()],
    hashtags: [...hashtags.values()],
    locations: [...locations.values()],
  };
};
