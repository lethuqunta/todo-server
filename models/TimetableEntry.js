const mongoose = required("mongoose");

const timetableEntrySchema = new mongoose.Schema({

  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true
  },

  dayOfWeek: {
    type: String,
    required: true,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ]
  },

  StartTime: {
    type: String,
    required: true
  },

  endTime: {
    type: String,
    required: true
  },

  notes: {
    type: String,
    required: true
  },

  userId: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("TimetableEntry", timetableEntrySchema);