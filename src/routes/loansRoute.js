const { Router } = require("express");
const loanController = require("../controller/loansController.js");

const router = Router();

router.get("/", loanController.getAllLoans);
router.get("/:id", loanController.getLoanById);
router.post("/borrow/:memberId/:bookId", loanController.borrowBook);
router.put("/:id", loanController.returnBook);

module.exports = router;
