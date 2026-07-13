const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
  {
    interneeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InterneeModel",
      required: true,
    },

    originalFileName: {
      type: String,
      required: true,
      trim: true,
    },

    storedFileName: {
      type: String,
      required: true,
      trim: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    mimeType: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Report = mongoose.model("ReportModel", ReportSchema);

module.exports = Report;
