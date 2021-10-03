import { searchCreation } from "utils/db/search/createHelper";
import { profileCreation } from "../../utils/db/createHelper";
import { hashtagCreation } from "../../utils/db/hashtag/createHelper";
import { locationCreation } from "../../utils/db/location/createHelper";

async function handler(req, res) {
  if (req.method === "POST") {
    const { type, entry } = req.body;

    try {
      switch (type) {
        case "profile":
          const profile = await profileCreation(entry);
          res.status(200).json(profile);
          return;

        case "hashtag":
          const hashtag = await hashtagCreation(entry);
          res.status(200).json(hashtag);
          return;

        // TODO location
        case "location":
          const location = await locationCreation(entry);
          res.status(200).json(location);
          return;

        case "search":
          const search = await searchCreation(entry);
          res.status(200).json(search);
          return;

        default:
          res.status(400).end();
          return;
      }
    } catch (err) {
      console.error("api create err:", err);
      res.status(400).end();
    }
  } else {
    res.status(400).end();
  }

  return;
}

export default handler;
