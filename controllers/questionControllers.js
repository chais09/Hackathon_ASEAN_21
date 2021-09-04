const {questions} = require('../models/questionModels.js')
const {cusAnswers} = require('../models/questionModels.js')

const getQuesNum = async (req, res) => {
    let question = await questions.findOne({questionNo: req.params.id},{questionNo:true, questionQues: true, answer: true});
    res.send(question)

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

  cus_ans = req.body.cus_ans;
  cus_id = req.session.passport.user._id
  ques_id = req.params.id;
  ques = questions.findOne({_id: ques_id},{questionNo: true, questionQues: true, answer: true})
  ques_ques = ques.questionQues
  ques_ans = ques.answer
  ques_no = ques.questionNo

  newCusAnswer = new cusAnswers();
  newCusAnswer.quesID = ques_id;
  newCusAnswer.cusID = cus_id;
  newCusAnswer.cusAns = cus_ans;
  newCusAnswer.ques_no = ques_no
  newCusAnswer.ques_ques = ques_ques
  newCusAnswer.ques_ans = ques_ans;

  newCusAnswer.save();

  let tf;
  if (ques.ans!=cus_ans){
    tf = "false"
  }
  else{
    tf = "true"
  }

  res.render("asdd", {trueFalse: tf, ques_ques : ques_ques, ques_no : ques_no,
                       ques_ans: ques_ans, cus_ans: cus_ans})
}



  module.exports = {
    getQuesNum,
    markAnswer,
  };