const success = (res, data, statusCode = 200) => {
  res.status(statusCode).json({ ok: true, data });
};
const failure = (res, error, statusCode = 400) => {
  res.status(statusCode).json({ ok: false, error });
};

module.exports = { success, failure };
