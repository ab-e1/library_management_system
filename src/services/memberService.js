const { members, nextId } = require("../data/members.js");
const bcrypt = require("bcrypt");
const { bcryptRounds } = require("../config/index.js");
const { now } = require("../utils/date.js");

const createMember = (data) => {
  const duplicate = members.some(
    (m) => m.email.toLowerCase() === data.email.toLowerCase(),
  );
  if (duplicate) {
    return { ok: false, error: "email have already been registered" };
  }

  const member = {
    id: nextId(),
    name: data.name,
    email: data.email.toLowerCase(),
    password: bcrypt.hashSync(data.password, bcryptRounds),
    registeredAt: now(),
  };
  members.push(member);
  return { ok: true, data: member };
};

const getAllMembers = () => {
  return { ok: true, data: members };
};

const getMemberByEmail = (query) => {
  const member = members.find(
    (s) => s.email.toLowerCase() === query.toLowerCase(),
  );
  if (!member) {
    return { ok: false, error: "member not found with the provided email" };
  }
  return { ok: true, data: member };
};

const getMemberById = (id) => {
  const member = members.find((m) => m.id === Number(id));

  if (!member) {
    return { ok: false, error: "no memebr with the provided id " };
  }
  return { ok: true, data: member };
};

const updateMember = (id, data) => {
  const index = members.findIndex((s) => s.id === Number(id));
  if (index === -1) {
    return { ok: false, error: "member not found with the provided id" };
  }

  const member = (members[index] = { ...members[index], ...data });

  return { ok: true, data: member };
};

const deleteMember = (id) => {
  const index = members.findIndex((s) => s.id === Number(id));
  if (index === -1) {
    return { ok: false, error: "member not found with the provided id" };
  }
  const [deleted] = members.splice(index, 1);
  return { ok: true, data: deleted };
};

module.exports = {
  createMember,
  getAllMembers,
  getMemberByEmail,
  getMemberById,
  updateMember,
  deleteMember,
};
