const loans = [
  {
    id: 1,
    loanee: null,
    books: [],
    loanedAt: null,
  },
];

const nextId = () => {
  return Math.max(...loans.map((l) => l.id)) + 1;
};

module.exports = { loans, nextId };
