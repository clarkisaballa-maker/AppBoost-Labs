const express = require("express");
const cors = require("cors");

const connectDB = require("./db"); // 👈 import it
const Application = require("./models/Application");

const app = express();

// Connect to DB
connectDB(); // 👈 call it

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Form submission endpoint
app.post("/api/applications", async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();

    console.log("Application saved successfully!");
    res.status(201).json({
      message: "Application submitted successfully",
      data: application
    });
  } catch (err) {
    console.error("Error saving application:", err.message);
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
});

// GET all applications with pagination
app.get("/api/applications", async (req, res) => {
  try {
    // Get page number from query params, default is 1
    const page = parseInt(req.query.page) || 1;
    const limit = 20; // 20 entries per page
    const skip = (page - 1) * limit;

    // Get total number of documents
    const total = await Application.countDocuments();

    // Fetch applications with pagination, sorted by newest first
    const applications = await Application.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      page,
      totalPages: Math.ceil(total / limit),
      totalApplications: total,
      applications
    });
  } catch (err) {
    console.error("Error fetching applications:", err.message);
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));