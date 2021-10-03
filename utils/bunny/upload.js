import axios from "axios";

export const uploadImageToBunny = async ({ type, slug, image, name }) => {
  if (!image) return null;

  const bunnyUrl = process.env.BUNNY_URL;
  const path = `${type}/${encodeURIComponent(slug)}/${name}.webp`;

  try {
    const stream = await axios.get(image, { responseType: "stream" });

    if (stream.status === 200) {
      axios
        .put(bunnyUrl + path, stream.data, {
          headers: {
            AccessKey: process.env.BUNNY_KEY,
            "Content-Type": "application/octet-stream",
          },
        })
        .catch((err) => {});

      return process.env.BUNNY_CDN_URL + path;
    }
  } catch (err) {
    console.warn("failed upload", err, slug, image, name);
    return image;
  }
};
