const express = require("express");
const router = express.Router();
const {
  addComment,
  getAllComments,
  getCommentsByDate,
  getMyComments,
} = require("../controllers/Comment_Controller");

const { interneeProtect } = require("../middlewares/Internee_Middleware");
const { supervisorProtect } = require("../middlewares/Auth_Middleware");

router.post("/add", supervisorProtect, addComment);
router.get("/all", supervisorProtect, getAllComments);
router.get("/by-date/:date", supervisorProtect, getCommentsByDate);
router.get("/my-comments", interneeProtect, getMyComments);

module.exports = router;
