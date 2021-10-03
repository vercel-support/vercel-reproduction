import { parseTagJson } from "./parseTagJson";
import cheerio from "cheerio";
import { get } from "../proxy/get";

const getTagData = async (tag) => {
  try {
    const url = `https://www.instagram.com/explore/tags/${encodeURIComponent(
      tag
    )}/?__a=1`;

    const { response, error, permanent } = await get(url);

    if (permanent) throw { error, permanent };

    if (error) return fallbackData(tag);

    let json;
    try {
      json = await response.json();
    } catch (err) {
      const text = await response.text();
      return fallbackData(tag, text);
    }

    return parseTagJson(json, "base");
  } catch (error) {
    console.error(error);
    if (error.permanent) throw Error(error);

    return fallbackData(tag);
  }
};

const fallbackData = async (tag, fallbackData = false) => {
  try {
    let $;
    if (fallbackData) $ = cheerio.load(fallbackData);
    else {
      const url = `https://www.instagram.com/explore/tags/${encodeURIComponent(
        tag
      )}/`;

      const { response, error, permanent } = await get(url);

      if (error) throw { error, permanent };

      const text = await response.text();

      $ = cheerio.load(text);
    }

    const script = $("script", "body").first().html();
    if (script.includes("HttpGatedContentPage")) throw new Error("age block");

    const json = script.startsWith("window._sharedData = ")
      ? JSON.parse(script.slice(21, -1))
      : JSON.parse(
          $.html()
            .match(
              /<script type="text\/javascript">window\._sharedData = (.*)<\/script>/
            )[1]
            .slice(0, -1)
        );

    return parseTagJson(json, "fallback");
  } catch (error) {
    // pipe error and permanent
    throw Error(error);
  }
};

module.exports = { getTagData };
