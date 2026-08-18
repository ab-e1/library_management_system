const bcrypt = require("bcrypt");

const members = [
  {
    id: 1,
    name: "Abel",
    email: "abel@example.com",
    role: "admin",
    password: bcrypt.hashSync("12345abc", 10),
    registeredAt: new Date().toISOString(),
  },
];

const nextId = () => {
  return members.length ? Math.max(...members.map((m) => m.id)) + 1 : 1;
};
module.exports = { members, nextId };
