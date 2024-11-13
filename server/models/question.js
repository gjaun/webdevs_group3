const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  surveyid: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('question', questionSchema)