import { getLocationData } from "../../../utils/locations/locationData";

async function handler(req, res) {
  const { id, slug } = req.query;

  if (!slug || !id) res.status(400).end();

  if (req.method === "GET") {
    try {
      const data = await getLocationData(id, slug);

      if (!data) return res.status(400).end();

      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      return res.status(400).end();
    }
  }
}

export default handler;
