const books = [
  {
    id: 1,
    title: "clean code",
    author: "daniel",
    genre: "technology",
    year: 2000,
    copies: 2,
    availableCopies: 1,
  },
];

const nextId = () => {
  return books.length ? Math.max(...books.map((b) => b.id)) + 1 : 1;
};

module.exports = { books, nextId };
