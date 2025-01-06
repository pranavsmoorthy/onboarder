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
 *                              courseId:
 *                                  type: string
 *                                  required: true
 *         responses:
 *             200:
 *                 description: Successful response
 *             401:
 *                 description: Unauthorized
 *             404:
 *                 description: Enrollment with given userId and courseId could not be found
 *             500:
 *                 description: Unable to unenroll
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
 *                 description: User or course with given userId and courseId could not be found
 *             500:
 *                 description: Unable to Enroll
*/
/**
 * @api {post} /api/admin/enroll Enroll user
 * @apiName Enroll User
 * @apiPermission public
 * @apiGroup Enrollment
 * @apiDescription Enroll user into course
 *
 * @apiHeader {String} token Authentication token.
 * 
 * @apiBody {String} userId ID of the user.
 * @apiBody {String} courseId ID of the course.
 * @apiBody {Date} completionDate Date of course completion.
 *
 * @apiSuccess {Object} enrollment Enrollment object.
 * @apiError Unauthorized unauthorized
 * @apiError NotFound User or course with given userId and courseId could not be found
 * @apiError InternalServerError internal server error
 * 
 * @apiVersion 1.0.0
 */
/**
 * @api {delete} /api/admin/enroll Unenroll user
 * @apiName Unenroll User
 * @apiPermission public
 * @apiGroup Enrollment
 * @apiDescription Unenroll user from the course
 *
 * @apiHeader {String} token Authentication token.
 * 
 * @apiBody {String} userId ID of the user.
 * @apiBody {String} courseId ID of the course.
 *
 * @apiSuccess {Object} enrollment Enrollment object.
 * @apiError Unauthorized unauthorized
 * @apiError NotFound User or course with given userId and courseId could not be found
 * @apiError InternalServerError internal server error
 * 
 * @apiVersion 1.0.0
 */
router.route('/')
    .post(enrollUser)
    .delete(unenrollUser);

module.exports = router;