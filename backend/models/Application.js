const mongoose = require("mongoose");
const moment = require("moment-timezone");

const applicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
      min: 18,
    },

    otherOccupation: {
      type: String,
      default: null,
      trim: true,
    },

    // Contact system
    contactMethod: {
      type: String,
      enum: ["telegram", "whatsapp", "sms_call"],
      default: "telegram",
      required: true,
    },

    // OPTIONAL CONTACT FIELDS
    telegram: {
      type: String,
      default: null,
      trim: true,
      unique: true,
      sparse: true,
    },

    whatsapp: {
      type: String,
      default: null,
      trim: true,
      unique: true,
      sparse: true,
    },

    phone: {
      type: String,
      default: null,
      trim: true,
      unique: true,
      sparse: true,
    },

    message: {
      type: String,
      default: "",
      trim: true,
    },

    source: {
      type: String,
      default: "direct",
      trim: true,
    },

    ipAddress: {
      type: String,
      default: "",
    },

    cityState: {
      type: String,
      default: "",
      trim: true,
    },

    paymentMethod: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    workCode: {
      type: String,
      default: null,
      trim: true,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    salesPersonTg: {
      type: String,
      default: null,
      trim: true,
    },

    createdAt: {
      type: Date,
      default: () =>
        moment.tz("America/New_York").toDate(),
    },

    updatedAt: {
      type: Date,
      default: () =>
        moment.tz("America/New_York").toDate(),
    },
  },
  {
    versionKey: false,
  }
);

// Auto update timestamp
applicationSchema.pre("save", function () {
  this.updatedAt =
    moment.tz("America/New_York").toDate();

  // Empty strings -> null
  if (this.telegram === "") {
    this.telegram = null;
  }

  if (this.whatsapp === "") {
    this.whatsapp = null;
  }

  if (this.phone === "") {
    this.phone = null;
  }
});

module.exports = mongoose.model(
  "Application",
  applicationSchema,
  "applications"
);