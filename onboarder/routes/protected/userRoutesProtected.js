const express = require("express");
const router = express.Router();

const {
    getUserForProtectedRoute,
    createUser,
    updateUserForProtectedRoute,
    deleteUserForProtectedRoute,
} = require("../../controllers/userController");

router.route('/')
    .post(createUser)
    .get(getUserForProtectedRoute)
    .put(updateUserForProtectedRoute)
    .delete(deleteUserForProtectedRoute);

module.exports = router;