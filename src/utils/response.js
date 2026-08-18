const success = (res, data, statusCode = 200) => {
  res.status(statusCode).json({ ok: true, data });
};
const failure = (res, error, statusCode = 400) => {
  res.status(statusCode).json({ ok: false, error });
};

const memberInfo = (member) => {
  return {
    id: member.id,
    name: member.name,
    email: member.email,
    role: member.role,
    registeredAt: member.registeredAt,
  };
};

module.exports = { success, failure, memberInfo };
