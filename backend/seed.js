const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const Auth = require("./model/Auth_Model");
const ConnectDB = require("./db");

const seedSupervisor = async () => {
  await ConnectDB();
  const supervisor_HashedPassword = await bcrypt.hash("supervisor@123", 10);
  await Auth.deleteMany({});
  await Auth.create({
    name: "WC Abdullah",
    email: "supervisor@gmail.com",
    password: supervisor_HashedPassword,
    role: "supervisor",
  });
  process.exit();
};

seedSupervisor();
