const { loanDurationDays } = require("../config/index.js");
const pool = require("../data/connection.js");

const getLoanById = async (id) => {
  const loan = await pool.query("SELECT * FROM loans WHERE id = $1", [id]);
  if (loan.rows.length === 0) {
    return { ok: false, error: "no loan with provided id" };
  } else {
    return { ok: true, data: loan.rows[0] };
  }
};

const borrowBook = async (memberId, bookId) => {
  const member = await pool.query("SELECT * FROM members WHERE id = $1", [
    memberId,
  ]);
  const book = await pool.query("SELECT * FROM books WHERE id = $1", [bookId]);

  if (member.rows.length === 0) {
    return { ok: false, error: "there is no member with the peovided id" };
  }
  if (book.rows.length === 0) {
    return { ok: false, error: "there is no book with the provided id" };
  }
  if (book.rows[0].available_copies < 1) {
    return {
      ok: false,
      error: " no copies are avaibale , we are out of this book",
    };
  }
  const result = await doubleBorrow(memberId, bookId);
  if (!result.ok) {
    return { ok: false, error: "a member can not borrow the same book twice" };
  }

  const loan = await pool.query(
    "INSERT INTO loans (book_id, member_id, borrowed_at, due_at, returned_at, status) VALUES($1, $2, NOW(), NOW() + INTERVAL '1 day' * $4 , NULL, $3) RETURNING * ",
    [bookId, memberId, "borrowed", loanDurationDays],
  );

  //upateing the available_copies
  await pool.query(
    "UPDATE books SET available_copies = available_copies -1 WHERE id = $1",
    [bookId],
  );

  return { ok: true, data: loan.rows[0] };
};

const returnBook = async (loanId) => {
  const loan = await pool.query("SELECT * FROM loans WHERE id = $1", [loanId]);
  if (loan.rows.length === 0) {
    return { ok: false, error: "there i no loan with the provided id" };
  }
  if (loan.rows[0].returned_at !== null) {
    return { ok: false, error: "loan already returned" };
  }

  const updatedLoan = await pool.query(
    "UPDATE loans SET returned_at = NOW(), status = $1 WHERE id = $2 RETURNING * ",
    ["returned", loanId],
  );

  //updating the available copies
  await pool.query(
    "UPDATE books SET available_copies = available_copies + 1 WHERE id = $1",
    [loan.rows[0].book_id],
  );
  return { ok: true, data: updatedLoan.rows[0] };
};

const getAllLoans = async (query = {}) => {
  let sql = "SELECT * FROM loans";
  const values = [];
  const conditions = [];

  if (query.status) {
    conditions.push(`status = $${values.length + 1}`);
    values.push(query.status);
  }
  if (query.memberId) {
    conditions.push(`member_id = $${values.length + 1}`);
    values.push(query.memberId);
  }
  if (conditions.length > 0) {
    sql = sql + " WHERE " + conditions.join(" AND ");
  }
  const result = await pool.query(sql, values);
  return { ok: true, data: result.rows };
};

const doubleBorrow = async (memberId, bookId) => {
  const check = await pool.query(
    "SELECT * FROM loans WHERE member_id = $1 AND book_id = $2 AND status = $3",
    [memberId, bookId, "borrowed"],
  );

  if (check.rows.length > 0) {
    return { ok: false };
  }
  return { ok: true };
};

module.exports = {
  getAllLoans,
  getLoanById,
  borrowBook,
  returnBook,
};
