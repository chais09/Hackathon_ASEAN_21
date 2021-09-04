require("dotenv").config();
// MongoDB connection
const mongoose = require("mongoose");

let connectionURL = 'mongodb://localhost:27017/Hackathon'
mongoose.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true, useFindAndModify: false, dbName: 'Hackathon'})
const db = mongoose.connection;

// event handlers
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('connected to Mongo')
})



const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const exphbs = require("express-handlebars");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const flash = require("connect-flash");


var methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "./views"));
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "main",
    // helpers: require(__dirname + "/public/js/helpers.js").helpers,
  })
);
app.set("view engine", "hbs");
// app.use(bodyParser.urlencoded({ extended: false}))

// parse application/json
app.use(bodyParser.json())
 
app.use(express.json());
app.use(flash());
app.use(cors());
// app.use(morgan('common'))
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(
  session({
    secret: "passport",
    saveUninitialized: false,
    resave: false,
  })
);

// initialize the passport and session
app.use(passport.initialize());
app.use(passport.session());

// this middleware is used for the locals variable
// for render in the page
app.use(function (req, res, next) {
  // if someone is authenticated
  console.log("app.use")
  if (req.session.passport) {
    // req.session.type_of_user can be in three states, which is{ undefined , "customer", "vendor"}
    console.log("session");
    console.log(req.session.passport);
    res.locals.customer_name = req.session.passport.user.name
    if (req.session.type_of_user) {
      console.log(req.session.type_of_user);
      res.locals.type_of_user = req.session.type_of_user;
      // we make the res.locals.customer_id to be the customer_id(passport.user)
      // if (req.session.type_of_user == "customer") {
      //   res.locals.customer_id = req.session.passport.user;
      // } else {
      //   // we make the res.locals.vendor_id to be the vendor_id(passport.user)
      //   res.locals.vendor_id = req.session.passport.user;
      // }
    }
  }
  res.locals.error = req.flash("error");
  next();
});


app.get("/", (req, res, next) => {
    res.render("home");
  });
// app.post("/login", (req, res, next) => {
//   console.log(req.body)
// });

const userRouters = require("./routers/userRouters");
app.use("/", userRouters);

app.get("*", function (req, res, next) {
    res.locals.user = req.user || null;
    next();
  });
  
  // port
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`The App is listening on port ${port}!`);
  });
  






  module.exports = app;