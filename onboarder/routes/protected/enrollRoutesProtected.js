const express = require("express");
const router = express.Router();

const {
    updateEnrollStatus
} = require("../../controllers/enrollController");

/** 
 * @swagger
 * /api/protected/enroll:
 *      put:
 *          summary: Update enrollment status
 *          requestBody:
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
 *                              progress:
 *                                  type: string
 *                                  required: true
 *                                  enum:
 *                                      - "In Progress"
 *                                      - "Completed"
 *          responses:
 *              200: 
 *                  description: Successful response
 *              401:
 *                  description: Unauthorized
 *              404:
 *                  description: Enrollment not found for given user id and course id
 *              500: 
 *                  description: Internal server error
*/
/**
 * @api {put} /api/protected/enroll Change enrollment progress
 * @apiName Change enrollment progress
 * @apiPermission protected
 * @apiGroup Enrollment
 * @apiDescription Changes the enrollments progress
 *
 * @apiHeader {String} token Authentication token.
 * @apiBody {String} userId ID of user.
 * @apiBody {String} courseId ID of course that user is taking.
 * @apiBody {String} progress Updated progress pf enrollment. Possible values are: "In Progress" and "Completed"
 *
 * @apiSuccess {Object} enrollment Updated enrollment object.
 * @apiError Unauthorized unauthorized
 * @apiError NotFound enrollment with given courseId and userId not found
 * @apiError InternalServerError internal server error
 * 
 * @apiVersion 1.0.0
 */
router.route('/')
    .put(updateEnrollStatus)

module.exports = router;