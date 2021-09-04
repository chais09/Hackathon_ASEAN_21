// const CustomerModel = require("../models/CustomerModels");
// const Customer = CustomerModel.Customer;
const {Customer} = require('../models/CustomerModels.js')


const getCustDetails = async (req, res) => {
    let customers = await Customer.find({email: req.params.id},{name: true, email: true, password:true});
    // res.send("Here")
    // var newUser = new Customer();
    // newUser.email = "customer1@test.com"
    // // newUser.password = newUser.generateHash(req.body.password);
    // newUser.password = "123456";
    // newUser.name = "Jordan";
    // newUser.age = 17;
    // newUser.occupation = "Student";
    // // and save the user
    // await newUser.save(function (err) {
    //   if (err){
    //     console.log(err)
    //   }
    // });
    res.send(customers)
}


  module.exports = {
    getCustDetails,
  };
  