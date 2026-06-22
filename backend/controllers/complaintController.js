const Complaint = require("../models/Complaint");

/**
 * @desc Create a complaint
 * @route POST /api/complaints
 * @access Private (User)
 */
const createComplaint = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const complaint = await Complaint.create({
      user: req.user._id,
      title,
      description,
      category,
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc Get logged-in user's complaints
 * @route GET /api/complaints
 * @access Private (User)
 */
const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user._id });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc Get all complaints
 * @route GET /api/complaints/admin/all
 * @access Private (Admin)
 */
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc Update complaint status
 * @route PUT /api/complaints/:id/status
 * @access Private (Admin)
 */
const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = status;
    await complaint.save();

    res.json({
      message: "Complaint status updated successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
};