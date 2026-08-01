const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({

  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true
  },

  examDate: {
    type: String,
    required: true
  },

  examTime: {
    type: String,
    required: true
  },

  venue: {
    type: String,
    default: ""
  },

  durationMinutes: {
    type: Number,
    default: 120
  },

  notes: {
    type: String,
    default: ""
  },

  userId: {
    type: String,
    required: true
  }
}, { timestamps: true });