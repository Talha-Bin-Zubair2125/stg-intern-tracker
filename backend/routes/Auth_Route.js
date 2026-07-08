const express = require("express");
const router = express.Router();
const {
  login,
  profile,
  updateProfile,
  Logout
} = require("../controllers/Auth_Controller");
const { protect } = require("../middlewares/Auth_Middleware");

router.post("/login", login);
router.post("/logout",Logout);
router.get("/profile", protect, profile);
router.put("/update-profile", protect, updateProfile);

module.exports = router;