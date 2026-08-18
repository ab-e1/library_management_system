const authServices = require("../services/authService.js");
const { success, failure } = require("../utils/response.js");

const register = (req, res) => {
  const result = authServices.register(req.body);
  if (!result.ok) {
    return failure(res, result.error, 400);
  }
  return success(res, { ...result.data, token: result.token });
};

const login = (req, res) => {
  const result = authServices.login(req.body);
  if (!result.ok) {
    return failure(res, result.error, 400);
  }

  return success(res, { ...result.data, token: result.token });
};

module.exports = { register, login };
