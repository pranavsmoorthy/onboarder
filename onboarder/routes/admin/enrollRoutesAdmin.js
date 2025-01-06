const express = require("express");
const router = express.Router();

const {
    enrollUser,
    unenrollUser
} = require("../../controllers/enrollController");

/** 
 * @swagger
 * /api/admin/enroll:
 *      delete:
 *         summary: Delete course enrollment for the user
 *         description: Delete course enrollment for the user
 *         requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              userId:
 *                                  type: string
 *                                  required: true
 *                              courseID:
 *                                  type: string
 *                                  required: true
 *         responses:
 *             200:
 *                 description: Successful response
 *             401:
 *                 description: Unauthorized
 *             404:
 *                 description: User with given ID could not be found
 *             500:
 *                 description: Unable to delete user
 *      post:
 *         summary: Create course enrollment for the user
 *         description: Create course enrollment for the user
 *         requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              userId:
 *                                  type: string
 *                                  required: true
 *                              courseId:
 *                                  type: string
 *                                  required: true
 *                              completionDate:
 *                                  type: string
 *                                  format: date
 *                                  required: true
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
router.route('/')
    .post(enrollUser)
    .delete(unenrollUser);

module.exports = router;