const otpGenerator = require("otp-generator");
const OTP = require("../models/otpModel");
const User = require("../models/userModel");
const Utils = require("../utils/utilities");
const emailValidator = require("deep-email-validator");
const asyncHandler = require("express-async-handler");

const sendOTP = asyncHandler(async (request, response) => {
    try {
        const validationMessage = await validateUserFieldsInRequestBody(request);
        if (validationMessage.length != 0) {
            response.status(400).json({
                "code": 'user-create-failed',
                "messages": validationMessage
            });
            return;
        }

        const { email } = request.body;

        const checkUserPresent = await User.findOne({ email });

        if (checkUserPresent) {
            return response.status(401).json({
                success: false,
                message: 'User is already registered',
            });
        }

        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        let result = await OTP.findOne({ otp: otp });
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
            });
            result = await OTP.findOne({ otp: otp });
        }

        const otpPayload = { email, otp };
        const otpBody = await OTP.create(otpPayload);

        response.status(200).json({
            "OTP": otp
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: "otp-send-failed", message: "Could not send OTP to desired email" });
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

async function isEmailValid(email) {
    return (await emailValidator.validate(email)).valid;
}

module.exports = {
    sendOTP
}