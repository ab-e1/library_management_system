const loans = [
  {
    id: 1,
    memberId: 1,
    bookId: 1,
    borrowedAt: "today",
    dueAt: "week later",
    status: "borrowed",
  },
];

const nextId = () => {
  return loans.length ? Math.max(...loans.map((l) => l.id)) + 1 : 1;
};

module.exports = { loans, nextId };
