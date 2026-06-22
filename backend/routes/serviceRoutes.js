const express = require("express");

const {
  createService,
  getServices,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const router = express.Router();

// USER
router.post("/", protect, createService);

// ADMIN
router.get("/", protect, admin, getServices);
router.put("/:id", protect, admin, updateService);
router.delete("/:id", protect, admin, deleteService);

module.exports = router;