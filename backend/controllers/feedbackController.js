const Feedback = require("../models/Feedback");

// Create feedback
const createFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create({
      user: req.user._id,
      rating: req.body.rating,
      message: req.body.message,
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all feedback (Admin)
const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createFeedback,
  getAllFeedback,
};