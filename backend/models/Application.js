const mongoose = require("mongoose");
const moment = require("moment-timezone");

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  otherOccupation: { type: String },
  phone: { type: String, required: true },
  message: { type: String },
  source: { type: String },

  cityState: { type: String, default: "" },
  paymentMethod: { type: String, default: "" },
  email: { type: String, default: "" },

  workCode: { type: String },
  notes: { type: String },
  salesPersonTg: { type: String },

  createdAt: {
    type: Date,
    default: () => moment.tz("America/New_York").toDate(),
  },
  updatedAt: {
    type: Date,
    default: () => moment.tz("America/New_York").toDate(),
  }
});

applicationSchema.pre("save", function () {
  this.updatedAt = moment.tz("America/New_York").toDate();
});

module.exports = mongoose.model("Application", applicationSchema, "applications");