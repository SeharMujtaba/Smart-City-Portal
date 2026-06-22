const Service = require("../models/Service");

// CREATE SERVICE REQUEST
const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL REQUESTS (ADMIN)
const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json([]);
  }
};

// UPDATE STATUS (ADMIN)
const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Not found" });
    }

    service.status = req.body.status || service.status;

    await service.save();

    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE SERVICE
const deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createService,
  getServices,
  updateService,
  deleteService,
};