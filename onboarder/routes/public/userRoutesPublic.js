const express = require("express");
const router = express.Router();

const {
    createUser,
} = require("../../controllers/userController");

/** 
 * @swagger
 * /api/public/users:
 *      post:
 *          summary: Register user
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              username:
 *                                  type: string
 *                                  required: true
 *                              password:
 *                                  type: string
 *                                  required: true
 *                              email:
 *                                  type: string
 *                                  required: true
 *          responses:
 *              201: 
 *                  description: Successful response, new user created
 *              500: 
 *                  description: Internal server error
*/
router.route('/')
    .post(createUser);

module.exports = router;