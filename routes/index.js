var express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/createuser", async (req, res, next) => {
  try {
    let createdUser = await userModel.create({
      username: "Sonu",
      password: "sonu",
      posts: [],
      dp:"default.jpg",
      email: "yadavsonukumar036@gmail.com",
      fullname: "Sonu Kumar Yadav"
    });
    res.send(createdUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user");
  }
});


module.exports = router;
