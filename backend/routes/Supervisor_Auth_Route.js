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
const { supervisorProtect } = require("../middlewares/Auth_Middleware");

router.post("/login", login);
router.post("/logout", Logout);
router.post("/add", supervisorProtect, addInternee);
router.get("/internee-profile/:id", supervisorProtect, getInterneeProfileById);
router.delete("/delete-profile/:id", supervisorProtect, deleteInterneeProfile);
router.get("/profile", supervisorProtect, profile);
router.get("/interns", supervisorProtect, getAllinterns);
router.put("/update-profile", supervisorProtect, updateProfile);

module.exports = router;
