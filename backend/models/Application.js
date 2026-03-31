const mongoose = require("mongoose");
const moment = require("moment-timezone");

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  otherOccupation: { type: String },
  phone: { type: String, required: true },
  cityState: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  email: { type: String, required: true },
  workCode: { type: String }, // optional
  notes: { type: String },
  createdAt: { 
    type: Date, 
    default: () => moment.tz("America/New_York").toDate() 
  },
  updatedAt: { 
    type: Date, 
    default: () => moment.tz("America/New_York").toDate() 
  }
});

// Update updatedAt automatically on every save
applicationSchema.pre('save', function() {
  this.updatedAt = moment.tz("America/New_York").toDate();
});

module.exports = mongoose.model("Application", applicationSchema, "applications");