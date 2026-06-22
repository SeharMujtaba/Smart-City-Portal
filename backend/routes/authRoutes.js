const express = require("express");

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * AUTH ROUTES
 */
router.post("/register", registerUser);
router.post("/login", loginUser);

/**
 * PROTECTED TEST ROUTE
 */
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "You accessed protected route",
    user: req.user,
  });
});

module.exports = router;