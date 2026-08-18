const bcrypt = require("bcrypt");
const config = require("../config/index.js");
const { signToken, verifyToken } = require("../utils/jwt.js");
const { members } = require("../data/members.js");
const memberService = require("../services/memberService.js");
const { memberInfo } = require("../utils/response.js");

const register = (data) => {
  const member = memberService.createMember(data);

  if (!member.ok) return member;
  const { password, ...memberWithoutPassowrd } = member.data;
  const token = signToken(memberWithoutPassowrd);

  return {
    ok: true,
    data: memberInfo(member.data),
    token: token,
  };
};

const login = (data) => {
  const member = members.find(
    (m) => m.email.trim().toLowerCase() === data.email.toLowerCase().trim(),
  );
  if (!member) {
    return {
      ok: false,
      error: "no member with this email",
    };
  }
  const match = bcrypt.compareSync(data.password, member.password);
  if (!match) {
    return {
      ok: false,
      error: "Invalid email or password",
    };
  }
  const { password, ...memberWithoutPassowrd } = member;
  const token = signToken(memberWithoutPassowrd);
  return {
    ok: true,
    data: memberInfo(memberWithoutPassowrd),
    token: token,
  };
};

module.exports = { register, login };
