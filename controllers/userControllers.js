// const CustomerModel = require("../models/CustomerModels");
// const Customer = CustomerModel.Customer;
const {Customer} = require('../models/CustomerModels.js')


const getCustDetails = async (req, res) => {
    let customers = await Customer.find({email: req.params.id},{name: true, email: true, password:true});
    res.send(customers)

    // var newUser = new Customer();
    // newUser.name = "Jordan";
    // newUser.email = "cust1@test.com";
    // newUser.password = "123456";
    // newUser.age = 18;
    // newUser.level = 0;
    // newUser.energy = 6;
    // newUser.occupation = "Student";

    // newUser.save()

    // res.send(newUser)
}


  module.exports = {
    getCustDetails,
  };
  