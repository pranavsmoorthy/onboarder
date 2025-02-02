const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Course = require("../models/courseModel");
const Enrollment = require("../models/enrollmentModel");
const Utils = require("../utils/utilities");
const { constants } = require("../constants");

const listCourses = asyncHandler(async (request, response) => {
    try{
        const courses = await Course.find();
        response.status(constants.SUCCESS).json({
            "courses": courses
        });
    }catch(err){
        response.status(constants.SERVER_ERROR).json({
            "code": 'course-list-failed',
            "messages": ["Unable to get list of all courses"]
        });
    }
});

const getCourseById = asyncHandler(async (request, response) => {
    try{
        const course = await Course.findById(request.params.id);
        if(Utils.isEmptyOrNil(course)){
            response.status(constants.NOT_FOUND).json({
                "code": 'course-not-found',
                "messages": ["Could not find course with given id: " + request.params.id]
            });
            return;
        }
        const enrolledInstances = await Enrollment.find({courseId: course.id});

        let usersEnrolled = [];
        await Promise.all(enrolledInstances.map(async (enrollment) => {
            const user = await User.findById(enrollment.userId);
            usersEnrolled.push(user);
        }));
        
        response.status(200).json({
            course: course,
            users: usersEnrolled
        });
    }catch(err){
        console.log(err);
        response.status(constants.SERVER_ERROR).json({
            "code": 'course-get-failed',
            "messages": ["Error getting course with given id: " + request.params.id]
        });
    }
});

const createCourse = asyncHandler(async (request, response) => {
    try {
        const validationMessage = validateCourseFieldsInRequestBody(request);
        if(validationMessage.length != 0) {
            response.status(constants.VALIDATION_ERROR).json({
                "code": 'course-create-failed',
                "messages": validationMessage
            });
            return;
        }

        let data = {
            title: request.body.title,
            link: request.body.link,
            description: request.body.description,
        }

        if(request.body.exam){
            data.exam = request.body.exam;
        }

        console.log(data.exam.questions);

        const course = await Course.create(data);
        response.status(constants.CREATED).json(course);
    } catch(err) {
        console.log(err);
        response.status(constants.SERVER_ERROR).json({
            "code": 'user-create-failed',
            "messages": ['Internal Server Error: Unable to create course']
        });
    }
});

const updateCourseById = asyncHandler(async (request, response) => {
    try{
        const course = await Course.findById(request.params.id);
        
        if(Utils.isEmptyOrNil(course)){
            response.status(constants.NOT_FOUND).json({
                "code": 'course-not-found',
                "messages": ["Could not find course with given id: " + request.params.id]
            });
            return;
        }

        const validationMessage = validateCourseFieldsInRequestBody(request);
        if(validationMessage.length != 0) {
            response.status(constants.VALIDATION_ERROR).json({
                "code": 'course-update-failed',
                "messages": validationMessage
            });
            return;
        }
        
        const updatedCourse = await Course.findByIdAndUpdate(
            request.params.id,
            request.body,
            { new: true }
        );

        response.status(200).json(updatedCourse);
    }catch(err){
        response.status(500).json({
            "code": 'user-update-failed',
            "messages": ['Internal Server Error: Unable to update course']
        });
    }
})

//@desc Delete contacts by ID 
//@route DELETE /api/user/:id
//@access public
const deleteCourseById = asyncHandler(async (request, response) => {
    try{
        const course = await Course.findById(request.params.id);
        
        if(Utils.isEmptyOrNil(course)){
            response.status(404).json({
                "code": 'course-delete-failed',
                "messages": ["Unable to find course with given id"]
            });
            return;
        }

        await Enrollment.deleteMany({courseId: course.id});

        await Course.deleteOne(course);
        response.status(200).json(course);
    }catch(err){
        response.status(404).json({
            "code": 'course-delete-failed',
            "messages": ["Unable to find course with given id"]
        });
    }
})

const validateCourseFieldsInRequestBody = (request) => {
    let errors = [];

    const {title, link} = request.body;
    if(Utils.isEmptyOrNil(title)){
        errors.push("Title cannot be empty.");
    }

    if(Utils.isEmptyOrNil(link)){
        errors.push("Link cannot be empty.");
    }

    try {
        url = new URL(link);
    } catch (error) {
        errors.push("Invalid link");  
    }

    return errors ;
};

module.exports = {
    createCourse,
    listCourses,
    getCourseById,
    updateCourseById,
    deleteCourseById,
}