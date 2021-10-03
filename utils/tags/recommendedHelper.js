import { getLocationJson } from "../cdn";

const randomizeRecommended = (array) => {
  const range = array.length >= 30 ? 30 : array.length;
  const storedIndexes = new Set();
  const randomArray = [];

  for (let i = 0; i < range; i++) {
    let random = Math.floor(Math.random() * array.length - 1) + 1;
    while (storedIndexes.has(random)) {
      random = Math.floor(Math.random() * array.length - 1) + 1;
    }
    randomArray[i] = array[random];
    storedIndexes.add(random);
  }

  return randomArray;
};

const recommendedLocationData = async (list) => {
  const jsonData = await Promise.allSettled(
    list.map((url) => getLocationJson(url))
  );

  const json = jsonData.map((x) => {
    if (x.status === "rejected") return "";
    const { name, post_count, address } = x?.value?.json?.pageProps?.data;
    const { id, slug } = x?.value;
    return { name, address, post_count, slug, id };
  });

  return json;
};

module.exports = { randomizeRecommended, recommendedLocationData };
