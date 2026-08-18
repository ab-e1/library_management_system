const { Router } = require("express");
const authController = require("../controller/authController.js");
const { validateMember } = require("../middleware/validation.js");

const router = Router();

router.post("/login", authController.login);
router.post("/register", validateMember, authController.register);

module.exports = router;
