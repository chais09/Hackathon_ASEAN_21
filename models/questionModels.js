const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
    {
      questionNo : {type: Number, required: true, unique : true},
      questionQues: {type: String, required: true},
      questionOption: {type: [String], required: true},
      answer: {type: String, required: true}
    },
    { versionKey: false }
  );


const CusAnswerSchema = new mongoose.Schema(
  {
    quesId: { type: mongoose.Schema.Types.ObjectId, required: true },
    cusId: { type: mongoose.Schema.Types.ObjectId, required: true },
    cus_ans: {type: String, required: true},
    ques_no : {type: Number, required: true},
    ques_ques : {type: String, required: true},
    ques_ans: {type: String, required: true}
  }
)  


module.exports = {
  cusAnswers: mongoose.model("cusAnswer", CusAnswerSchema),
  questions: mongoose.model("questions", QuestionSchema),
};