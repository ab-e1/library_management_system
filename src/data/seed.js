const pool = require("./connection.js");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const { bcryptRounds } = require("../config/index.js");

const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");

const seed = async () => {
  await pool.query(schema);
  await pool.query(
    "INSERT INTO books (title, author, genre, year, copies, available_copies) VALUES ('clean code', 'daniel', 'tech', 2000, 3 , 3)",
  );
  const hashPassword = await bcrypt.hash("akukulualnegam1234", bcryptRounds);
  const userHashPassword = await bcrypt.hash("buhebelu", bcryptRounds);
  await pool.query(
    "INSERT INTO members (name , email, password, role, registered_at) VALUES ($1, $2, $3, $4, NOW())",
    ["Admin", "admin@email.com", hashPassword, "admin"],
  );
  await pool.query(
    "INSERT INTO members (name , email, password, role, registered_at) VALUES ($1, $2 , $3, $4, NOW())",
    ["Abel", "abel@email.com", userHashPassword, "member"],
  );
  console.log("database seeded");
  process.exit();
};

seed();
