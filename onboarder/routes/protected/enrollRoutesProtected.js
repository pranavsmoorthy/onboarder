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
 *          responses:
 *              200: 
 *                  description: Successful response
 *              401:
 *                  description: Unauthorized
 *              500: 
 *                  description: Internal server error
*/
router.route('/')
    .put(updateEnrollStatus)

module.exports = router;