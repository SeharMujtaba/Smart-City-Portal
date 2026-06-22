const express = require("express");
const http = require("http");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const connectDB = require("./config/db");

// =====================
// ROUTES
// =====================
const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const newsRoutes = require("./routes/newsRoutes");
const tourismRoutes = require("./routes/tourismRoutes");

// NEW ADMIN ROUTES
const adminRoutes = require("./routes/adminRoutes");

// =====================
// ERROR MIDDLEWARE
// =====================
const { errorHandler } = require("./middleware/errorMiddleware");

// =====================
// APP INIT
// =====================
const app = express();
const server = http.createServer(app);

// =====================
// DATABASE CONNECTION
// =====================
connectDB();

// =====================
// SECURITY
// =====================
app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

// =====================
// MIDDLEWARE
// =====================
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// =====================
// API ROUTES
// =====================
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/tourism", tourismRoutes);

// NEW ADMIN API
app.use("/api/admin", adminRoutes);

// =====================
// DEBUG ROUTE
// =====================
app.get("/debug-announcements", async (req, res) => {
  try {
    const Announcement = require("./models/Announcement");

    const data = await Announcement.find();

    res.json({
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// =====================
// HOME
// =====================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🏙 Smart City API Running Successfully",
  });
});

// =====================
// 404
// =====================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// =====================
// ERROR HANDLER
// =====================
app.use(errorHandler);

// =====================
// START SERVER
// =====================
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});