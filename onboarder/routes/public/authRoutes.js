const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const {
    loginUser,
    logoutUser,
    verifyJWTToken
} = require("../../controllers/authController");

router.route('/')
    .post(loginUser)
    .get(logoutUser);

router.route('/authenticate')
    .get(verifyJWTToken);

module.exports = router;