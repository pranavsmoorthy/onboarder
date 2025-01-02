const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the user username"]
    },
    email: {
        type: String,
        required: [true, "Please add the user email"]
    },
    password: {
        type: String,
        required: [true, "Please add the user password"]
    },
    role: {
        type: String,
        required: [true, "Please add the user role"],
        enum: ['User', 'Admin']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);