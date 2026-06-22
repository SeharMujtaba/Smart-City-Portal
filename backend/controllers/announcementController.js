const Announcement = require("../models/Announcement");

// Create announcement (ADMIN)
const createAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.create(req.body);

    // 🔴 REAL-TIME EMIT
    const io = req.app.get("io");
    io.emit("new-announcement", announcement);

    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all announcements (USER + ADMIN)
const getAnnouncements = async (req, res) => {
  try {
    const data = await Announcement.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAnnouncement,
  getAnnouncements,
};

