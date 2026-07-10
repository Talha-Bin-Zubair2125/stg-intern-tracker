const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB is already connected.");
      return;
    }
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = ConnectDB;
