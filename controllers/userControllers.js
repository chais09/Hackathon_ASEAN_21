const CustomerModel = require("../models/userModels");
const customer = CustomerModel.customer;

const getCustDetails = async (req, res) => {
    let customers = await customer.findById({ _id: req.session.passport.user });
    res.render("profile", {
      custFamName: customers.familyName,
      custGivenName: customers.givenName,
      custEmail: customers.email,
      custPassword: customers.password,
    });
  };


  module.exports = {
    getCustDetails,
  };
  