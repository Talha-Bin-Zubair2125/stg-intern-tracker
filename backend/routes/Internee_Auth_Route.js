const express = require("express");
const router = express.Router();
const {
  interneeLogin,
  profile,
  updateProfile,
  Logout,
} = require("../controllers/Internee_Controller");
const { interneeProtect } = require("../middlewares/Internee_Middleware");

router.post("/login", interneeLogin);
router.get("/profile", interneeProtect, profile);
router.put("/update-profile", interneeProtect, updateProfile);
router.post("/logout", interneeProtect, Logout);

module.exports = router;
