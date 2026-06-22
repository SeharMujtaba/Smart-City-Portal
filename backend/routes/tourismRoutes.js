const express = require("express");

const {
  getPlaces,
  getPlaceById,
  getRecommendations,
  createPlace,
  deletePlace,
} = require("../controllers/tourismController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const router = express.Router();

// PUBLIC
router.get("/", getPlaces);
router.get("/:id", getPlaceById);

// 🔥 AI ROUTE
router.get("/recommend/:id", getRecommendations);

// ADMIN
router.post("/", protect, admin, createPlace);
router.delete("/:id", protect, admin, deletePlace);

module.exports = router;