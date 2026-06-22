const Complaint = require("../models/Complaint");
const Service = require("../models/ServiceRequest");

const getAdminStats = async (req, res) => {
  try {
    const totalComplaints = await Complaint.countDocuments();
    const pendingComplaints = await Complaint.countDocuments({ status: "Pending" });
    const resolvedComplaints = await Complaint.countDocuments({ status: "Resolved" });

    const totalServices = await Service.countDocuments();

    res.json({
      totalComplaints,
      pendingComplaints,
      resolvedComplaints,
      totalServices,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAdminStats };