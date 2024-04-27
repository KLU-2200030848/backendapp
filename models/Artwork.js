const mongoose = require('mongoose');
const moment = require('moment-timezone');

const artworkschema = new mongoose.Schema({
    artid: {
        type: Number,
        unique: true,
        required: true,
        default: () => generateRandomId()
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required:true,
        enum: ['Painting', 'Portrait', 'Sketch', 'Sculpture', 'Photography', 'DigitalArt']
    },
    description: {
        type: String,
        required: true
    },
    dimensions: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    postedtime: {
        type: String,
        default: () => moment().tz('Asia/Kolkata').format('DD-MM-YYYY HH:mm:ss A')
    },
    artist: {
        type: Object,
        required: true
    },
    file: {
        type: String,
        required: true,
    },
    availability: {
        type: String,
        required: true,
        default: "available"
    }   
})

const artwork = mongoose.model('Artwork', artworkschema)

function generateRandomId() {
    return Math.floor(Math.random() * 900000) + 100000;
}

module.exports = artwork;