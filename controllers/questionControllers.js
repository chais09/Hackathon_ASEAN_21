const {questions} = require('../models/questionModels.js')

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


  module.exports = {
    getQuesNum,
  };