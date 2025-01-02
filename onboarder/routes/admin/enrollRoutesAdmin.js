const express = require("express");
const router = express.Router();

const {
    enrollUser,
    unenrollUser
} = require("../../controllers/enrollController");

router.route('/')
    .post(enrollUser)
    .delete(unenrollUser);

module.exports = router;