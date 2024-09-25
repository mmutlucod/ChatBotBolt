
const mongoose = require('mongoose');


const responseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Response', responseSchema);
