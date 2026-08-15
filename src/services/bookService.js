const { books, nextId } = require("../data/books.js");

const getAllBooks = () => {
  return { ok: true, data: books };
};

const getBookById = (id) => {
  const book = books.find((b) => b.id === Number(id));
  if (!book) {
    return { ok: false, error: "no book found with the provided id" };
  } else {
    return { ok: true, data: book };
  }
};

const createBook = (data) => {
  const book = {
    id: nextId(),
    ...data,
  };
  books.push(book);
  return {
    ok: true,
    data: book,
  };
};

const updateBook = (id, data) => {
  const index = books.findIndex((b) => b.id === Number(id));
  if (index === -1) {
    return { ok: false, error: "No book with the provided id" };
  } else {
    const updated = (books[index] = { ...books[index], ...data });
    return { ok: true, data: updated };
  }
};

const deleteBook = (id) => {
  const index = books.findIndex((b) => b.id === Number(id));

  if (index === -1) {
    return { ok: false, error: "No book with the provided id" };
  } else {
    const deleted = books.find((s) => s.id === Number(id));
    books.splice(index, 1);
    return { ok: true, data: deleted };
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
