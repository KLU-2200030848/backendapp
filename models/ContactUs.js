const mongoose = require("mongoose")

const contactusschema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
}) 

const contactus = mongoose.model('ContactUs', contactusschema)

module.exports = contactus