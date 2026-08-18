const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validateBook = (req, res, next) => {
  const { title, author, genre, year, copies } = req.body;
  if (!title || !author || !genre || !year || !copies) {
    return res.status(400).json({
      ok: false,
      error: "missing required fields",
    });
  }
  if (
    typeof title !== "string" ||
    typeof author !== "string" ||
    typeof genre !== "string" ||
    typeof year !== "number" ||
    typeof copies !== "number"
  ) {
    return res.status(400).json({
      ok: false,
      error:
        "type need to be sting for titlt, authot, and genre, and number for year, and copies",
    });
  }
  if (Number.isNaN(copies) || Number.isNaN(year)) {
    return res.status(400).json({
      ok: false,
      error: "copies, and yar can not be NaN",
    });
  }
  if (copies <= 0 || year <= 0) {
    return res.status(400).json({
      ok: false,
      error: "copies and year should have a psotive value",
    });
  }

  if (title.trim() === "" || author.trim() === "" || genre.trim() === "") {
    return res.status(400).json({
      ok: false,
      error: "fields can not be empty",
    });
  }

  return next();
};

const validateMember = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      ok: false,
      error: "required fields missing",
    });
  }
  if (typeof name !== "string" || typeof email !== "string") {
    return res.status(400).json({
      ok: false,
      error: "name and email should be a string",
    });
  }
  if (name.trim() === "" || email.trim() === "") {
    return res.status(400).json({
      ok: false,
      error: "name and email can not be empty",
    });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      ok: false,
      error: "email should be in proper form abcd@example.com",
    });
  }
  const passwordErrors = validatePassword(password);
  if (passwordErrors.length > 0) {
    return res.status(400).json({
      ok: false,
      error: passwordErrors.join(". "),
    });
  }

  return next();
};

const validatePassword = (password) => {
  const errorPassword = [];

  if (password.length < 8) {
    errorPassword.push("password must be atleast 8 characters long");
  }
  if (!/[A-Z]/.test(password)) {
    errorPassword.push("passowrd must contain atleast one capital letter");
  }
  if (!/[a-z]/.test(password)) {
    errorPassword.push("password must contain atleast one small letter");
  }
  if (!/\d/.test(password)) {
    errorPassword.push("password must contain atleast one number");
  }
  if (!/[#?!@$%^&*-]/.test(password)) {
    errorPassword.push("password must  contain atleast one special charachter");
  }
  return errorPassword;
};

module.exports = {
  validateBook,
  validateMember,
};
