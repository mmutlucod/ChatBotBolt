const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  currentQuestionIndex: {
    type: Number,
    required: true,
    default: 0,
  },
  startedAt: {
    type: Date,
    default: Date.now, 
  },
  endedAt: {
    type: Date, 
  },
  completed: {
    type: Boolean,
    default: false, 
  },
});

module.exports = mongoose.model('Session', sessionSchema);
