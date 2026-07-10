const express = require("express");
const router = express.Router();
const {
  login,
  profile,
  updateProfile,
  Logout,
  getAllinterns,
  addInternee,
  getInterneeProfileById,
  deleteInterneeProfile,
} = require("../controllers/Auth_Controller");
const { protect } = require("../middlewares/Auth_Middleware");

router.post("/login", login);
router.post("/logout", Logout);
router.post("/add", protect, addInternee);
router.get("/internee-profile/:id", protect, getInterneeProfileById);
router.delete("/delete-profile/:id", protect, deleteInterneeProfile);
router.get("/profile", protect, profile);
router.get("/interns", protect, getAllinterns);
router.put("/update-profile", protect, updateProfile);

module.exports = router;
