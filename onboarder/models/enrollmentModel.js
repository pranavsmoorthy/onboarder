const mongoose = require("mongoose");
const enrollmentSchema = mongoose.Schema({
    userId: {
        type: String,
        required: [true, "Please add the user id"]
    },
    courseId: {
        type: String,
        required: [true, "Please add the course id"]
    },
    completionDate: {
        type: String,
        required: [true, "Please add the completion date"]
    },
    progress: {
        type: String,
        required: [true, "Please add the completion date"],
        enum: ['Not Started', 'In Progress', 'Completed', 'Exam Passed', 'Exam Failed']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);