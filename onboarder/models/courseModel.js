const mongoose = require("mongoose");
const questionSchema = mongoose.Schema({
    prompt: {
        type: String,
        required: [true, "Please add the prompt"]
    },
    answers: {
        type: Array,
        required: [true, "Please add the answers"]
    },
    correstAnswerNumber: {
        type: Number,
        required: [true, "Please add the correct answer"]
    }
});

const examSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add the test title"]
    },
    questions: {
        type: [[questionSchema]],
        required: [true, "Please add the test questions"]
    },
    passMark: {
        type: Number,
        required: [true, "Please add the test pass mark"]
    }
});

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
    exam: {
        type: [examSchema]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Course", courseSchema);