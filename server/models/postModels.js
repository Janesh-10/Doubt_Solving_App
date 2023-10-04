const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    solution: {
      type: String,
      required: true,
    },
    doubt_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Doubt",
    },
    creator_email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
