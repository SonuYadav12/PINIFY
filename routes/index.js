var express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/alluserpost",async (req,res,next)=>{
let user=await userModel.findOne({_id:"65de1a8ffd3584f314c5365f"})
.populate("posts")
res.send(user);
}
)

router.get("/createuser", async (req, res, next) => {
  try {
    let createdUser = await userModel.create({
      username: "Sonu",
      password: "sonu",
      posts: [],
      dp: "default.jpg",
      email: "yadavsonukumar036@gmail.com",
      fullname: "Sonu Kumar Yadav",
    });
    res.send(createdUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user");
  }
});

router.get("/createpost", async (req, res, next) => {
  try {
    let createdpost = await postModel.create({
      postText: "Hero i am Here",
      user:"65de1a8ffd3584f314c5365f",
    });
    let user = await userModel.findById("65de1a8ffd3584f314c5365f",);
    user.posts.push(createdpost._id);
    await user.save();
    res.send("Post created and linked to user successfully.");
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).send("Error creating post");
  }
});


module.exports = router;
