const mongoose = require("mongoose")

const artistschema = new mongoose.Schema({
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
    graduation: {
      type: String,
      required: true,
      enum: ['N/A','B. Fine Arts','B. Arts','M. Fine Arts','M. Arts','others']
    },
    artistname: {
      type: String,
    },
    description: {
      type: String,
      required: true
    },
    socialmedialinks: {
      type: String
    },
    password: {
      type: String,
      required: true
    },   
  });

const artist = mongoose.model('artists', artistschema);

module.exports = artist;