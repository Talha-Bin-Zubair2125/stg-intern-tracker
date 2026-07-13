const Report = require("../model/Report");
const fs = require("fs");
const path = require("path");

const uploadReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a file",
      });
    }
    const report = await Report.create({
      interneeId: req.interneeId,
      originalFileName: req.file.originalname,
      storedFileName: req.file.filename,
      filePath: req.file.path,
      mimeType: req.file.mimetype,
      fileSize: req.file.size,
    });
    res.status(201).json({
      success: true,
      message: "Report uploaded successfully",
      report,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate(
        "interneeId",
        "name email degreeName EducationalStatus designation",
      )
      .sort({
        createdAt: -1,
      });
    res.status(200).json({
      success: true,
      reports,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getMyReports = async (req, res) => {
  try {
    const reports = await Report.find({
      interneeId: req.interneeId,
    }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      reports,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const downloadReport = async (req, res) => {
  console.log(`Download request for report ID: ${req.params.id}`);
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }
    const filePath = path.resolve(report.filePath);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "File does not exist",
      });
    }
    res.download(filePath, report.originalFileName);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }
    // Remove file from uploads folder
    if (fs.existsSync(report.filePath)) {
      fs.unlinkSync(report.filePath);
    }
    await Report.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Report deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



module.exports = {
  uploadReport,
  getAllReports,
  getMyReports,
  downloadReport,
  deleteReport,
};
