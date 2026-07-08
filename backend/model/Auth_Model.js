const mongoose = require("mongoose");

// Model For Supervisor
const AuthSchema = new mongoose.Schema(
  {
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
    role: {
      type: String,
      default: "supervisor",
    },
  },
  { timestamps: true },
);

const Auth = new mongoose.model("AuthModel", AuthSchema);
module.exports = Auth;
