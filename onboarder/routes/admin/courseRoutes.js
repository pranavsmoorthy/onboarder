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
/**
 * @api {post} /api/admin/courses Create course
 * @apiName Create course
 * @apiPermission admin
 * @apiGroup Courses
 * @apiDescription Create a new course with given details
 *
 * @apiBody {String} title course's title.
 * @apiBody {String} description course's description.
 * @apiBody {String} link course's link.
 *
 * @apiSuccess {Object} course The created course object.
 * @apiError BadRequest bad request
 * @apiError Unauthorzied unauthorized
 * @apiError InternalServerError internal server error
 * 
 * @apiVersion 1.0.0
 */
/**
 * @api {get} /api/admin/courses List courses
 * @apiName List courses
 * @apiPermission admin
 * @apiGroup Courses
 * @apiDescription Get all courses
 *
 * @apiHeader {String} token Authentication token.
 * 
 * @apiSuccess {Array} courses Array of all course objects.
 * @apiError InternalServerError internal server error
 * 
 * @apiVersion 1.0.0
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
 *                  description: Successful response, course updated
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
 *                  description: Unable to delete course
*/
/**
 * @api {get} /api/admin/courses/:id Get course
 * @apiName Get course
 * @apiPermission admin
 * @apiGroup Courses
 * @apiDescription Gets course with given id
 *
 * @apiHeader {String} token Authentication token.
 * 
 * @apiParam {String} id ID of course.
 *
 * @apiSuccess {Object} course Course object in given id.
 * @apiError Unauthorized unauthorized
 * @apiError NotFound Course with given id not found
 * @apiError InternalServerError internal server error
 * 
 * @apiVersion 1.0.0
 */
/**
 * @api {put} /api/admin/courses/:id Update course
 * @apiName Update course
 * @apiPermission admin
 * @apiGroup Courses
 * @apiDescription Update course details for given id
 *
 * @apiHeader {String} token Authentication token.
 * 
 * @apiParam {String} id Course id.
 * @apiBody {String} title Updated (or existing) title
 * @apiBody {String} description Updated (or existing) course description
 * @apiBody {String} link Updated (or existing) course link
 *
 * @apiSuccess {Object} course Course object.
 * @apiError Unauthorized unauthorized
 * @apiError NotFound could not find course with given id
 * @apiError InternalServerError internal server error
 * 
 * @apiVersion 1.0.0
 */
/**
 * @api {delete} /api/admin/courses/:id Delete course
 * @apiName Delete Course
 * @apiPermission admin
 * @apiGroup Courses
 * @apiDescription Delete course with given id
 *
 * @apiHeader {String} token Authentication token.
 * 
 * @apiParam {String} id Course id.
 *
 * @apiSuccess {Object} course Deleted course object.
 * @apiError Unauthorized unauthorized
 * @apiError NotFound could not find course with given id
 * @apiError InternalServerError internal server error
 * 
 * @apiVersion 1.0.0
 */
router.route('/:id')
    .get(getCourseById)
    .put(updateCourseById)
    .delete(deleteCourseById);

module.exports = router;