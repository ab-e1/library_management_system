const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const issues = JSON.parse(result.error.message);
    const errors = issues.map((e) => e.message);
    return res.status(400).json({ ok: false, error: errors.join(", ") });
  }

  req.body = result.data;
  next();
};
module.exports = validate;
