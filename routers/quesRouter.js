const express = require("express");

const router = express.Router();
const questionController = require("../controllers/questionControllers")



const redirectToLogin = (req, res, next) => {
    console.log(req.session);
    if (req.session.passport) {
      next();
    } else {
      res.redirect("/login");
    }
  };
  

router.get("/:id", questionController.getQuesNum);
router.post("/ans/:id", questionController.markAnswer)
//6132f83b257b92748cb71954
module.exports = router;