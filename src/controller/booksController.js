const bookService = require("../services/bookService.js");
const { success, failure } = require("../utils/response.js");

const getAllBooks = (req, res) => {
  const result = bookService.getAllBooks();

  return success(res, result.data);
};

const createBook = (req, res) => {
  const result = bookService.createBook(req.body);
  if (!result.ok && result.error === "book already exists") {
    return failure(res, result.error, 409);
  }
  if (!result.ok) {
    return failure(res, result.error, 400);
  }

  return success(res, result.data, 201);
};

const getBookById = (req, res) => {
  const result = bookService.getBookById(req.params.id);

  if (!result.ok) {
    return failure(res, result.error, 404);
  }

  return success(res, result.data);
};

const updateBook = (req, res) => {
  const result = bookService.updateBook(req.params.id, req.body);

  if (!result.ok) {
    return failure(res, result.error, 404);
  }

  return success(res, result.data);
};

const deleteBook = (req, res) => {
  const result = bookService.deleteBook(req.params.id);

  if (!result.ok) {
    return failure(res, result.error, 404);
  }

  return success(res, result.data);
};

const addCopies = (req, res) => {
  const result = bookService.addCopies(req.params.id, req.body.quantity);

  if (!result.ok) {
    return failure(res, result.error, 404);
  }

  return success(res, result.data);
};

module.exports = {
  getAllBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
  addCopies,
};
