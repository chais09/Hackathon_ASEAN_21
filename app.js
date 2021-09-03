require("dotenv").config();
// MongoDB connection
const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://chais:pQJu06WJpu4N0zdE@cluster0.mrhom.mongodb.net/test?authSource=admin&replicaSet=atlas-mreudv-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, // for uniqueness constraints on fields
    useFindAndModify: false,
    dbName: "Hackathon",
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));



const express = require("express");
const path = require("path");
const app = express();
const exphbs = require("express-handlebars");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
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
app.use(express.json());
app.use(flash());
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
  if (req.session.passport) {
    // req.session.type_of_user can be in three states, which is{ undefined , "customer", "vendor"}
    if (req.session.type_of_user) {
      res.locals.type_of_user = req.session.type_of_user;
      // we make the res.locals.customer_id to be the customer_id(passport.user)
      if (req.session.type_of_user == "customer") {
        res.locals.customer_id = req.session.passport.user;
      } else {
        // we make the res.locals.vendor_id to be the vendor_id(passport.user)
        res.locals.vendor_id = req.session.passport.user;
      }
    }
  }
  res.locals.error = req.flash("error");
  next();
});


app.get("/", (req, res, next) => {
    res.render("home");
  });

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