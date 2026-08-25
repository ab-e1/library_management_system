const bcrypt = require("bcrypt");
const config = require("../config/index.js");
const { signToken } = require("../utils/jwt.js");
const { memberInfo } = require("../utils/response.js");
const pool = require("../data/connection.js");

const register = async (data) => {
  const duplicate = await pool.query(
    "SELECT * FROM members WHERE email = $1 ",
    [data.email],
  );

  if (duplicate.rows.length > 0) {
    return { ok: false, error: "email already registered" };
  }

  const hashPassword = await bcrypt.hash(data.password, config.bcryptRounds);
  const insert = await pool.query(
    "INSERT INTO members (name, email, password, role, registered_at) VALUES($1, $2, $3, 'member', NOW()) RETURNING *",
    [data.name, data.email, hashPassword],
  );
  const member = insert.rows[0];
  const { password, ...memberWithoutPassowrd } = member;
  const token = signToken(memberWithoutPassowrd);

  return {
    ok: true,
    data: memberInfo(member),
    token: token,
  };
};

const login = async (data) => {
  const duplicate = await pool.query("SELECT * FROM members WHERE email = $1", [
    data.email,
  ]);
  if (duplicate.rows.length === 0) {
    return {
      ok: false,
      error: "no member with this email",
    };
  }
  const member = duplicate.rows[0];
  const match = await bcrypt.compare(data.password, member.password);
  if (!match) {
    return {
      ok: false,
      error: "Invalid email or password",
    };
  }
  const { password, ...memberWithoutPassowrd } = member;
  const token = signToken(memberWithoutPassowrd);
  return {
    ok: true,
    data: memberInfo(memberWithoutPassowrd),
    token: token,
  };
};

module.exports = { register, login };
