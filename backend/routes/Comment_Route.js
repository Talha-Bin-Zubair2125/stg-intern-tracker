const express = require("express");
const router = express.Router();
const {
  addComment,
  getAllComments,
  getCommentsByDate,
  getMyComments,
  deleteComment,
  editComment,
  getCommentAnalytics
} = require("../controllers/Comment_Controller");

const { interneeProtect } = require("../middlewares/Internee_Middleware");
const { supervisorProtect } = require("../middlewares/Auth_Middleware");

router.post("/add", supervisorProtect, addComment);
router.get("/all", supervisorProtect, getAllComments);
router.get("/by-date/:date", supervisorProtect, getCommentsByDate);
router.get("/my-comments", interneeProtect, getMyComments);
router.get("/analytics", interneeProtect , getCommentAnalytics);
router.delete("/delete/:id", supervisorProtect, deleteComment);
router.put("/edit/:id", supervisorProtect, editComment);

module.exports = router;
