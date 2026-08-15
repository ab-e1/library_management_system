const { loans, nextId } = require("../data/loans.js");
const { members } = require("../data/members.js");
const { books } = require("../data/books.js");
const { now, daysFromNow } = require("../utils/date.js");
const { loanDurationDays } = require("../config/index.js");
const config = require("../config/index.js");

const getLoanById = (id) => {
  const loan = loans.find((s) => s.id === Number(id));
  if (!loan) {
    return { ok: false, error: "no loan with provided id" };
  } else {
    return { ok: true, data: loan };
  }
};

const borrowBook = (memberId, bookId) => {
  const member = members.find((m) => m.id === Number(memberId));
  const book = books.find((s) => s.id === Number(bookId));

  if (!member) {
    return { ok: false, error: "there is no member with the peovided id" };
  }
  if (!book) {
    return { ok: false, error: "there is no book with the provided id" };
  }
  if (book.availableCopies < 1) {
    return {
      ok: false,
      error: " no copies are avaibale , we are out of this book",
    };
  }
  if (doubleBorrow(memberId, bookId)) {
    return { ok: false, error: "a member can not borrow the same book twice" };
  }

  const loan = {
    id: nextId(),
    memberId,
    bookId,
    borrowedAt: now(),
    dueAt: daysFromNow(loanDurationDays),
    returnedAt: null,
    status: "borrowed",
  };
  book.availableCopies -= 1;
  loans.push(loan);
  return { ok: true, data: loan };
};

const returnBook = (loanId) => {
  const loan = loans.find((s) => s.id === Number(loanId));
  if (!loan) {
    return { ok: false, error: "there i no loan with the provided id" };
  }
  if (loan.returnedAt !== null) {
    return { ok: false, error: "loan already returned" };
  }

  const book = books.find((s) => s.id === Number(loan.bookId));
  loan.returnedAt = now();
  loan.status = "returned";
  book.availableCopies += 1;
  return { ok: true, data: loan };
};

const getAllLoans = (query = {}) => {
  let data = loans;
  if (query.status) data = data.filter((l) => l.status === query.status);
  if (query.memberId)
    data = data.filter((l) => l.memberId === Number(query.memberId));
  return { ok: true, data };
};

const doubleBorrow = (memberId, bookId) => {
  return loans.some(
    (l) =>
      l.memberId === Number(memberId) &&
      l.bookId === Number(bookId) &&
      l.status === "borrowed",
  );
};

module.exports = {
  getAllLoans,
  getLoanById,
  borrowBook,
  returnBook,
};
