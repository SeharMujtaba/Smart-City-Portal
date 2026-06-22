const express = require("express");

const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
} = require("../controllers/complaintController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const router = express.Router();

/**
 * =========================
 * USER ROUTES
 * =========================
 */

// Create a complaint (User)
router.post("/", protect, createComplaint);

// Get logged-in user's complaints
router.get("/", protect, getMyComplaints);

/**
 * =========================
 * ADMIN ROUTES
 * =========================
 */

// Get ALL complaints (Admin only)
router.get("/admin/all", protect, admin, getAllComplaints);

// Update complaint status (Admin only)
router.put("/:id/status", protect, admin, updateComplaintStatus);

module.exports = router;