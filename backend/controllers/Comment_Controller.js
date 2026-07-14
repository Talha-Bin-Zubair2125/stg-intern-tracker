const Comment = require("../model/Comment_Model");
const joi = require("joi");

// Validation schema for comment
const commentSchema = joi.object({
  interneeId: joi.string().trim().length(24).hex().required().messages({
    "string.base": "Internee ID must be a string",
    "string.empty": "Please select an internee",
    "string.length": "Invalid internee ID",
    "string.hex": "Invalid internee ID",
    "any.required": "Internee is required",
  }),
  comment: joi.string().trim().min(3).max(500).required().messages({
    "string.base": "Comment must be a string",
    "string.empty": "Comment cannot be empty",
    "string.min": "Comment must be at least 3 characters long",
    "string.max": "Comment cannot exceed 500 characters",
    "any.required": "Comment is required",
  }),
});

const addComment = async (req, res) => {
  try {
    // Validate the comment using Joi
    const { error } = commentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { comment, interneeId } = req.body;

    const newComment = new Comment({
      interneeId,
      comment,
    });
    // Save the comment to the database
    await newComment.save();
    res
      .status(201)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Server error while adding comment" });
  }
};

// Fetch All Comments
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("interneeId", "name email")
      .sort({ createdAt: -1 })
      .lean(); // Return plain JavaScript objects instead of full Mongoose document objects.
    if (!comments.length) {
      return res.status(200).json({
        success: true,
        message: "No comments found",
        comments: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      comments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching comments",
    });
  }
};

const getCommentsByDate = async (req, res) => {
  try {
    const { date } = req.params; // Get the date from the request parameters means from the URL path, e.g., /api/comments/by-date/:date

    if (!date) {
      return res.status(400).json({
        message: "Date parameter is required",
      });
    }

    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const comments = await Comment.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    })
      .populate("interneeId", "name email")
      .sort({ createdAt: -1 })
      .lean();

    if (!comments.length) {
      return res.status(200).json({
        success: true,
        message: "No comments found for the specified date",
        comments: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      comments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching comments",
    });
  }
};

// For Internee to fetch their own comments
const getMyComments = async (req, res) => {
  try {
    const comments = await Comment.find({ interneeId: req.interneeId })
      .sort({ createdAt: -1 })
      .lean();
    if (!comments.length) {
      return res.status(200).json({
        success: true,
        message: "No comments found for the internee",
        comments: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Comments fetched successfully for the internee",
      comments,
    });
  } catch (error) {
    console.error("Error fetching comments for internee:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching comments for internee",
    });
  }
};

module.exports = {
  addComment,
  getAllComments,
  getCommentsByDate,
  getMyComments,
};
