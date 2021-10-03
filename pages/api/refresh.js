import getUserData from "../../utils/user";
import formatData from "../../utils/format";

async function handler(req, res) {
  const { username } = req.query;

  if (!username) res.status(400).end();

  if (req.method === "GET") {
    try {
      const { json = false, hash } = await getUserData(username);

      if (json) {
        const user = formatData(json);

        res.status(201).json({
          user,
          hash,
        });
      }
    } catch (err) {
      console.error(err);
      res.status(400).end();
    }
  }
}

export default handler;
