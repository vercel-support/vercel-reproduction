import mysql from "mysql";
import util from "util";
import fs from "fs";
import archiver from "archiver";
import { connectToCDN, uploadToCDN } from "../cdn";

const imgEntryKeys = [
  "username",
  "url",
  "img_id",
  "shortcode",
  "likes",
  "comments",
  "engagement_rate",
  "date",
  "location",
  "type",
];

export const makeDb = () => {
  const config = {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: parseInt(process.env.MYSQL_PORT),
    ssl: {
      ca: fs.readFileSync(process.cwd() + "/certs/ca-certificate.crt"),
    },
  };

  let connection;

  try {
    connection = mysql.createConnection(config);
  } catch (err) {}

  return {
    query(sql, args) {
      return util.promisify(connection.query).call(connection, sql, args);
    },

    close() {
      return util.promisify(connection.end).call(connection);
    },

    async insert(table, args, values) {
      const sql = `INSERT INTO ${table}(${args}) VALUES ?`;

      try {
        const result = await this.query(sql, [values]);
        return result;
      } catch (err) {}
    },

    async getRandomRows(table, selection, limit) {
      const sql =
        `SELECT ${selection} FROM ${table} AS r1 JOIN (` +
        `SELECT (RAND() * (SELECT MAX(id) FROM ${table})) AS id) AS r2 ` +
        `WHERE r1.id >= r2.id ` +
        `LIMIT 1;`;

      const queries = [];
      for (let i = 0; i < limit; i++) queries[i] = this.query(sql);

      let result;
      try {
        result = (await Promise.all(queries)).map((x) => {
          const element = { ...x?.[0] };

          return element ?? { name: "" };
        });
      } catch (err) {}

      return result;
    },
    async createImgDbEntry(username, node) {
      const { id = 0 } = node?.cdn;
      if (id == 0) return;

      const {
        liked,
        comment_count: comments,
        engagement_rate,
        timestamp,
        shortcode,
        location,
      } = node;

      const src = `${process.env.CDN_URL}/profile/${username}/${id}.jpg`;

      const type = node?.is_slide
        ? "slide"
        : node?.is_video
        ? "video"
        : "image";

      const date = new Date(0);
      date.setUTCSeconds(timestamp);

      const value = [
        username,
        src,
        id,
        shortcode,
        liked,
        comments,
        engagement_rate,
        date.toISOString().slice(0, 19).replace("T", " "),
        location.name ?? "",
        type,
      ];

      await this.insert("images", imgEntryKeys, [value]).catch((err) => {});
    },

    async checkNodeExistence(username, img_id) {
      const select = "SELECT img_id ";
      const from = "FROM images ";
      const join = "NATURAL JOIN profiles ";
      const where = "WHERE profiles.username = ? ";
      const where2 = "AND images.img_id = ? ";

      const sql = select + from + join + where + where2;

      return this.query(sql, [username, img_id]);
    },

    async getImagesHistory(username, history_limit = 80) {
      const select = "SELECT * ";
      const from = "FROM images ";
      const join = "NATURAL JOIN profiles ";
      const where = "WHERE username = ? ";
      const order = "ORDER BY date DESC ";
      const limit = "LIMIT " + history_limit;

      const sql = select + from + join + where + order + limit;

      const results = await this.query(sql, [username]);

      return JSON.stringify(results);
    },

    async synchronize(username, nodes) {
      await this.insert("profiles", "username", [[username]]).catch(
        (err) => {}
      );

      const existenceReq = nodes.map((node) =>
        this.checkNodeExistence(username, node?.cdn.id)
      );

      const missingNodes = await Promise.all(existenceReq);

      const nodesToUpload = [];
      const imgDbEntries = [];

      connectToCDN();

      //createZip(username, nodes).then(archive.finalize());

      missingNodes.forEach((node, index) => {
        if (node.length === 0) {
          //nodesToUpload.push(uploadToCDN(username, nodes[index]));
          //imgDbEntries.push(this.createImgDbEntry(username, nodes[index]));
        }
      });

      const resolvedImages = await Promise.allSettled(nodesToUpload);
      resolvedImages.forEach((img, index) => {
        if (img.status === "rejected") imgDbEntries[index] = "";
      });

      await Promise.all(imgDbEntries);
    },
  };
};
