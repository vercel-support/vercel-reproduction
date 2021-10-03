import { createLink } from "../autolinker";

const dataPath = {
  base: (json) => json?.graphql?.hashtag,
  fallback: (json) => json?.entry_data?.TagPage?.[0]?.graphql?.hashtag,
};

const parseTagJson = (json, type = "base") => {
  const tag = dataPath[type](json) ?? false;

  if (!tag) throw new Error();

  const {
    id,
    name,
    profile_pic_url,
    edge_hashtag_to_media,
    edge_hashtag_to_top_posts,
  } = tag;
  const { count: post_count } = edge_hashtag_to_media;

  let nodes = [];
  let counter = 0;

  const loopHelper = (source, topPost = false) => {
    for (const edge of source?.edges) {
      const { node } = edge;
      const media = {};

      const seconds = node?.taken_at_timestamp;
      const date = new Date(0);
      date.setUTCSeconds(seconds);

      let caption =
        node?.edge_media_to_caption?.edges.length > 0
          ? node?.edge_media_to_caption?.edges[0]?.node.text
          : "";

      topPost ? (media.topPost = true) : "";

      media.order = counter++;
      media.id = node?.id;
      media.shortcode = node?.shortcode;

      media.timestamp = node?.taken_at_timestamp;
      media.day = date.getUTCDay();
      media.hour = date.getUTCHours();

      media.comment_count = node?.edge_media_to_comment?.count ?? 0;
      media.liked = node?.edge_media_preview_like?.count ?? 0;
      media.owner = node?.owner?.id;
      media.thumbnail = node?.thumbnail_src;
      media.date = date.toLocaleDateString("en-US");
      media.caption = caption;

      const { tags, hashtags, linkCaption } = createLink(caption);

      media.link_caption = linkCaption;
      media.tags = tags;
      media.hashtags = hashtags;

      nodes.push(media);
    }
  };

  loopHelper(edge_hashtag_to_top_posts, true);
  loopHelper(edge_hashtag_to_media);

  return {
    id,
    name,
    thumbnail: profile_pic_url,
    post_count,
    nodes,
  };
};

module.exports = { parseTagJson };
