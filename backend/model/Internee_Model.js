const mongoose = require("mongoose");

const InterneeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  educationStatus: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "internee",
  },
});

const Internee = new mongoose.Model("InterneeModel", InterneeSchema);
module.exports = Internee;
