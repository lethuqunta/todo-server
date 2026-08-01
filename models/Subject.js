const mongoose =  require("mongoose");

const subjectSchema = new mongoose.Schema({

  name: {
    type: String,
    require: true
  },

  colour: {
    type: String,
    default: "#00b4d8"
  },

  userId: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Subject", subjectSchema);