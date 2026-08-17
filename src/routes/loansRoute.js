const { Router } = require("express");
const loanController = require("../controller/loansController.js");

const router = Router();

/**
 * @swagger
 * /api/loans:
 *   get:
 *     summary: Get all loans
 *     tags: [Loans]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [borrowed, returned]
 *         description: Filter by loan status
 *       - in: query
 *         name: memberId
 *         schema:
 *           type: integer
 *         description: Filter by member ID
 *     responses:
 *       200:
 *         description: Array of loans
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
 *                     $ref: '#/components/schemas/Loan'
 */
router.get("/", loanController.getAllLoans);

/**
 * @swagger
 * /api/loans/{id}:
 *   get:
 *     summary: Get a loan by ID
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The loan ID
 *     responses:
 *       200:
 *         description: Loan found
 *       404:
 *         description: Loan not found
 */
router.get("/:id", loanController.getLoanById);

/**
 * @swagger
 * /api/loans/borrow/{memberId}/{bookId}:
 *   post:
 *     summary: Borrow a book
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The member ID
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The book ID
 *     responses:
 *       201:
 *         description: Book borrowed successfully
 *       404:
 *         description: Member or book not found
 *       409:
 *         description: No copies available or member already borrowed this book
 */
router.post("/borrow/:memberId/:bookId", loanController.borrowBook);

/**
 * @swagger
 * /api/loans/{id}/return:
 *   put:
 *     summary: Return a borrowed book
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The loan ID
 *     responses:
 *       200:
 *         description: Book returned
 *       404:
 *         description: Loan not found
 *       409:
 *         description: Loan already returned
 */
router.put("/:id/return", loanController.returnBook);

module.exports = router;