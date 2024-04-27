const mongoose = require("mongoose")


const favoriteschema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
    },
    art: {
        type: Object,
        required: true
    },
    user: {
        type: Object,
        required: true
    }
})

const favorite = mongoose.model("Favorite",favoriteschema)

module.exports = favorite