const mongoose = require("mongoose");

const salesPersonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    tgUsername: {
      type: String,
      required: true,
      trim: true,
    },
    workCode: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SalesPerson", salesPersonSchema);