const { questions } = require('../models/questionModels.js')
const { cusAnswers } = require('../models/questionModels.js')
let ObjectId = require("mongoose").Types.ObjectId;

const getQuesNum = async (req, res) => {
  let question = await questions.findOne({ questionNo: req.params.id }, { questionNo: true, questionQues: true, answer: true, questionOption: true });
  res.render("ques", { "quesno": question.questionNo, "question": question.questionQues, "questionoption": question.questionOption })

  // var newUser = new questions();
  // newUser.questionNo = 10;
  // newUser.questionQues = "Suppose your net income is $30,000. Considering the rule of 20/10, how much debt you can have at most?"
  // newUser.questionOption = new Array ("a. $1,000",
  // "b. $3,000",
  // "c. $6,000",
  // "d. $9,000");
  // newUser.answer = " ";
  // // and save the user
  // newUser.save()     
}

const markAnswer = async (req, res) => {

  // console.log(req.params.id)
  // console.log(req.body)
  cus_ans = req.body.answer;
  cus_id = req.session.passport.user._id
  ques_no = req.params.id;
  ques = await questions.findOne({ questionNo: ques_no }, { _id: true, questionNo: true, questionQues: true, answer: true })
  ques_ques = ques.questionQues
  ques_ans = ques.answer
  ques_id = ques._id

  let tf;
  if ((ques_ans).localeCompare(cus_ans) == 0) {
    tf = true
  }
  else {
    tf = false
  }

  newCusAnswer = new cusAnswers();
  newCusAnswer.quesId = new ObjectId(`${String(ques_id)}`);
  newCusAnswer.cusId = new ObjectId(`${String(cus_id)}`);
  newCusAnswer.cus_ans = cus_ans;
  newCusAnswer.ques_no = ques_no
  newCusAnswer.ques_ques = ques_ques
  newCusAnswer.ques_ans = ques_ans;

  newCusAnswer.save();


  // console.log(newCusAnswer.quesId)
  // console.log(newCusAnswer.cusId)
  // console.log(newCusAnswer.cus_ans)
  // console.log(newCusAnswer.ques_no)
  // console.log(newCusAnswer.ques_ques)
  // console.log(newCusAnswer.ques_ans)

  
  res.render("result", {
    trueFalse: tf, ques_ques: ques_ques, ques_no: ques_no,
    ques_ans: ques_ans, cus_ans: cus_ans
  })
}



module.exports = {
  getQuesNum,
  markAnswer,
};