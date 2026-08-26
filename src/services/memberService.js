const bcrypt = require("bcrypt");
const { bcryptRounds } = require("../config/index.js");
const { memberInfo } = require("../utils/response.js");
const pool = require("../data/connection.js");

const createMember = async (data) => {
  const duplicate = await pool.query(
    "SELECT * FROM members WHERE email = $1 ",
    [data.email],
  );
  if (duplicate.rows.length > 0) {
    return { ok: false, error: "email have already been registered" };
  }
  const hashedPassword = await bcrypt.hash(data.password, bcryptRounds);
  const createdMember = await pool.query(
    "INSERT INTO members (name, email, password, role, registered_at) VALUES ($1, $2, $3, 'member', NOW()) RETURNING * ",
    [data.name, data.email, hashedPassword],
  );
  const member = memberInfo(createdMember.rows[0]);
  return { ok: true, data: member };
};

const getAllMembers = async () => {
  const members = await pool.query("SELECT * FROM members");
  return { ok: true, data: members.rows.map(memberInfo) };
};

const getMemberByEmail = async (query) => {
  const member = await pool.query("SELECT * FROM members WHERE email = $1", [
    query,
  ]);
  if (member.rows.length === 0) {
    return { ok: false, error: "member not found with the provided email" };
  }
  return { ok: true, data: memberInfo(member.rows[0]) };
};

const getMemberById = async (id) => {
  const member = await pool.query("SELECT * FROM members WHERE id = $1", [id]);

  if (member.rows.length === 0) {
    return { ok: false, error: "no memebr with the provided id " };
  }
  return { ok: true, data: memberInfo(member.rows[0]) };
};

const updateMember = async (id, data) => {
  const check = await pool.query("  SELECT * FROM members WHERE id = $1", [id]);
  if (check.rows.length === 0) {
    return { ok: false, error: "member not found with the provided id" };
  }
  const hashedPassword = await bcrypt.hash(data.password, bcryptRounds);
  const member = await pool.query(
    "UPDATE members SET name = $1, email = $2 , password = $3 WHERE id = $4 RETURNING * ",
    [data.name, data.email, hashedPassword, id],
  );
  return { ok: true, data: memberInfo(member.rows[0]) };
};

const deleteMember = async (id) => {
  const check = await pool.query("SELECT * FROM members WHERE id = $1", [id]);
  if (check.rows.length === 0) {
    return { ok: false, error: "member not found with the provided id" };
  }

  const deleted = await pool.query(
    "DELETE FROM members WHERE id = $1 RETURNING * ",
    [id],
  );
  return { ok: true, data: memberInfo(deleted.rows[0]) };
};

const createLibrarian = async (data) => {
  const duplicate = await pool.query(
    "SELECT * FROM members WHERE email = $1 ",
    [data.email],
  );
  if (duplicate.rows.length > 0 && duplicate.rows[0].role === "member") {
    return {
      ok: false,
      error: "email already registered as a member ",
    };
  }
  if (duplicate.rows.length > 0 && duplicate.rows[0].role === "librarian") {
    return {
      ok: false,
      error: "librarian already registered with this email",
    };
  }
  if (duplicate.rows.length > 0 && duplicate.rows[0].role === "admin") {
    return {
      ok: false,
      error: "email registed as admin",
    };
  }

  const hashedPassword = await bcrypt.hash(data.password, bcryptRounds);
  const librarian = await pool.query(
    "INSERT INTO members (name, email, password, role, registered_at) VALUES ($1, $2, $3, 'librarian', NOW()) RETURNING * ",
    [data.name, data.email, hashedPassword],
  );

  return {
    ok: true,
    data: memberInfo(librarian.rows[0]),
  };
};

module.exports = {
  createMember,
  createLibrarian,
  getAllMembers,
  getMemberByEmail,
  getMemberById,
  updateMember,
  deleteMember,
};
