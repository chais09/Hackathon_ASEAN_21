const {questions} = require('../models/questionModels.js')

const getQuesNum = async (req, res) => {
    let question = await questions.findOne({questionNo: req.params.id},{questionNo:true, questionQues: true, answer: true});
    res.send(question)

    // var newUser = new questions();
    // newUser.questionNo = 1;
    // newUser.questionQues = "1. What is financial literacy?"
    // newUser.questionOption = new Array ("a. Knowing and understanding how finances work",
    //   "b. Being able to read numbers",
    //   "c. Getting good grades in algebra",
    //   "d. Getting good grades in math");
    // newUser.answer = "a. Knowing and understanding how finances work";
    // // and save the user
    // newUser.save()
      
}


  module.exports = {
    getQuesNum,
  };