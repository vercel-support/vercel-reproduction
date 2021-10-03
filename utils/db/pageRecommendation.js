import { makeDb } from "./sql";

const pageRecommendation = async ({ table, columns, items, limit }) => {
  const db = makeDb();

  await db.insert(table, columns, [[items]]).catch((err) => {});

  const rows = await db.getRandomRows(table, columns, limit).catch((err) => {});

  const recommended = removeDuplicates(rows, "name");

  await db.close();

  return recommended ?? [];
};

const tagConfig = (items) => {
  const config = {
    table: "tags",
    columns: "name",
    limit: 30,
    items,
  };

  return config;
};

const locationConfig = (id, slug, name) => {
  const config = {
    table: "locations",
    columns: "location_id, slug, name",
    limit: 30,
    items: [id, slug, name],
  };

  return config;
};

function removeDuplicates(myArr, prop) {
  try {
    return myArr.filter((obj, pos, arr) => {
      return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  } catch (err) {
    return [];
  }
}

module.exports = { pageRecommendation, tagConfig, locationConfig };
