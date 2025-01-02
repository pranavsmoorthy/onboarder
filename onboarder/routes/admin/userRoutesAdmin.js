const express = require("express");
const router = express.Router();

const {
    listUsers,
    getUserForAdminRoute,
    updateUserForAdminRoute,
    deleteUserForAdminRoute
} = require("../../controllers/userController");

router.route('/')
    .get(listUsers);

router.route('/:id')
    .get(getUserForAdminRoute)
    .put(updateUserForAdminRoute)
    .delete(deleteUserForAdminRoute);


module.exports = router;