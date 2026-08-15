const members = [
  {
    id: 1,
    name: null,
    email: null,
    password: null,
    registerdAt: null,
  },
];

const nextId = () => {
  return Math.max(...members.map((m) => m.id)) + 1;
};
module.exports = { members, nextId };
