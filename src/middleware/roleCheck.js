const { failure } = require("../utils/response.js");

const roleCheck = (...alowedRoles) => {
  const result = (req, res, next) => {
    if (!alowedRoles.includes(req.user.role)) {
      return failure(
        res,
        `requires on of these roles ${alowedRoles.join(", ")}`,
        403,
      );
    }
    next();
  };
  return result;
};

module.exports = roleCheck;
