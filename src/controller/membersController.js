const memberService = require("../services/memberService.js");
const { success, failure } = require("../utils/response.js");

const createMember = async (req, res) => {
  const result = await memberService.createMember(req.body);
  if (!result.ok) {
    return failure(res, result.error, 409);
  }

  return success(res, result.data, 201);
};

const getAllMembers = async (req, res) => {
  const result = await memberService.getAllMembers();

  return success(res, result.data);
};

const getMemberById = async (req, res) => {
  const result = await memberService.getMemberById(req.params.id);

  if (!result.ok) {
    return failure(res, result.error, 404);
  }
  return success(res, result.data);
};

const getMemberByEmail = async (req, res) => {
  const result = await memberService.getMemberByEmail(req.query.email);

  if (!result.ok) {
    return failure(res, result.error, 404);
  }

  return success(res, result.data);
};

const updateMember = async (req, res) => {
  const result = await memberService.updateMember(req.params.id, req.body);

  if (!result.ok) {
    return failure(res, result.error, 404);
  }
  return success(res, result.data);
};

const deleteMember = async (req, res) => {
  const result = await memberService.deleteMember(req.params.id);

  if (!result.ok) {
    return failure(res, result.error, 404);
  }

  return success(res, result.data);
};

const createLibrarian = async (req, res) => {
  const result = await memberService.createLibrarian(req.body);
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
