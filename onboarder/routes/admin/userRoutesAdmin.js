const express = require("express");
const router = express.Router();

const {
    listUsers,
    getUserForAdminRoute,
    updateUserForAdminRoute,
    deleteUserForAdminRoute
} = require("../../controllers/userController");

/** 
 * @swagger
 * /api/admin/users:
 *      get:
 *         summary: Get all users
 *         description: Get all users
 *         responses:
 *             200:
 *                 description: Successful response
 *             500:
 *                 description: Unable to get list of all users
*/
/**
 * @api {get} /api/admin/users List users
 * @apiName List users
 * @apiPermission admin
 * @apiGroup Users (Admin)
 * @apiDescription Get all users
 *
 * @apiHeader {String} token Authentication token.
 * 
 * @apiSuccess {Array} users Array of all user objects.
 * @apiError InternalServerError internal server error
 * 
 * @apiVersion 1.0.0
 */
router.route('/')
    .get(listUsers);

/** 
 * @swagger
 * /api/admin/users/{id}:
 *      get:
 *         summary: Get user by ID
 *         description: Get user by ID
 *         parameters:
 *             - in: path
 *               name: id
 *               type: string
 *               required: true
 *               description: ID of user to get
 *         responses:
 *              200:
 *                  description: Successful response
 *              401:
 *                  description: Unauthorized
 *              404:
 *                  description: User with given ID could not be found
 *              500:
 *                  description: Unable to get user with given ID
 *      delete:
 *         summary: Delete user by ID
 *         description: Delete user by ID
 *         parameters:
 *             - in: path
 *               name: id
 *               type: string
 *               required: true
 *               description: ID of user to delete
 *         responses:
 *             200:
 *                 description: Successful response
 *             401:
 *                 description: Unauthorized
 *             404:
 *                 description: User with given ID could not be found
 *             500:
 *                 description: Unable to delete user
 *      put:
 *         summary: Update user by ID
 *         description: Update user by ID
 *         parameters:
 *             - in: path
 *               name: id
 *               type: string
 *               required: true
 *               description: ID of user to update
 *         requestBody:
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
 *                                  format: email
 *                                  required: true
 *                              role:
 *                                  type: string
 *                                  required: true
 *                                  enum:
 *                                      - "User"
 *                                      - "Admin"
 *         responses:
 *             200:
 *                 description: Successful response
 *             401:
 *                 description: Unauthorized
 *             404:
 *                 description: User with given ID could not be found
 *             500:
 *                 description: Unable to update user
*/
/**
 * @api {get} /api/admin/users/:id Get user
 * @apiName Get user
 * @apiPermission admin
 * @apiGroup Users (Admin)
 * @apiDescription Gets user with given id
 *
 * @apiHeader {String} token Authentication token.
 * 
 * @apiParam {String} id ID of user.
 *
 * @apiSuccess {Object} user User object in given id.
 * @apiError Unauthorized unauthorized
 * @apiError NotFound User with given id not found
 * @apiError InternalServerError internal server error
 * 
 * @apiVersion 1.0.0
 */
/**
 * @api {put} /api/admin/users/:id Update user
 * @apiName Update user
 * @apiPermission admin
 * @apiGroup Users (Admin)
 * @apiDescription Update user details for given id
 *
 * @apiHeader {String} token Authentication token.
 * 
 * @apiParam {String} id User id.
 * @apiBody {String} username Updated (or existing) username
 * @apiBody {String} password Updated (or existing) password
 * @apiBody {String} email Updated (or existing) email
 * @apiBody {String} role Updated (or existing) user's role. Possible values are: "Admin" and "User"
 *
 * @apiSuccess {Object} user User object.
 * @apiError Unauthorized unauthorized
 * @apiError NotFound could not find user with given id
 * @apiError InternalServerError internal server error
 * 
 * @apiVersion 1.0.0
 */
/**
 * @api {delete} /api/admin/users/:id Delete user
 * @apiName Delete User
 * @apiPermission admin
 * @apiGroup Users (Admin)
 * @apiDescription Delete user with given id
 *
 * @apiHeader {String} token Authentication token.
 * 
 * @apiParam {String} id User id.
 *
 * @apiSuccess {Object} user Deleted user object.
 * @apiError Unauthorized unauthorized
 * @apiError NotFound could not find user with given id
 * @apiError InternalServerError internal server error
 * 
 * @apiVersion 1.0.0
 */
router.route('/:id')
    .get(getUserForAdminRoute)
    .put(updateUserForAdminRoute)
    .delete(deleteUserForAdminRoute);

module.exports = router;