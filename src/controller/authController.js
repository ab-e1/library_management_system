const authServices = require("../services/authService.js");
const { success, failure } = require("../utils/response.js");

const register = async (req, res) => {
  const result = await authServices.register(req.body);
  if (!result.ok) {
    return failure(res, result.error, 400);
  }
  return success(res, { ...result.data, token: result.token });
};

const login = async (req, res) => {
  const result = await authServices.login(req.body);
  if (!result.ok) {
    return failure(res, result.error, 400);
  }

  return success(res, { ...result.data, token: result.token });
};

module.exports = { register, login };
