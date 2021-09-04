// const CustomerModel = require("../models/CustomerModels");
// const Customer = CustomerModel.Customer;
const {Customer} = require('../models/CustomerModels.js')


const getCustDetails = async (req, res) => {
    let customers = await Customer.find({email: req.params.id},{name: true, email: true, password:true});
    res.send(customers)
}


  module.exports = {
    getCustDetails,
  };
  