const mongoose = require('mongoose')

const surveySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  creator: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  user_pass: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Survey', surveySchema)