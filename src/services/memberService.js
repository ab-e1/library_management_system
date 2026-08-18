const { members, nextId } = require("../data/members.js");
const bcrypt = require("bcrypt");
const { bcryptRounds } = require("../config/index.js");
const { now } = require("../utils/date.js");
const { memberInfo } = require("../utils/response.js");

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
    role: "member",
    password: bcrypt.hashSync(data.password, bcryptRounds),
    registeredAt: now(),
  };
  members.push(member);
  return { ok: true, data: member };
};

const getAllMembers = () => {
  return { ok: true, data: members.map(memberInfo) };
};

const getMemberByEmail = (query) => {
  const member = members.find(
    (s) => s.email.toLowerCase() === query.toLowerCase(),
  );
  if (!member) {
    return { ok: false, error: "member not found with the provided email" };
  }
  return { ok: true, data: memberInfo(member) };
};

const getMemberById = (id) => {
  const member = members.find((m) => m.id === Number(id));

  if (!member) {
    return { ok: false, error: "no memebr with the provided id " };
  }
  return { ok: true, data: memberInfo(member) };
};

const updateMember = (id, data) => {
  const index = members.findIndex((s) => s.id === Number(id));
  if (index === -1) {
    return { ok: false, error: "member not found with the provided id" };
  }

  const member = (members[index] = { ...members[index], ...data });

  return { ok: true, data: memberInfo(member) };
};

const deleteMember = (id) => {
  const index = members.findIndex((s) => s.id === Number(id));
  if (index === -1) {
    return { ok: false, error: "member not found with the provided id" };
  }
  const [deleted] = members.splice(index, 1);
  return { ok: true, data: memberInfo(deleted) };
};

const createLibrarian = (data) => {
  const duplicate = members.find(
    (s) => s.email.toLowerCase().trim() === data.email.toLowerCase().trim(),
  );
  if (duplicate && duplicate.role === "member") {
    return {
      ok: false,
      error: "email already registered as a member ",
    };
  }
  if (duplicate && duplicate.role === "librarian") {
    return {
      ok: false,
      error: "librarian already registered with this email",
    };
  }
  if (duplicate && duplicate.role === "admin") {
    return {
      ok: false,
      error: "email registed as admin",
    };
  }
  const librarian = {
    id: nextId(),
    name: data.name,
    email: data.email.toLowerCase(),
    password: bcrypt.hashSync(data.password, bcryptRounds),
    registeredAt: now(),
  };

  return {
    ok: true,
    data: memberInfo(librarian),
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
