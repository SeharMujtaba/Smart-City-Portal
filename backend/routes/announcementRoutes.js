const express = require("express");

const {
  createAnnouncement,
  getAnnouncements,
} = require("../controllers/announcementController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const router = express.Router();

// Public for logged-in users
router.get("/", getAnnouncements);

// Admin only
router.post("/", protect, admin, createAnnouncement);

module.exports = router;