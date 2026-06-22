const express = require("express");

const {
  createFeedback,
  getAllFeedback,
} = require("../controllers/feedbackController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const router = express.Router();

// User
router.post("/", protect, createFeedback);

// Admin
router.get("/", protect, admin, getAllFeedback);

module.exports = router;