const { verifyToken } = require("../utils/jwt.js");
const { failure } = require("../utils/response.js");

const auth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return failure(res, "not token provided", 401);
  }
  const token = header.split(" ", [1]);

  try {
    const decodedHeader = verifyToken(token);
    req.user = decodedHeader;
    next();
  } catch (err) {
    return failure(res, "invalid token or expired", 401);
  }
};

module.exports = auth;
