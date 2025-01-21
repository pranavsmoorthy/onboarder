const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const Utils = require("../utils/utilities");

const loginUser = asyncHandler(async (request, response) => {
    try {
        const { email, password } = request.body;

        console.log(JSON.stringify(request.body));
        const user = await User.findOne({
            $or: [{ email: email }, { username: email }],
            "password": password
        });

        if (!user) {
            return response.status(401).json({
                code: "user-login-failed",
                message: 'Invalid credentials'
            });
        }

        if (password !== user.password) {
            return response.status(401).json({
                code: "user-login-failed",
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign({
            userId: user.id,
            role: user.role
        }, "shanthanav");

        let htmlString = "<h1>New sign-on notification</h1><p>Welcome back to Onboarder!</p>"
        Utils.sendEmail(user.email, "New sign on notification", htmlString);

        var expiryDate = new Date(Date.now() + (24 * 60 * 60 * 1000));
        response
            .clearCookie("token")
            .cookie('token', token, { expires: expiryDate })
            .status(200)
            .json({ "token": token });
    } catch (err) {
        console.log(err);
        response.status(500).json({
            "code": 'user-login-failed',
            "messages": ["Error logging in user with given email and password"]
        });
    }
});

const logoutUser = asyncHandler(async (request, response) => {
    try {
        response
            .clearCookie("token")
            .status(200)
            .json({ message: "Successfully logged out" });
    } catch (err) {
        console.log(err);
        response.status(500).json({
            "code": 'user-logout-failed',
            "messages": ["Error logging in user with given email and password"]
        });
    }
});

module.exports = {
    loginUser,
    logoutUser
}