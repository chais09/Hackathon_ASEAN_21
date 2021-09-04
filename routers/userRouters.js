const express = require("express");

const router = express.Router();
const userControllers = require("../controllers/userControllers");
const passport = require("passport");
require("../config/passport")(passport);
const CustomerModel = require("../models/CustomerModels");
const { check, validationResult } = require('express-validator');
const bodyParser = require('body-parser')
// create application/json parser
// var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })


// the validator for checking customer password and email
// when doing customer registration 
// const validation = [
//     check('password')
//       .exists()
//       .isLength({ min: 8 })
//       .withMessage('password not valid')
//       .matches(/\d/)
//       .withMessage('password not valid')
//       .matches(/[A-Za-z]/)
//       .withMessage('password not valid'),
//     check('email')
//         .exists()
//         .withMessage('username is required')
//         .isEmail()
//         .withMessage('username not valid'),
// ];

// // the errors handle for customer email and password validation
// function handleValidationErrors(req, res, next) {
//   const errors = validationResult(req);

//   // if there are error
//   if (!errors.isEmpty()) {
//     return res.render("signup",{error: true})
//   }
//   next();
// };

const redirectToLogin = (req, res, next) => {
  console.log(req.session);
  if (req.session.passport) {
    next();
  } else {
    res.redirect("/login");
  }
};



router.get("/login", (req, res, next) => {
  res.render("login");
});

router.get("/signup", (req, res, next) => {
  res.render("signup", {
  });
});

router.get("/logout", (req, res, next) => {
  res.locals.customer_name = null;
  res.locals.vendor_id = null;
  res.locals.type_of_user = null;
  res.locals.customer_id = null;
  req.session.destroy(function (err) {
    res.redirect("/");
  });
});

router.post(
  "/login",
  passport.authenticate("local-login", {
    failureRedirect: "/login",
    failureFlash: "Incorrect email or password",
  }),
  function (req, res, next) {
    req.flash("success", "Login Success..");
    res.redirect("/");
  }
);

// router.post("/login", (req,res, next) => {
//   console.log(req.body.email);
// })

router.post(
  "/signup", 
  passport.authenticate("local-customer-signup", {
    failureRedirect: "/signup",
    failureFlash: "Incorrect email or password",
  }),
  function (req, res, next) {
    req.flash("success", "Login Success..");
    res.redirect("/");
  }
);

router.get("/read/read1", (req,res) => {
  res.render("video1")
})
router.get("/profile/:id", userControllers.getCustDetails);
//6132f83b257b92748cb71954
module.exports = router;