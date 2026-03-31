const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  otherOccupation: { type: String },
  phone: { type: String, required: true },
  cityState: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  email: { type: String, required: true }
}, { timestamps: true });

// Collection name is optional; MongoDB will pluralize if not provided
module.exports = mongoose.model("Application", applicationSchema, "applications");