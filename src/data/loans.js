const loans = [
  {
    id,
    memberId,
    bookId,
    borrowedAt,
    dueAt,
    status,
  },
];

const nextId = () => {
  return loans.length ? Math.max(...loans.map((l) => l.id)) + 1 : 1;
};

module.exports = { loans, nextId };
