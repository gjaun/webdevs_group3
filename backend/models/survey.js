const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // referring user model
    required: true,
  },
});

module.exports = mongoose.model('Survey', surveySchema);
