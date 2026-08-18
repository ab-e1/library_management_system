const { Router } = require("express");
const { validateMember } = require("../middleware/validation.js");
const memberController = require("../controller/membersController.js");
const roleCheck = require("../middleware/roleCheck.js");
const auth = require("../middleware/auth.js");

const router = Router();

/**
 * @swagger
 * /api/members:
 *   get:
 *     summary: Get all members
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: Array of all members
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
 *                     $ref: '#/components/schemas/Member'
 */
router.get("/", memberController.getAllMembers);

/**
 * @swagger
 * /api/members/email:
 *   get:
 *     summary: Get a member by email
 *     tags: [Members]
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: The member's email
 *     responses:
 *       200:
 *         description: Member found
 *       404:
 *         description: Member not found
 */
router.get("/email", memberController.getMemberByEmail);

/**
 * @swagger
 * /api/members/{id}:
 *   get:
 *     summary: Get a member by ID
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The member ID
 *     responses:
 *       200:
 *         description: Member found
 *       404:
 *         description: Member not found
 */
router.get("/:id", memberController.getMemberById);

/**
 * @swagger
 * /api/members:
 *   post:
 *     summary: Create a new member
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 description: Min 8 chars, uppercase, lowercase, number, special char
 *     responses:
 *       201:
 *         description: Member created
 *       400:
 *         description: Validation error
 *       409:
 *         description: Email already registered
 */
router.post(
  "/",
  auth,
  roleCheck("admin", "librarian"),
  validateMember,
  memberController.createMember,
);

router.post(
  "/librarian",
  auth,
  roleCheck("admin"),
  validateMember,
  memberController.createLibrarian,
);

/**
 * @swagger
 * /api/members/{id}:
 *   put:
 *     summary: Update a member
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The member ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Member updated
 *       404:
 *         description: Member not found
 */
router.put(
  "/:id",
  auth,
  roleCheck("admin", "librarian"),
  memberController.updateMember,
);

/**
 * @swagger
 * /api/members/{id}:
 *   delete:
 *     summary: Delete a member
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The member ID
 *     responses:
 *       200:
 *         description: Member deleted
 *       404:
 *         description: Member not found
 */
router.delete("/:id", auth, roleCheck("admin"), memberController.deleteMember);

module.exports = router;
