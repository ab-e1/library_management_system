const pool = require("../data/connection.js");

const getAllBooks = async () => {
  const books = await pool.query("SELECT * FROM books");
  return { ok: true, data: books.rows };
};

const getBookById = async (id) => {
  const book = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
  if (book.rows.length === 0) {
    return { ok: false, error: "no book found with the provided id" };
  } else {
    return { ok: true, data: book.rows[0] };
  }
};

const createBook = async (data) => {
  const duplicate = await duplicateCheck(data);
  if (duplicate) {
    return { ok: false, error: "book already exists" };
  }
  const available_copies = data.copies;
  const book = await pool.query(
    "INSERT INTO books (title,author, genre, year, copies, available_copies) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
    [
      data.title,
      data.author,
      data.genre,
      data.year,
      data.copies,
      available_copies,
    ],
  );
  let createdBook = book.rows[0];
  return {
    ok: true,
    data: createdBook,
  };
};

const updateBook = async (id, data) => {
  const index = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
  if (index.rows.length === 0) {
    return { ok: false, error: "No book with the provided id" };
  } else {
    const update = await pool.query(
      "UPDATE books Set title = $1, author = $2, genre = $3, year = $4 WHERE id = $5 RETURNING * ",
      [data.title, data.author, data.genre, data.year, id],
    );
    const updated = update.rows[0];
    return { ok: true, data: updated };
  }
};

const deleteBook = async (id) => {
  const check = await pool.query("SELECT * FROM books WHERE id = $1", [id]);

  if (check.rows.length === 0) {
    return { ok: false, error: "No book with the provided id" };
  } else {
    const deleted = await pool.query(
      "DELETE FROM books WHERE id = $1 RETURNING * ",
      [id],
    );
    return { ok: true, data: deleted.rows[0] };
  }
};
const addCopies = async (bookId, quantity) => {
  const check = await pool.query("SELECT * FROM books WHERE id = $1", [bookId]);
  if (check.rows.length === 0) {
    return { ok: false, error: "no book with the provided book id" };
  }
  const update = await pool.query(
    "UPDATE books SET copies = copies + $1 , available_copies = available_copies + $2 WHERE id = $3 RETURNING * ",
    [quantity, quantity, bookId],
  );
  const updated = update.rows[0];
  return { ok: true, data: updated };
};

const patchBook = async (id, data) => {
  const check = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
  if (check.rows.length === 0) {
    return { ok: false, error: "no book found with the given id" };
  }
  const patch = await pool.query(
    "UPDATE books SET title = COALESCE($1, title), author = COALESCE($2, author),genre = COALESCE($3, genre), year = COALESCE($4, year ) WHERE id = $5 RETURNING *",
    [
      data.title || null,
      data.author || null,
      data.genre || null,
      data.year || null,
      id,
    ],
  );
  const patched = patch.rows[0];
  return {
    ok: true,
    data: patched,
  };
};

const duplicateCheck = async (data) => {
  const title = data.title;
  const author = data.author;

  const duplicate = await pool.query(
    "SELECT * FROM books WHERE title = $1 AND author = $2",
    [title, author],
  );
  const duplicated = duplicate.rows[0];
  return duplicated;
};
module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  patchBook,
  deleteBook,
  addCopies,
};
