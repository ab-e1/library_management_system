const books = [
  {
    id: 1,
    name: null,
    author: null,
    instock: null,
  },
];

const nextId = () => {
  return Math.max(...books.map((b) => b.id)) + 1;
};

module.exports = { books, nextId };
