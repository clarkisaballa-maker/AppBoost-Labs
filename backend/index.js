const express = require("express");
const cors = require("cors");
const moment = require("moment-timezone");

const connectDB = require("./db"); // 👈 import it
const Application = require("./models/Application");
const SalesPerson = require("./models/SalesPerson");
const Counter = require("./models/Counter");

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

const sendTelegramMessage = async (text) => {
  const BOT_TOKEN = "8622519949:AAEzskvneiCfVIExLagyLx7ELDSAqVlF6R8";
  const CHAT_ID = "-5055119705";

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "HTML",
        }),
      }
    );

    const data = await res.json();

    if (!data.ok) {
      console.error("Telegram API error:", data);
    }
  } catch (error) {
    console.error("Telegram fetch error:", error.message);
  }
};

app.post("/api/apply", async (req, res) => {
  try {
    const { name, age, phone, message, source } = req.body;

    // only validate fields that Next.js actually sends
    if (!name || !age || !phone) {
      return res.status(400).json({
        message: "name, age and phone are required",
      });
    }

    // round-robin assignment logic
    const salesPersons = await SalesPerson.find().sort({ createdAt: 1 });

    if (salesPersons.length === 0) {
      return res.status(400).json({
        message: "No SalesPersons available",
      });
    }

    let counter = await Counter.findOne({ name: "salesPersonIndex" });

    if (!counter) {
      counter = new Counter({ name: "salesPersonIndex", value: 0 });
    }

    const index = counter.value % salesPersons.length;
    const selectedSalesPerson = salesPersons[index];

    // create application with only frontend fields + assigned tg
    const application = new Application({
      name,
      age,
      phone,
      message: message || "",
      source: source || "direct",
      salesPersonTg: selectedSalesPerson.tgUsername,
    });

    await application.save();

    counter.value += 1;
    await counter.save();

    const telegramMessage = `
📩 <b>New user applied for the job</b>

👤 <b>Name:</b> ${application.name}
🎂 <b>Age:</b> ${application.age}
📞 <b>Phone:</b> ${application.phone}
🌐 <b>Source:</b> ${application.source || "direct"}
📝 <b>Message:</b> ${application.message || "N/A"}

👨‍💼 <b>Assigned To:</b> @${selectedSalesPerson.tgUsername}
`;

    await sendTelegramMessage(telegramMessage);

    console.log(`Assigned to: ${selectedSalesPerson.tgUsername}`);

    res.status(201).json({
      message: "Application submitted successfully",
      assignedTo: selectedSalesPerson.tgUsername,
      data: application,
    });
  } catch (err) {
    console.error("Error saving application:", err.message);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

app.post("/api/applications", async (req, res) => {
  try {
    const { workCode } = req.body;

    if (!workCode) {
      return res.status(400).json({
        message: "workCode is required",
      });
    }

    // 🔍 Find SalesPerson by workCode
    const selectedSalesPerson = await SalesPerson.findOne({ workCode });

    if (!selectedSalesPerson) {
      return res.status(404).json({
        message: "No SalesPerson found with this workCode",
      });
    }

    // ✅ Assign TG username
    req.body.salesPersonTg = selectedSalesPerson.tgUsername;

    const application = new Application(req.body);
    await application.save();

    // ✅ Telegram Message
    const message = `
📩 <b>New Application Assigned</b>

👤 <b>Name:</b> ${application.name}
🎂 <b>Age:</b> ${application.age}
📞 <b>Phone:</b> ${application.phone}
📍 <b>City:</b> ${application.cityState}
💳 <b>Payment:</b> ${application.paymentMethod}
📧 <b>Email:</b> ${application.email}
💼 <b>Work Code:</b> ${application.workCode || "N/A"}
📝 <b>Notes:</b> ${application.notes || "N/A"}

👨‍💼 <b>Assigned To:</b> @${selectedSalesPerson.tgUsername}
`;

    await sendTelegramMessage(message);

    console.log(`Assigned to: ${selectedSalesPerson.tgUsername}`);

    res.status(201).json({
      message: "Application submitted successfully",
      assignedTo: selectedSalesPerson.tgUsername,
      data: application,
    });

  } catch (err) {
    console.error("Error saving application:", err.message);
    res.status(500).json({
      message: "Server error",
      error: err.message,
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

app.put("/api/applications/updateNotes", async (req, res) => {
  try {
    const { id, notes } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Application ID is required" });
    }

    // Find the application by ID
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Update the notes field
    application.notes = notes || "";
    await application.save();

    res.status(200).json({
      message: "Notes updated successfully",
      data: application,
    });
  } catch (err) {
    console.error("Error updating notes:", err.message);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

// DELETE application by ID
app.delete("/api/applications/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if ID exists
    if (!id) {
      return res.status(400).json({ message: "Application ID is required" });
    }

    // Find and delete
    const application = await Application.findByIdAndDelete(id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({
      message: "Application deleted successfully",
      data: application,
    });
  } catch (err) {
    console.error("Error deleting application:", err.message);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

// GET applications by date range
app.get("/api/applications/by-date", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        message: "Both startDate and endDate are required in YYYY-MM-DD format"
      });
    }

    // Convert to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Make sure end includes the whole day
    end.setHours(23, 59, 59, 999);

    const applications = await Application.find({
      createdAt: { $gte: start, $lte: end },
    }).sort({ createdAt: -1 });

    res.status(200).json({
      total: applications.length,
      applications,
    });
  } catch (err) {
    console.error("Error fetching applications by date:", err.message);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

app.post("/api/salespersons", async (req, res) => {
  try {
    const { name, tgUsername, workCode } = req.body;

    if (!name || !tgUsername) {
      return res.status(400).json({
        message: "Name and tgUsername are required",
      });
    }

    const salesPerson = new SalesPerson({
      name,
      tgUsername,
      workCode
    });

    await salesPerson.save();

    res.status(201).json({
      message: "SalesPerson created successfully",
      data: salesPerson,
    });
  } catch (err) {
    console.error("Error creating SalesPerson:", err.message);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

app.get("/api/salespersons", async (req, res) => {
  try {
    const salesPersons = await SalesPerson.find().sort({ createdAt: -1 });

    res.status(200).json({
      total: salesPersons.length,
      data: salesPersons,
    });
  } catch (err) {
    console.error("Error fetching SalesPersons:", err.message);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

app.put("/api/salespersons/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, tgUsername, workCode } = req.body;

    const salesPerson = await SalesPerson.findById(id);

    if (!salesPerson) {
      return res.status(404).json({ message: "SalesPerson not found" });
    }

    if (name) salesPerson.name = name;
    if (tgUsername) salesPerson.tgUsername = tgUsername;
    if (workCode !== undefined) salesPerson.workCode = workCode;

    await salesPerson.save();

    res.status(200).json({
      message: "SalesPerson updated successfully",
      data: salesPerson,
    });
  } catch (err) {
    console.error("Error updating SalesPerson:", err.message);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

app.delete("/api/salespersons/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const salesPerson = await SalesPerson.findByIdAndDelete(id);

    if (!salesPerson) {
      return res.status(404).json({ message: "SalesPerson not found" });
    }

    res.status(200).json({
      message: "SalesPerson deleted successfully",
      data: salesPerson,
    });
  } catch (err) {
    console.error("Error deleting SalesPerson:", err.message);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));