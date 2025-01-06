const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const {
    loginUser,
    logoutUser
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
 *                                  minLength: 8
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
/**
 * @api {post} /api/public/auth authenticate user
 * @apiName Authenticate User
 * @apiPermission public
 * @apiGroup Security
 * @apiDescription Log in user using user's username/email and password
 *
 * @apiBody {String} email User name or email id.
 * @apiBody {String} password Password.
 *
 * @apiSuccess {String} token Authentication token.
 * @apiError InvalidCredentials no account matches username/email and password given
 * @apiError InternalServerError internal server error
 * 
 * @apiVersion 1.0.0
 */
/**
 * @api {get} /api/public/auth logout user
 * @apiName Logout User
 * @apiPermission public
 * @apiGroup Security
 * @apiDescription Log out user
 *
 * @apiSuccess {Object} object Empty object.
 * @apiError InternalServerError internal server error
 * 
 * @apiVersion 1.0.0
 */
router.route('/')
    .post(loginUser)
    .get(logoutUser);

module.exports = router;