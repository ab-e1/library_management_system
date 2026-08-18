const { now } = require("../utils/date.js");

const logger = (req, res, next) => {
  console.log(`${req.method} => ${req.url} ----- ${now()} `);

  next();
};

module.exports = logger;
