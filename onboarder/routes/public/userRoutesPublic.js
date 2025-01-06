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
 *                                  minLength: 8
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
/**
 * @api {post} /api/public/users Create user
 * @apiName Create User
 * @apiPermission public
 * @apiGroup Users
 * @apiDescription Create a new user with given details
 *
 * @apiBody {String} username Username.
 * @apiBody {String} email User's email id.
 * @apiBody {String} password Password.
 *
 * @apiSuccess {Object} user The created user object.
 * @apiError InternalServerError internal server error
 * 
 * @apiVersion 1.0.0
 */
router.route('/')
    .post(createUser);

module.exports = router;