const members = [
  {
    id: 1,
    name: "Abel",
    email: "abel@example.com",
    password: "123abc123",
    registeredAt: "today",
  },
];

const nextId = () => {
  return members.length ? Math.max(...members.map((m) => m.id)) + 1 : 1;
};
module.exports = { members, nextId };
