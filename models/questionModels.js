const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
    {
      questionNo : {type: Number, required: true},
      questionQues: {type: String, required: true},
      answer: {type: String, required: true}
    },
    { versionKey: false }
  );

module.exports = {
  questions: mongoose.model("questions", QuestionSchema),
};