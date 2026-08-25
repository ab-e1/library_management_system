const { Pool } = require("pg");
const { databaseUrl } = require("../config/index.js");

const pool = new Pool({
  connectionString: databaseUrl,
});

pool.on("error", (err) => {
  console.error("unknown error connecting to database:", err.message);
});

module.exports = pool;
