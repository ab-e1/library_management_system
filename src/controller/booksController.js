const bookService = require("../services/bookService.js");
const { success, failure } = require("../utils/response.js");

const getAllBooks = async (req, res) => {
  const result = await bookService.getAllBooks();

  return success(res, result.data);
};

const createBook = async (req, res) => {
  const result = await bookService.createBook(req.body);
  if (!result.ok && result.error === "book already exists") {
    return failure(res, result.error, 409);
  }
  if (!result.ok) {
    return failure(res, result.error, 400);
  }

  return success(res, result.data, 201);
};

const getBookById = async (req, res) => {
  const result = await bookService.getBookById(req.params.id);

  if (!result.ok) {
    return failure(res, result.error, 404);
  }

  return success(res, result.data);
};

const updateBook = async (req, res) => {
  const result = await bookService.updateBook(req.params.id, req.body);

  if (!result.ok) {
    return failure(res, result.error, 404);
  }

  return success(res, result.data);
};

const deleteBook = async (req, res) => {
  const result = await bookService.deleteBook(req.params.id);

  if (!result.ok) {
    return failure(res, result.error, 404);
  }

  return success(res, result.data);
};

const addCopies = async (req, res) => {
  const result = await bookService.addCopies(req.params.id, req.body.quantity);

  if (!result.ok) {
    return failure(res, result.error, 404);
  }

  return success(res, result.data);
};

const patchBook = async (req, res) => {
  const result = await bookService.patchBook(req.params.id, req.body);
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
  patchBook,
  deleteBook,
  addCopies,
};
