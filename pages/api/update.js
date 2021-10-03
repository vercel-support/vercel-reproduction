import { profileUpdate } from "../../utils/db/updateHelper";
import { hashtagUpdate } from "../../utils/db/hashtag/updateHelper";
import { locationUpdate } from "../../utils/db/location/updateHelper";

async function handler(req, res) {
  if (req.method === "POST") {
    // Process a POST request
    const { type, entry } = req.body;

    try {
      switch (type) {
        case "profile":
          const profile = await profileUpdate(entry, true);
          res.status(200).json(profile);
          return;

        case "hashtag":
          const hashtag = await hashtagUpdate(entry, true);
          res.status(200).json(hashtag);
          return;

        case "location":
          const location = await locationUpdate(entry, true);
          res.status(200).json(location);
          return;

        default:
          return;
      }
    } catch (err) {
      console.error("api create err:", err);
      res.status(400).end();
    }
  } else {
    res.status(400).end();
    // Handle any other HTTP method
  }

  return;
}

export default handler;
