const mongoose = require("mongoose");
const moment = require("moment-timezone"); // npm i moment-timezone

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  otherOccupation: { type: String },
  phone: { type: String, required: true },
  cityState: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  email: { type: String, required: true },
  workCode: { type: String }, // optional
  createdAt: { type: Date, default: null }, // will be set in pre-save
  updatedAt: { type: Date, default: null }  // will be set in pre-save
});

// Pre-save hook to set timestamps in Eastern Time
applicationSchema.pre('save', function (next) {
  const now = moment.tz("America/New_York").toDate(); // Eastern Time
  if (!this.createdAt) this.createdAt = now;
  this.updatedAt = now;
  next();
});

module.exports = mongoose.model("Application", applicationSchema, "applications");