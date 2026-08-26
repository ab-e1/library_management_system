const loanService = require("../services/loanService.js");
const { success, failure } = require("../utils/response.js");

const getAllLoans = async (req, res) => {
  const result = await loanService.getAllLoans(req.query);

  return success(res, result.data);
};

const getLoanById = async (req, res) => {
  const result = await loanService.getLoanById(req.params.id);

  if (!result.ok) {
    return failure(res, result.error, 404);
  }

  return success(res, result.data);
};

const borrowBook = async (req, res) => {
  const result = await loanService.borrowBook(
    req.params.memberId,
    req.params.bookId,
  );
  if (
    !result.ok &&
    result.error === "a member can not borrow the same book twice"
  ) {
    return failure(res, result.error, 409);
  }
  if (!result.ok) {
    return failure(res, result.error, 404);
  }

  return success(res, result.data, 201);
};

const returnBook = async (req, res) => {
  const result = await loanService.returnBook(req.params.id);

  if (!result.ok && result.error === "loan already returned") {
    return failure(res, result.error, 409);
  }
  if (!result.ok) {
    return failure(res, result.error, 404);
  }

  return success(res, result.data);
};

module.exports = {
  getAllLoans,
  getLoanById,
  borrowBook,
  returnBook,
};
