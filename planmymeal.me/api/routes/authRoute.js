const Router = require("express");
const passport = require("passport");

const routes = new Router();

routes.get("/facebook", passport.authenticate("facebook"));
routes.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    console.log(req.user.token);
    res.redirect(`http://localhost:3000/callback/${req.user.token}`);
  }
);

routes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);
routes.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect(`http://localhost:3000/callback/${req.user.token}`);
});

module.exports = routes;
