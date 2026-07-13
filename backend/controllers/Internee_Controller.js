const Internee = require("../model/Internee_Model");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// Login Validation
const loginValidation = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().min(6).required(),
});

// Profile Update Validation
const profileUpdateValidation = Joi.object({
  name: Joi.string().trim().min(3).max(30),
  email: Joi.string().trim().lowercase().email(),
  password: Joi.string().min(6),
  degreeName: Joi.string().trim().min(2).max(50),
  EducationalStatus: Joi.string().trim().min(2).max(50),
  designation: Joi.string().trim().min(2).max(100),
}).min(1); // At least one field required

// Login
const interneeLogin = async (req, res) => {
  const { error } = loginValidation.validate(req.body);

  if (error)
    return res.status(400).json({
      message: error.details[0].message,
    });

  try {
    const { email, password } = req.body;
    const internee = await Internee.findOne({ email });

    if (!internee)
      return res.status(404).json({
        message: "Email not found",
      });

    const isPasswordValid = await bcrypt.compare(password, internee.password);

    if (!isPasswordValid)
      return res.status(401).json({
        message: "Invalid password",
      });

    res.cookie("interneeId", internee._id, {
      signed: true,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
      secure: false,
    });

    const userResponse = {
      id: internee._id,
      name: internee.name,
      email: internee.email,
      degreeName: internee.degreeName,
      designation: internee.designation,
      role: internee.role,
    };

    res.status(200).json({
      message: "Login successful",
      internee: userResponse,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// Get Profile
const profile = async (req, res) => {
  const interneeId = req.interneeId;
  try {
    if (!mongoose.Types.ObjectId.isValid(interneeId))
      return res.status(400).json({
        message: "Invalid internee id",
      });

    const internee = await Internee.findById(interneeId).select("-password");

    if (!internee)
      return res.status(404).json({
        message: "Internee not found",
      });

    res.status(200).json({
      internee,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  const { error } = profileUpdateValidation.validate(req.body);

  if (error)
    return res.status(400).json({
      message: error.details[0].message,
    });

  try {
    const id = req.interneeId;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({
        message: "Invalid ID",
      });

    let updateData = { ...req.body };

    // Check duplicate email
    if (updateData.email) {
      const emailExists = await Internee.findOne({
        email: updateData.email,
        _id: { $ne: id },
      });

      if (emailExists)
        return res.status(409).json({
          message: "Email already exists",
        });
    }

    // Hash password if changed
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const internee = await Internee.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!internee)
      return res.status(404).json({
        message: "Internee not found",
      });

    res.status(200).json({
      message: "Profile updated",
      internee,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Logout
const Logout = (req, res) => {
  res.clearCookie("interneeId");

  res.status(200).json({
    message: "Logged out successfully",
  });
};

module.exports = {
  interneeLogin,
  profile,
  updateProfile,
  Logout,
};
