const mongoose = require("mongoose");

const answerReportSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "polidemocracypost",
    required: true,
  },
  answerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "answers",
    required: true,
  },
  reporterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "polidemocracyusers",
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AnswerReport = mongoose.model("polidemocracyanswerreport", answerReportSchema);

module.exports = AnswerReport;
