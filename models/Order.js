const mongoose = require('mongoose');
const moment = require('moment-timezone');

const orderschema = new mongoose.Schema({
    orderid: {
        type: Number,
        unique: true,
        required: true,
        default: () => generateRandomId()
    },
    artwork: {
        type: Object,
        required: true,
        unique: true
    },
    User: {
        type: Object,
        required: true
    },
    address: {
        type:String,
        required: true
    },
    ordertime: {
        type: String,
        default: () => moment().tz('Asia/Kolkata').format('DD-MM-YYYY HH:mm:ss A')
    }
})

function generateRandomId() {
    return Math.floor(Math.random() * 900000) + 100000;
}

const order = mongoose.model("Order",orderschema)

module.exports = order