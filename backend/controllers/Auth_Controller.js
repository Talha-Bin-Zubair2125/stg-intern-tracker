const Auth = require("../model/Auth_Model");
const Internee = require("../model/Internee_Model");
const bcrypt = require("bcryptjs");
const joi = require("joi");

// Validation schema for login
const loginSchema = joi.object({
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .lowercase()
    .max(100)
    .required()
    .messages({
      "string.email": "Please provide a valid email address",
      "string.max": "Email must not exceed 100 characters",
      "any.required": "Email is required",
    }),
  password: joi.string().min(8).max(32).required().messages({
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password must not exceed 32 characters",
    "any.required": "Password is required",
  }),
});

// Validation schema for update
const updateProfileSchema = joi.object({
  updatedName: joi.string().min(3).max(30),
  updatedEmail: joi
    .string()
    .email({ tlds: { allow: false } })
    .lowercase()
    .max(100)
    .required()
    .messages({
      "string.email": "Please provide a valid email address",
      "string.max": "Email must not exceed 100 characters",
      "any.required": "Email is required",
    }),
  updatedPassword: joi.string().min(8).max(32).required().messages({
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password must not exceed 32 characters",
    "any.required": "Password is required",
  }),
});

const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // Signing Cookie
    res.cookie("user_Id", user._id, {
      signed: true,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
      secure: false,
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const profile = async (req, res) => {
  const id = req.user_Id;
  console.log("ID:", id);
  try {
    const user = await Auth.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

const updateProfile = async (req, res) => {
  const { error } = updateProfileSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { updatedName, updatedEmail, updatedPassword } = req.body;
  try {
    const user = await Auth.findById(req.user_Id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields if provided
    if (updatedName) {
      user.username = updatedName;
    }
    if (updatedEmail) {
      user.email = updatedEmail;
    }
    if (updatedPassword) {
      user.password = await bcrypt.hash(updatedPassword, 10);
    }
    await user.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};

const Logout = async (req, res) => {
  try {
    res.clearCookie("user_Id", {
      httpOnly: true,
      signed: true,
      sameSite: "lax",
      secure: false,
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out", error });
  }
};

const getAllinterns = async (req, res) => {
  try {
    const interns = await Internee.find().select("-password");
    res.status(200).json({ interns });
  } catch (error) {
    res.status(500).json({ message: "Error fetching interns", error });
  }
};

module.exports = { login, profile, updateProfile, Logout, getAllinterns };
