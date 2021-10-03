const proxy_link = (media) => {
  const proxy = "https://flat-disk-f8fd.instasuche.workers.dev/";
  return media?.includes("img-wmc")
    ? media
    : `${proxy}?url=${encodeURIComponent(media)}`;
};

module.exports = { proxy_link };
