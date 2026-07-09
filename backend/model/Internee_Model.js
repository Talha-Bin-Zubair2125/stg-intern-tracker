const mongoose = require("mongoose");

const InterneeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  degreeName: {
    type: String,
    required: true,
  },
  EducationalStatus: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "internee",
  },
});

const Internee = new mongoose.model("InterneeModel", InterneeSchema);
module.exports = Internee;
