const mongoose = require("mongoose");

const doubtSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    creator_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Student",
    },
    solution_status: {
      type: String,
      required: true,
      default: "unsolved",
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

const Doubt = mongoose.model("Doubt", doubtSchema);

module.exports = Doubt;
