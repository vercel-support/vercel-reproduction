import { getTagData } from "../../../utils/tags/tagData";

async function handler(req, res) {
  const { name } = req.query;

  if (!name) res.status(400).end();

  if (req.method === "GET") {
    try {
      const data = await getTagData(name);

      if (!data) return res.status(400).end();

      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      return res.status(400).end();
    }
  }
}

export default handler;
