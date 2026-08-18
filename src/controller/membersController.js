const memberService = require("../services/memberService.js");
const { success, failure } = require("../utils/response.js");

const createMember = (req, res) => {
  const result = memberService.createMember(req.body);
  if (!result.ok) {
    return failure(res, result.error, 409);
  }

  return success(res, result.data, 201);
};

const getAllMembers = (req, res) => {
  const result = memberService.getAllMembers();

  return success(res, result.data);
};

const getMemberById = (req, res) => {
  const result = memberService.getMemberById(req.params.id);

  if (!result.ok) {
    return failure(res, result.error, 404);
  }
  return success(res, result.data);
};

const getMemberByEmail = (req, res) => {
  const result = memberService.getMemberByEmail(req.query.email);

  if (!result.ok) {
    return failure(res, result.error, 404);
  }

  return success(res, result.data);
};

const updateMember = (req, res) => {
  const result = memberService.updateMember(req.params.id, req.body);

  if (!result.ok) {
    return failure(res, result.error, 404);
  }
  return success(res, result.data);
};

const deleteMember = (req, res) => {
  const result = memberService.deleteMember(req.params.id);

  if (!result.ok) {
    return failure(res, result.error, 404);
  }

  return success(res, result.data);
};

const createLibrarian = (req, res) => {
  const reasult = memberService.createLibrarian(req.body);
  if (!result.ok) {
    return failure(res, result.error, 401);
  }

  return success(res, result.data, 201);
};

module.exports = {
  createMember,
  getAllMembers,
  getMemberByEmail,
  getMemberById,
  updateMember,
  deleteMember,
  createLibrarian,
};
