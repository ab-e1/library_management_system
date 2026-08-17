const { Router } = require("express");
const { validateMember } = require("../middleware/validation.js");
const memberController = require("../controller/membersController.js");

const router = Router();

router.get("/", memberController.getAllMembers);
router.get("/email", memberController.getMemberByEmail);
router.get("/:id", memberController.getMemberById);
router.post("/", validateMember, memberController.createMember);
router.put("/:id", memberController.updateMember);
router.delete("/:id", memberController.deleteMember);

module.exports = router;
