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
  const existing = duplicateCheck(data);
  if (existing) {
    return { ok: false, error: "book already exists", data: existing };
  }
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

const addCopies = (bookId, quantity) => {
  const book = books.find((b) => b.id === Number(bookId));
  if (!book) {
    return { ok: false, error: "no book with the provided book id" };
  }
  book.copies += Number(quantity);
  book.availableCopies += Number(quantity);
  return { ok: true, data: book };
};

const duplicateCheck = (data) => {
  const title = data.title;
  const author = data.author;
  const duplicate = books.find(
    (b) =>
      b.title.trim().toLowerCase() === title.trim().toLowerCase() &&
      b.author.trim().toLowerCase() === author.trim().toLowerCase(),
  );
  return duplicate;
};
module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  addCopies,
};
