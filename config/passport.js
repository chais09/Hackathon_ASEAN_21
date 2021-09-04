const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt-nodejs");
let ObjectId = require("mongoose").Types.ObjectId;

// our  model
const { Customer } = require("../models/CustomerModels");


module.exports = function (passport) {
  passport.serializeUser(function(user, done) {
    done(null, user);
    });

passport.deserializeUser(function(_id, done) {
    Customer.findById(_id, function(err, user) {
        done(err, user);
      });
    });
  
    // // ths passport strategy for customer login
    passport.use('local-login', new LocalStrategy({
      usernameField : 'email', 
      passwordField : 'password',
      passReqToCallback : true}, // pass the req as the first arg to the callback for verification 
  function(req, email, password, done) {
      // you can read more about the nextTick() function here: 
      // https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
      // we are using it because without it the User.findOne does not work,
      // so it's part of the 'syntax'
      process.nextTick(function() {
          // see if the user with the email exists
          Customer.findOne({ 'email' :  email }, function(err, user) {
              // if there are errors, user is not found or password
              // does match, send back errors
              if (err){
                console.log("err1");
                return done(err);
              }
              if (!user){
                console.log("err2");
                return done(null, false, req.flash('loginMessage', 'No user found.'));
              }
              if (user.password!=password){
                  // false in done() indicates to the strategy that authentication has
                  // failed
                  console.log("err3")
                  return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
              }
              // otherwise, we put the user's email in the session
              else {
                  // in app.js, we have indicated that we will be using sessions
                  // the server uses the included modules to create and manage
                  // sessions. each client gets assigned a unique identifier and the
                  // server uses that identifier to identify different clients
                  // all this is handled by the session middleware that we are using 
                  req.session.email = email; // for demonstration of using express-session
                  console.log("passport success")
                  // done() is used by the strategy to set the authentication status with
                  // details of the user who was authenticated
                  return done(null, user, req.flash('loginMessage', 'Login successful'));
              }
          });
      });

  }));

  
    // for signup
    passport.use('local-customer-signup', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true }, // pass the req as the first arg to the callback for verification 
      
   function(req, email, password, done) {             
      process.nextTick( function() {
          Customer.findOne({'email': email}, function(err, existingUser) {
              // search a user by the username (email in our case)
              // if user is not found or exists, exit with false indicating
              // authentication failure
              if (err) {
                  console.log(err);
                  return done(err);
              }
              if (existingUser) {
                  console.log("existing");
                  return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
              }
              else {
                  // otherwise
                  // create a new user
                  var newUser = new Customer();
                  newUser.email = email;
                  newUser.password = password;
                  newUser.name = req.body.name;
                  newUser.age = req.body.age;
                  newUser.occupation = req.body.occupation;
                  
                  // and save the user
                  newUser.save(function(err) {
                      if (err)
                          throw err;

                      return done(null, newUser);
                  });

                  // put the user's email in the session so that it can now be used for all
                  // communications between the client (browser) and the FoodBuddy app
                  req.session.email=email;
              }
          });
      });
  }));
};