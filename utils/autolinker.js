import Autolinker from "autolinker";

export const createLink = (caption) => {
  const hashtags = new Map();
  const tags = new Map();

  const replaceFn = (match) => {
    switch (match.getType()) {
      case "hashtag": {
        const hashtag = match.getHashtag().toLowerCase();
        hashtags.set(hashtag, {
          name: "#" + hashtag,
          amount: (hashtags.get(hashtag)?.amount ?? 0) + 1,
        });

        return `<a href="/tag/${hashtag}">#${hashtag}</a>`;
      }

      case "mention": {
        const username = match.getMention().toLowerCase();
        tags.set(username, {
          name: "@" + username,
          amount: (tags.get(username)?.amount ?? 0) + 1,
        });

        return `<a href="/profile/${username}">@${username}</a>`;
      }
    }
  };

  const linkCaption = Autolinker.link(caption, {
    hashtag: "instagram",
    mention: "instagram",
    replaceFn,
  });

  return {
    tags: [...tags.values()],
    hashtags: [...hashtags.values()],
    linkCaption,
  };
};
