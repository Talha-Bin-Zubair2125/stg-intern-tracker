const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    interneeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InterneeModel",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
