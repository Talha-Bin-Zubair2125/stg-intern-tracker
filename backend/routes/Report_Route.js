const express = require("express");
const router = express.Router();
const {
  uploadReport,
  getAllReports,
  getMyReports,
  downloadReport,
  deleteReport,
} = require("../controllers/reportController");
const upload = require("../middlewares/Upload_Middleware");
const { interneeProtect } = require("../middlewares/Internee_Middleware");
const { supervisorProtect } = require("../middlewares/Auth_Middleware");

router.post("/upload", interneeProtect, upload.single("report"), uploadReport);
router.get("/my-reports", interneeProtect, getMyReports);
router.get("/all", supervisorProtect, getAllReports);
router.get("/download/:id", supervisorProtect, downloadReport);
router.get("/interndownload/:id", interneeProtect, downloadReport);
router.delete("/:id", supervisorProtect, deleteReport);
router.delete("/delete/:id", interneeProtect, deleteReport);

module.exports = router;
