const News = require("../models/News");
const Announcement = require("../models/Announcement");
const Complaint = require("../models/Complaint");
const TourismPlace = require("../models/TourismPlace");

const getDashboard = async (req, res) => {
  try {
    const news = await News.countDocuments();
    const tourism = await TourismPlace.countDocuments();
    const announcements = await Announcement.countDocuments();
    const complaints = await Complaint.countDocuments();

    const recentComplaints = await Complaint.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      stats: {
        news,
        tourism,
        announcements,
        complaints,
      },
      complaints: recentComplaints,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Dashboard loading failed.",
    });
  }
};

module.exports = {
  getDashboard,
};