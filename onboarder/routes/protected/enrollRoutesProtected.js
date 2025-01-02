const express = require("express");
const router = express.Router();

const {
    updateEnrollStatus
} = require("../../controllers/enrollController");

router.route('/')
    .put(updateEnrollStatus)

module.exports = router;