const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Course = require("../models/courseModel");
const Enrollment = require("../models/enrollmentModel");
const Utils = require("../utils/utilities");
const emailValidator = require("deep-email-validator");
const { constants } = require("../constants");
const { request } = require("express");

//@desc Get all contacts 
//@route GET /api/user
//@access public
const listUsers = asyncHandler(async (request, response) => {
    try {
        const users = await User.find();
        response.status(200).json({
            "users": users
        });
    } catch (err) {
        response.status(500).json({
            "code": 'user-list-failed',
            "messages": ["Unable to get list of all users"]
        });
    }
});

//@desc Get individual user by id 
//@route GET /api/user/:id
//@access public
const getUserForAdminRoute = asyncHandler(async (request, response) => {
    await getUser(request, response, request.params.id);
});

const getUserForProtectedRoute = asyncHandler(async (request, response) => {
    await getUser(request, response, request.headers.id);
});

const getUser = async (request, response, userId) => {
    try {
        const user = await User.findById(userId);

        if (Utils.isEmptyOrNil(user)) {
            response.status(404).json({
                "code": 'user-not-found',
                "messages": "Could not find user with given id: " + userId
            });
            return;
        }
        const enrolledInstances = await Enrollment.find({ userId: user.id });

        let coursesEnrolled = [];
        await Promise.all(enrolledInstances.map(async (enrollment) => {
            const course = await Course.findById(enrollment.courseId);
            const progress = enrollment.progress;
            const completionDate = enrollment.completionDate;

            const enrollmentObject = {
                "course": course,
                "progress": progress,
                "completionDate": completionDate
            }

            coursesEnrolled.push(enrollmentObject);
        }));

        response.status(200).json({
            user: user,
            courses: coursesEnrolled
        });
    } catch (err) {
        console.log(err);
        response.status(500).json({
            "code": 'user-get-failed',
            "messages": ["Error getting user with given id: " + userId]
        });
    }
}

//@desc Create new user 
//@route POST /api/user
//@access public
const createUser = asyncHandler(async (request, response) => {
    console.log('user creation request -- start');
    const validationMessage = await validateUserFieldsInRequestBody(request);
    if (validationMessage.length != 0) {
        response.status(400).json({
            "code": 'user-create-failed',
            "messages": validationMessage
        });
        return;
    }

    try {
        let role = request.body.role;

        if(Utils.isEmptyOrNil(role)){
            role = "User";
        }

        const user = await User.create({
            "username": request.body.username,
            "email": request.body.email,
            "password": request.body.password,
            "role": role
        });

        let htmlString = "<h1>Welcome to Onboarder</h1><p>Welcome to Onboarder! We&apos;re thrilled to have you join our community. We hope you&apos;ll find our services to be a valuable resource. We&apos;re here to help you make the most of your experience.</p><p>To get started, please visit your <a href='http://localhost:5001/index.html'>Onboarder profile page</a>!</p><p><br></p>"
        Utils.sendEmail(request.body.email, "Welcome to Onboarder!", htmlString);

        response.status(201).json(user);
    } catch (err) {
        console.log(err);
        let message = 'Internal Server Error: Unable to create user';
        if (err.errorResponse.code == 11000)
            message = 'Email id already exists';
        response.status(500).json({
            "code": 'user-create-failed',
            "messages": [message]
        });
    }
});

const updateUserForAdminRoute = asyncHandler(async (request, response) => {
    await updateUserById(request, response, request.params.id);
});

const updateUserForProtectedRoute = asyncHandler(async (request, response) => {
    await updateUserById(request, response, request.headers.id);
});

//@desc Update user by id 
//@route PUT /api/user/:id
//@access public
const updateUserById = async (request, response, userId) => {
    try {
        const user = await User.findById(userId);

        if (Utils.isEmptyOrNil(user)) {
            response.status(404).json({
                "code": 'user-not-found',
                "messages": ["Could not find user with given id: " + userId]
            });
            return;
        }

        const validationMessage = await validateUserFieldsInRequestBody(request);
        if (validationMessage.length != 0) {
            response.status(400).json({
                "code": 'user-update-failed',
                "messages": validationMessage
            });
            return;
        }

        let role = request.body.role;

        if(Utils.isEmptyOrNil(role)){
            role = user.role;
        }

        const data = {
            "username": request.body.username,
            "password": request.body.password,
            "email": request.body.email,
            "role": role
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            data,
            { new: true }
        );

        let htmlString = "<h1>Profile Information Updated</h1><p>Your profile information has been updated.<p>For more information, please visit your <a href='http://localhost:5001/index.html'>Onboarder profile page</a>!</p><p><br></p>"
        Utils.sendEmail(user.email, "Profile Information Updated", htmlString);

        response.status(200).json(updatedUser);
    } catch (err) {
        let message = 'Internal Server Error: Unable to update user';
        if (err.errorResponse.code == 11000)
            message = 'Email id already exists';
        response.status(500).json({
            "code": 'user-update-failed',
            "messages": [message]
        });
    }
}

const deleteUserForAdminRoute = asyncHandler(async (request, response) => {
    await deleteUserById(request, response, request.params.id);
});

const deleteUserForProtectedRoute = asyncHandler(async (request, response) => {
    await deleteUserById(request, response, request.headers.id);
    response.clearCookie("token").status(200).json(user);
});

//@desc Delete contacts by ID 
//@route DELETE /api/user/:id
//@access public
const deleteUserById = asyncHandler(async (request, response, userId) => {
    try {
        const user = await User.findById(userId);

        if (Utils.isEmptyOrNil(user)) {
            response.status(404).json({
                "code": 'user-delete-failed',
                "messages": ["Unable to find user with given id:" + userId]
            });
            return;
        }

        await Enrollment.deleteMany({ userId: user.id });
        await User.deleteOne(user);

        let htmlString = "<h1>Your Account Has Been Deleted</h1>"
        Utils.sendEmail(user.email, "We're sad to see you go.", htmlString);


        response.status(200).json({});
    } catch (err) {
        console.log(err);
        response.status(404).json({
            "code": 'user-delete-failed',
            "messages": ["Unable to find user with given id:" + userId]
        });
    }
})

const validateUserFieldsInRequestBody = async (request) => {
    let errors = [];

    const { username, email, password } = request.body;

    if (Utils.isEmptyOrNil(username)) {
        errors.push("Username cannot be empty.");
    }

    if (Utils.isEmptyOrNil(email)) {
        errors.push("Email cannot be empty.");
    } else if (!(await isEmailValid(email))) {
        errors.push("Invalid email");
    }

    if (Utils.isEmptyOrNil(password)) {
        errors.push("Password cannot be empty.");
    } else if (password.length < 8) {
        errors.push("Password must be at least 8 characters long.");
    }

    return errors;
};

async function isEmailValid(email){
    return (await emailValidator.validate(email)).valid;
}

module.exports = {
    getUserForAdminRoute,
    getUserForProtectedRoute,
    listUsers,
    createUser,
    updateUserForAdminRoute,
    updateUserForProtectedRoute,
    deleteUserForAdminRoute,
    deleteUserForProtectedRoute,
}