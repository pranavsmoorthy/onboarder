const mongoose = require("mongoose");
const courseSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add the course title"]
    },
    description: {
        type: String,
    },
    link: {
        type: String,
        required: [true, "Please add the course link"]
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Course", courseSchema);