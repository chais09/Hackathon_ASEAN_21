const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const passport = require("passport");
require("../config/passport")(passport);
const CustomerModel = require("../models/userModels");
const { check, validationResult } = require('express-validator');

// the validator for checking customer password and email
// when doing customer registration 
const validation = [
    check('password')
      .exists()
      .isLength({ min: 8 })
      .withMessage('password not valid')
      .matches(/\d/)
      .withMessage('password not valid')
      .matches(/[A-Za-z]/)
      .withMessage('password not valid'),
    check('email')
        .exists()
        .withMessage('username is required')
        .isEmail()
        .withMessage('username not valid'),
];

// the errors handle for customer email and password validation
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);

  // if there are error
  if (!errors.isEmpty()) {
    return res.render("signup",{error: true})
  }
  next();
};

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
  passport.authenticate("local-customer-login", {
    failureRedirect: "/login",
    failureFlash: "Incorrect email or password",
  }),
  function (req, res, next) {
    req.flash("success", "Login Success..");
    res.redirect("/");
  }
);

router.post(
  "/signup",validation, handleValidationErrors,
  passport.authenticate("local-customer-signup", {
    failureRedirect: "/signup",
    failureFlash: "Incorrect email or password",
  }),
  function (req, res, next) {
    req.flash("success", "Login Success..");
    res.redirect("/");
  }
);

router.get("/profile", redirectToLogin, userControllers.getCustDetails);

module.exports = router;