const express = require("express");
const router = express.Router();

const {
    getUserForProtectedRoute,
    updateUserForProtectedRoute,
    deleteUserForProtectedRoute,
} = require("../../controllers/userController");

/** 
 * @swagger
 * /api/protected/users:
 *      get:
 *          summary: Get information of user currently signed in
 *          responses:
 *              200: 
 *                  description: Successful response
 *              404:
 *                  description: Could not find user with given ID
 *              401:
 *                  description: Unauthorized
 *              500: 
 *                  description: Internal server error
 *      put:
 *          summary: Update information of user currently signed in
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
 *                                  minLength: 8
 *                              email:
 *                                  type: string
 *                                  required: true
 *          responses:
 *              200: 
 *                  description: Successful response
 *              404:
 *                  description: Could not find user with given ID
 *              401:
 *                  description: Unauthorized
 *              500: 
 *                  description: Internal server error
 *      delete:
 *          summary: Delete user currently signed in
 *          responses:
 *              200: 
 *                  description: Successful response
 *              404:
 *                  description: Could not find user with given ID
 *              401:
 *                  description: Unauthorized
 *              500: 
 *                  description: Internal server error
*/
/**
 * @api {get} /api/protected/users Get user
 * @apiName Get User
 * @apiPermission protected
 * @apiGroup Users
 * @apiDescription Get user details for given id in authentication token
 *
 * @apiHeader {String} token Authentication token.
 *
 * @apiSuccess {Object} user User object.
 * @apiError Unauthorized unauthorized
 * @apiError NotFound could not find user with given id
 * @apiError InternalServerError internal server error
 * 
 * @apiVersion 1.0.0
 */
/**
 * @api {put} /api/protected/users Update user
 * @apiName Update User
 * @apiPermission protected
 * @apiGroup Users
 * @apiDescription Update user details for given id in authentication token
 *
 * @apiHeader {String} token Authentication token.
 * @apiBody {String} username Updated (or existing) username
 * @apiBody {String} password Updated (or existing) password
 * @apiBody {String} email Updated (or existing) email
 *
 * @apiSuccess {Object} user User object.
 * @apiError Unauthorized unauthorized
 * @apiError NotFound could not find user with given id
 * @apiError InternalServerError internal server error
 * 
 * @apiVersion 1.0.0
 */
/**
 * @api {delete} /api/protected/users Delete user
 * @apiName Delete User
 * @apiPermission protected
 * @apiGroup Users
 * @apiDescription Delete user with given id in authentication token
 *
 * @apiHeader {String} token Authentication token.
 *
 * @apiSuccess {Object} user Deleted user object.
 * @apiError Unauthorized unauthorized
 * @apiError NotFound could not find user with given id
 * @apiError InternalServerError internal server error
 * 
 * @apiVersion 1.0.0
 */
router.route('/')
    .get(getUserForProtectedRoute)
    .put(updateUserForProtectedRoute)
    .delete(deleteUserForProtectedRoute);

module.exports = router;