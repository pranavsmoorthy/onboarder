const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Course = require("../models/courseModel");
const Enrollment = require("../models/enrollmentModel");
const Utils = require("../utils/utilities");
const { constants } = require("../constants");
const { update } = require("lodash");

const enrollUser = asyncHandler(async (request, response) => {
    try {
        const course = await Course.findById(request.body.courseId);

        if (Utils.isEmptyOrNil(course)) {
            response.status(404).json({
                "code": 'course-enroll-failed',
                "messages": ["Unable to find course with given id"]
            });
            return;
        }

        const user = await User.findById(request.body.userId);

        if (Utils.isEmptyOrNil(user)) {
            response.status(404).json({
                "code": 'course-enroll-failed',
                "messages": ["Could not find user with given id: " + request.body.userId]
            });
            return;
        }

        const query = {
            userId: request.body.userId,
            courseId: request.body.courseId
        };

        const result = await Enrollment.findOne(query);

        if (result) {
            response.status(409).json({
                "code": 'course-enroll-failed',
                "messages": ["User with given id already enrolled in given course"]
            });
            return;
        }

        let progress = request.body.progress;

        if (Utils.isEmptyOrNil(progress)) {
            progress = "Not Started";
        }

        const enrollment = await Enrollment.create({
            userId: request.body.userId,
            courseId: request.body.courseId,
            completionDate: request.body.completionDate,
            progress: progress
        });

        let htmlString = "<h1>Congratulations!</h1><p>You have been enrolled in the following course: " + course.title
            + "</p><p>This course is due at " + request.body.completionDate
            + "</p><p>For more information, please visit your <a href='http://onboarder.com:5001/index.html'>Onboarder courses page</a>!</p><p><br></p>";

        Utils.sendEmail(user.email, "You have been enrolled in a course", htmlString);

        response.status(200).json(enrollment);
    } catch (err) {
        console.log(err);
        response.status(500).json({
            "code": 'course-enrolled-failed',
            "messages": ['Failed to enroll user to course']
        })
    }
})

const updateEnrollStatus = asyncHandler(async (request, response) => {
    try {
        const query = {
            userId: request.body.userId,
            courseId: request.body.courseId
        };

        const result = await Enrollment.findOne(query);

        if (Utils.isEmptyOrNil(result)) {
            response.status(404).json({
                "code": 'enrollment-not-found',
                "messages": ["Could not find enrollment with given user id and course id"]
            });
            return;
        }

        const data = {
            userId: request.body.userId,
            courseId: request.body.courseId,
            completionDate: result.completionDate,
            progress: request.body.progress
        };

        const updatedEnrollment = await Enrollment.findByIdAndUpdate(
            result._id,
            data,
            { new: true }
        );

        response.status(200).json(updatedEnrollment);
    } catch (err) {
        console.log(err);
        response.status(500).json({
            "code": 'course-enrolled-failed',
            "messages": ['Failed to enroll user to course']
        })
    }
})


const unenrollUser = asyncHandler(async (request, response) => {
    try {
        const course = await Course.findById(request.body.courseId);

        if (Utils.isEmptyOrNil(course)) {
            response.status(404).json({
                "code": 'course-enroll-failed',
                "messages": ["Unable to find course with given id"]
            });
            return;
        }

        const user = await User.findById(request.body.userId);

        if (Utils.isEmptyOrNil(user)) {
            response.status(404).json({
                "code": 'course-enroll-failed',
                "messages": ["Could not find user with given id: " + request.body.userId]
            });
            return;
        }

        const query = {
            userId: request.body.userId,
            courseId: request.body.courseId
        };

        const result = await Enrollment.findOne(query);

        if (!result) {
            response.status(409).json({
                "code": 'course-unenroll-failed',
                "messages": ["User with given id could not be found in given course"]
            });
            return;
        }

        await Enrollment.deleteOne(result);

        let htmlString = "<h1>Successfully Unenrolled</h1><p>You have been unenrolled from the following course: " + course.title
            + "</p><p>For more information, please visit your <a href='http://onboarder.com:5001/index.html'>Onboarder courses page</a>!</p><p><br></p>"

        Utils.sendEmail(user.email, "You have been unenrolled from a course", htmlString);

        response.status(200).json({
            result
        });
    } catch (err) {
        console.log(err);
        response.status(500).json({
            "code": 'course-unenrolled-failed',
            "messages": ['Failed to unenroll user to course']
        })
    }
})

module.exports = {
    enrollUser,
    updateEnrollStatus,
    unenrollUser
}