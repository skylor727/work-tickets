var express = require("express");
var router = express.Router();
var passport = require("passport");

//Google OAuth login route
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/work-tickets",
    failureRedirect: "/work-tickets",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/work-tickets");
});

router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
