const { Router } = require("express");
const authController = require("../controller/authController.js");
const validate = require("../middleware/validate.js");
const { memberSchema } = require("../schemas/index.js");

const router = Router();

/**
 * @swagger
 * /api/auth/login
 *    post:
 *       summary: login to library managemeng system
 *       tags: [auth]
 *       requestBody:
 *         required: true
 *         content: application/json
 *             schema:
 *                 $ref: '#/componenets/schemas/loginInput'
 *       responses:
 *           200:
 *               description: logged in succesfully
 *            400:
 *               description: not valid
 *
 */

router.post("/login", authController.login);

/**
 * @swagger
 *  /api/auth/register
 *      post:
 *          summary: register
 *          tags: [auth]
 *          requestBody:
 *              required: true
 *              content: application/json
 *                  schema:
 *                      $ref: '#/components/schemas/redisterInput'
 *          responses:
 *              200:
 *                  description: succesfully registered
 *              400:
 *                  description: not valid
 *
 *
 */
router.post("/register", validate(memberSchema), authController.register);

module.exports = router;
