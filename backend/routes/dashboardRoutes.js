const express = require("express");

const { getAdminStats } = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/admin", protect, admin, getAdminStats);

module.exports = router;