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

router.route('/')
    .post(createCourse)
    .get(listCourses);

router.route('/:id')
    .get(getCourseById)
    .put(updateCourseById)
    .delete(deleteCourseById);

module.exports = router;