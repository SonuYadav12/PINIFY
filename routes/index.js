var express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");
const passport = require("passport");

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("login");
});

router.get("/feed", function (req, res, next) {
  res.render("feed");
});

//This comment code was just to learn data association

// router.get("/alluserpost",async (req,res,next)=>{
// let user=await userModel.findOne({_id:"65de1a8ffd3584f314c5365f"})
// .populate("posts")
// res.send(user);
// }
// )

// router.get("/createuser", async (req, res, next) => {
//   try {
//     let createdUser = await userModel.create({
//       username: "Sonu",
//       password: "sonu",
//       posts: [],
//       dp: "default.jpg",
//       email: "yadavsonukumar036@gmail.com",
//       fullname: "Sonu Kumar Yadav",
//     });
//     res.send(createdUser);
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).send("Error creating user");
//   }
// });

// router.get("/createpost", async (req, res, next) => {
//   try {
//     let createdpost = await postModel.create({
//       postText: "Hero i am Here",
//       user:"65de1a8ffd3584f314c5365f",
//     });
//     let user = await userModel.findById("65de1a8ffd3584f314c5365f",);
//     user.posts.push(createdpost._id);
//     await user.save();
//     res.send("Post created and linked to user successfully.");
//   } catch (error) {
//     console.error("Error creating post:", error);
//     res.status(500).send("Error creating post");
//   }
// });

router.get("/profile",isLoggedIN,(req,res)=>{
  res.render("profile");
})



router.post("/register", (req, res) => {
  const { username, email, fullname } = req.body;
  const userData = new userModel({ username, email, fullname });

  userModel.register(userData, req.body.password).then(() => {
    // Authenticate user after registration
    passport.authenticate("local")(req, res, () => {
      res.redirect("/profile");
    });
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/",
  }),
  (req, res) => {}
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

function isLoggedIN(req, res, next) {
  console.log("log in")
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/profile");
}

module.exports = router;
