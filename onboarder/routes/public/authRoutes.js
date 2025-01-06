const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const {
    loginUser,
    logoutUser,
    verifyJWTToken
} = require("../../controllers/authController");

/** 
 * @swagger
 * /api/public/auth:
 *      post:
 *          summary: Login user
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  required: true
 *                              password:
 *                                  type: string
 *                                  required: true
 *          responses:
 *              200: 
 *                  description: Successful response
 *                  content:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              token:
 *                                  type: string
 *              401: 
 *                  description: Invalid credentials
 *              500: 
 *                  description: Internal server error
 *      get:
 *         summary: Logout user
 *         description: Logout user
 *         responses:
 *             200:
 *                 description: Successful response
 *             500:
 *                 description: Unable to logout
*/
router.route('/')
    .post(loginUser)
    .get(logoutUser);

router.route('/authenticate')
    .get(verifyJWTToken);

module.exports = router;