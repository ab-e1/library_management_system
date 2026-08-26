const { Router } = require("express");
const { validateBook } = require("../middleware/validation.js");
const booksController = require("../controller/booksController.js");
const roleCheck = require("../middleware/roleCheck.js");
const auth = require("../middleware/auth.js");

const router = Router();

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Array of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 */
router.get("/", booksController.getAllBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Book found
 *       404:
 *         description: Book not found
 */
router.get("/:id", booksController.getBookById);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, author, genre, year, copies]
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               genre:
 *                 type: string
 *               year:
 *                 type: integer
 *               copies:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Book created
 *       400:
 *         description: Validation error
 *       409:
 *         description: Book already exists
 */
router.post(
  "/",
  auth,
  roleCheck("admin", "librarian"),
  validateBook,
  booksController.createBook,
);

/**
 * @swagger
 * /api/books/{id}/copies:
 *   post:
 *     summary: Add copies to an existing book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [quantity]
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: Number of copies to add
 *     responses:
 *       200:
 *         description: Copies added
 *       404:
 *         description: Book not found
 */
router.post(
  "/:id/copies",
  auth,
  roleCheck("admin", "librarian"),
  booksController.addCopies,
);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               genre:
 *                 type: string
 *               year:
 *                 type: integer
 *               copies:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book updated
 *       404:
 *         description: Book not found
 */
router.put(
  "/:id",
  auth,
  roleCheck("admin", "librarian"),
  booksController.updateBook,
);

/**
 * @swagger
 * /api/books/{id}:
 *    patch:
 *      summary: patch a book
 *      tags: [Books]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *          description: the book id
 *      responses:
 *        200:
 *            description: successfully patched
 *        400:
 *            description: not valid
 *        403:
 *            description: not authorized
 *        404:
 *            description: not found
 */

router.patch(
  "/:id",
  auth,
  roleCheck("admin", "librarian"),
  booksController.patchBook,
);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Book deleted
 *       404:
 *         description: Book not found
 */
router.delete(
  "/:id",
  auth,
  roleCheck("admin", "librarian"),
  booksController.deleteBook,
);

module.exports = router;
