const Complaint = require("../models/Complaint");

const createComplaintService = async (data) => {
  return await Complaint.create(data);
};

const getUserComplaintsService = async (userId) => {
  return await Complaint.find({ user: userId });
};

module.exports = {
  createComplaintService,
  getUserComplaintsService,
};