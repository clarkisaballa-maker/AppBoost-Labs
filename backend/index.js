const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Application = require("./models/Application");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB directly using standard connection string
mongoose.connect(
  "mongodb://clarkisaballa_db_user:413spq5floRlH5YS@atlas-sql-69cb1b39af35c04f49447b85-32p12p.a.query.mongodb.net/appboost?ssl=true&authSource=admin"
)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => res.send("API is running..."));

// Form submission endpoint
app.post("/api/applications", async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.status(201).json({ message: "Application submitted successfully", data: application });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));