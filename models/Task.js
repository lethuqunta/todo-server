const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  dat: {
    type: String,
    defualt: ""
  },

  done: {
    type: Boolean,
    default: false
  },

  userId: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);