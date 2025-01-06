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
 *         summary: Get all courses
 *         description: Get all courses
 *         responses:
 *             200:
 *                 description: Successful response
 *             500:
 *                 description: Unable to get list of all courses
 *      post:
 *          summary: Create course
 *          description: Create a new course
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              title:
 *                                  type: string
 *                                  required: true
 *                              link:
 *                                  type: string
 *                                  required: true
 *                              description:
 *                                  type: string
 *                                  required: false
 *                              completionDate:
 *                                  type: string
 *                                  required: true
 *          responses:
 *              201: 
 *                  description: Successful response, new course created
 *              400:
 *                  description: Bad request
 *              401:
 *                  description: Unauthorized
 *              500: 
 *                  description: Internal server error
*/
router.route('/')
    .post(createCourse)
    .get(listCourses);

/** 
 * @swagger
 * /api/admin/courses/{id}:
 *      get:
 *          summary: Get course by ID
 *          description: Get course by ID
 *          parameters:
 *              - in: path
 *                name: id
 *                type: string
 *                required: true
 *                description: ID of course to get
 *          responses:
 *              200:
 *                  description: Successful response
 *              401:
 *                  description: Unauthorized
 *              404:
 *                  description: Course with given ID could not be found
 *              500:
 *                  description: Unable to get list of all courses
 *      put:
 *          summary: Update course by ID
 *          description: Update course by ID
 *          parameters:
 *              - in: path
 *                name: id
 *                type: string
 *                required: true
 *                description: ID of course to update
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              title:
 *                                  type: string
 *                                  required: true
 *                              link:
 *                                  type: string
 *                                  required: true
 *                              description:
 *                                  type: string
 *                                  required: false
 *          responses:
 *              201: 
 *                  description: Successful response, new course created
 *              400:
 *                  description: Bad request
 *              401:
 *                  description: Unauthorized
 *              500: 
 *                  description: Internal server error
 *      delete:
 *          summary: Delete course by ID
 *          description: Delete course by ID
 *          parameters:
 *              - in: path
 *                name: id
 *                type: string
 *                required: true
 *                description: ID of course to delete
 *          responses:
 *              200:
 *                  description: Successful response
 *              401:
 *                  description: Unauthorized
 *              404:
 *                  description: Course with given ID could not be found
 *              500:
 *                  description: Unable to get delete course
*/
router.route('/:id')
    .get(getCourseById)
    .put(updateCourseById)
    .delete(deleteCourseById);

module.exports = router;