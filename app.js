require("dotenv").config();
// MongoDB connection
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const app = express();
const exphbs = require("express-handlebars");
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
// app.use(morgan('common'))
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res, next) => {
    res.render("home");
  });

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