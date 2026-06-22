const mongoose = require("mongoose");

const tourismPlaceSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    category: String,
    location: String,
    image: String,

    // NEW FIELDS
    images: {
      type: [String], // for slider
      default: [],
    },

    bestTimeToVisit: {
      type: String,
      default: "All seasons",
    },

    latitude: {
      type: Number,
      default: 34.0837,
    },

    longitude: {
      type: Number,
      default: 74.7973,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TourismPlace", tourismPlaceSchema);