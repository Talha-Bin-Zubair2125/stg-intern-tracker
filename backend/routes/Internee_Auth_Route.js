const express = require("express");
const router = express.Router();
const {
  interneeLogin,
  profile,
  updateProfile,
  Logout,
} = require("../controllers/Internee_Controller");
const { protect } = require("../middlewares/Internee_Middleware");

router.post("/login", interneeLogin);
router.get("/profile", protect, profile);
router.put("/update-profile", protect, updateProfile);
router.post("/logout", protect, Logout);

module.exports = router;
