const TourismPlace = require("../models/TourismPlace");

// ==============================
// GET ALL PLACES
// ==============================
const getPlaces = async (req, res) => {
  try {
    const places = await TourismPlace.find().sort({ createdAt: -1 });
    res.json(places);
  } catch (error) {
    res.status(500).json([]);
  }
};

// ==============================
// GET SINGLE PLACE
// ==============================
const getPlaceById = async (req, res) => {
  try {
    const place = await TourismPlace.findById(req.params.id);
    if (!place) return res.status(404).json({ message: "Not found" });

    res.json(place);
  } catch (error) {
    res.status(500).json(null);
  }
};

// ==============================
// AI RECOMMENDATION ENGINE
// ==============================
const getRecommendations = async (req, res) => {
  try {
    const { id } = req.params;

    const current = await TourismPlace.findById(id);
    if (!current) return res.status(404).json([]);

    const all = await TourismPlace.find();

    const results = all
      .filter((p) => p._id.toString() !== id)
      .map((p) => {
        let score = 0;

        // CATEGORY MATCH (BIG BOOST)
        if (p.category === current.category) score += 5;

        // LOCATION MATCH
        if (p.location === current.location) score += 3;

        // NAME SIMILARITY (basic AI logic)
        const keyword = current.name.split(" ")[0].toLowerCase();
        if (p.name.toLowerCase().includes(keyword)) {
          score += 2;
        }

        return {
          ...p._doc,
          score,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);

    res.json(results);
  } catch (err) {
    console.log("AI Error:", err.message);
    res.status(500).json([]);
  }
};

// ==============================
// CREATE PLACE
// ==============================
const createPlace = async (req, res) => {
  try {
    const place = await TourismPlace.create(req.body);
    res.status(201).json(place);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==============================
// DELETE PLACE
// ==============================
const deletePlace = async (req, res) => {
  try {
    await TourismPlace.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPlaces,
  getPlaceById,
  getRecommendations,
  createPlace,
  deletePlace,
};