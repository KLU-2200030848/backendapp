const mongoose = require("mongoose")

const customerschema = new mongoose.Schema({
    fullname: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required:true,
      enum: ['male', 'female', 'others']
    },
    dateofbirth: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    contact: {
        type: String,
        required: true,
        unique:true
      },
    password: {
      type: String,
      required: true
    },
    
  });

const customer = mongoose.model('customers', customerschema);

module.exports = customer;