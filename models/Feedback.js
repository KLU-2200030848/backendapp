const mongoose = require("mongoose")

const feedbackschema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    }
})

const feedback = mongoose.model('Feedback', feedbackschema)

module.exports = feedback
