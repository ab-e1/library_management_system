const { Router } = require("express");
const { validateBook } = require("../middleware/validation.js");
const booksController = require("../controller/booksController.js");

const router = Router();

router.get("/", booksController.getAllBooks);
router.get("/:id", booksController.getBookById);

router.post("/", validateBook, booksController.createBook);
router.post("/:id/copies", booksController.addCopies);

router.put("/:id", validateBook, booksController.updateBook);
router.delete("/:id", booksController.deleteBook);

module.exports = router;
