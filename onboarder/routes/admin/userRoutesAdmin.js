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
router.route('/:id')
    .get(getUserForAdminRoute)
    .put(updateUserForAdminRoute)
    .delete(deleteUserForAdminRoute);

module.exports = router;