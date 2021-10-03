import Cors from "cors";
import nextChunkData from "../../utils/chunk";

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

  if (req.method == "POST") {
    const { next, hash, id, next_chunk, follower, batch } = req.body;

    if (next && hash && id && next_chunk && follower && batch) {
      res
        .status(200)
        .json(
          JSON.stringify(
            await nextChunkData(hash, id, next_chunk, follower, batch)
          )
        );
    } else {
      res.status(403).json({ error: "Forbidden" });
    }
  } else {
    res.status(403).json({ error: "Forbidden" });
  }
}

exports.nextChunkData = nextChunkData;
export default handler;
