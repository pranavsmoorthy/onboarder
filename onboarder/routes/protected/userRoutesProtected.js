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
router.route('/')
    .get(getUserForProtectedRoute)
    .put(updateUserForProtectedRoute)
    .delete(deleteUserForProtectedRoute);

module.exports = router;