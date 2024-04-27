const mongoose = require('mongoose');
const moment = require('moment-timezone');

const transactionschema = new mongoose.Schema({
    transactionid: {
        type: Number,
        unique: true,
        required: true,
        default: () => generateRandomId()
    },
    cardnum: {
        type: Number,
        required: true
    },
    artwork: {
        type: Object,
        required: true,
        unique: true
    },
    user: {
        type: Object,
        required: true
    },
    transactiontime: {
        type: String,
        default: () => moment().tz('Asia/Kolkata').format('DD-MM-YYYY HH:mm:ss A')
    },
    status: {
        type: String,
        required: true
    }
})

function generateRandomId() {
    return Math.floor(Math.random() * 9000000) + 1000000;
}

const transaction = mongoose.model("Transaction",transactionschema)

module.exports = transaction