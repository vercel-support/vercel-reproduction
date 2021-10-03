import Cors from "cors";
import { searchHandler } from "../../utils/search";

const cors = Cors({
  methods: ["GET", "HEAD"],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

async function handler(req, res) {
  await runMiddleware(req, res, cors);

  const {
    query: { term, limit = 10 },
  } = req;

  try {
    const { userData, hashtagData, locationData } = await searchHandler(
      term,
      limit
    );

    return res.status(200).json({
      userData,
      hashtagData,
      locationData,
    });
  } catch (error) {
    return res.status(501).json({
      users: false,
      error: "Something might not be working, please try again later",
    });
  }
}

export default handler;
