const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ["News", "Alert", "Emergency"],
      default: "News",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcementSchema);