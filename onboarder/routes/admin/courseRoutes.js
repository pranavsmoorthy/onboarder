const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();

const {
    createCourse,
    listCourses,
    getCourseById,
    updateCourseById,
    deleteCourseById
} = require("../../controllers/courseController");

/** 
 * @swagger
 * /api/admin/courses:
 *      get:
 *         description: Get all courses
 *         responses:
 *             200:
 *                 description: Successful response
 *             500:
 *                 description: Unable to get list of all courses
 *      post:
 *          description: Create a new course
 *          parameters:
 *              - in: body
 *                name: title
 *                type: string
 *                required: true
 *                description: Title of the course
 *              - in: body
 *                name: description
 *                type: string
 *                required: false
 *                description: Description of the course
 *              - in: body
 *                name: title
 *                type: string
 *                required: true
 *                description: Title of the course
*/
router.route('/')
    .post(createCourse)
    .get(listCourses);

router.route('/:id')
    .get(getCourseById)
    .put(updateCourseById)
    .delete(deleteCourseById);

module.exports = router;