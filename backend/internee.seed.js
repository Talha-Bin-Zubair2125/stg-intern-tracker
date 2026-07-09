const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const ConnectDB = require("./db");
const Internee = require("./model/Internee_Model");

const internees = [
  {
    name: "Shehryar Ahmed",
    email: "shehryarahmed@gmail.com",
    degreeName: "BS Computer Science",
    EducationalStatus: "Gradated",
    designation: "GPS Signal Generator, RF Simulator for GPS testing of drones",
  },
  {
    name: "Syed Muhammad Haroon Ali",
    email: "haroonali@gmail.com",
    degreeName: "BS Computer Engineering",
    EducationalStatus: "5th Semester",
    designation:
      "Vision Scanning System, AI-based Hot Object Detection & Tracking",
  },
  {
    name: "Shehk Ali",
    email: "shehkali@gmail.com",
    degreeName: "BE Mechatronics",
    EducationalStatus: "5th Semester",
    designation: "Vision Feedback System (Guidance)",
  },
  {
    name: "Neshmiya Farooq",
    email: "neshmiya@gmail.com",
    degreeName: "BS Engineering Science",
    EducationalStatus: "6th Semester",
    designation: "Visual Navigation, LIDAR & Vision Fusion",
  },
  {
    name: "Muneeb Maqbool",
    email: "muneebmaqbool@gmail.com",
    degreeName: "BS Cyber Security",
    EducationalStatus: "3rd Semester",
    designation: "Communication Security, Secure Data Link",
  },
  {
    name: "Laiba Rehman",
    email: "laibarehman@gmail.com",
    degreeName: "BS Computer Engineering",
    EducationalStatus: "5th Semester",
    designation: "Drone Control",
  },
  {
    name: "Syeda Rabia Naqvi",
    email: "syedarabia@gmail.com",
    degreeName: "BS Computer Engineering",
    EducationalStatus: "5th Semester",
    designation: "Drone Control",
  },
];

const seedInternees = async () => {
  await ConnectDB();

  try {
    const hashedPassword = await bcrypt.hash("internee@123", 10);

    for (const internee of internees) {
      const exists = await Internee.findOne({
        email: internee.email,
      });

      if (!exists) {
        await Internee.create({
          ...internee,
          password: hashedPassword,
        });

        console.log(`${internee.name} created`);
      } else {
        console.log(`${internee.name} already exists`);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};

seedInternees();
