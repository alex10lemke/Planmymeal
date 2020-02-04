const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const FacebookStrategy = require("passport-facebook").Strategy;
require("dotenv").config();
const User = mongoose.model("UserSchema");
const jwt = require("jsonwebtoken");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/api/auth/facebook/callback",
      profileFields: [
        "id",
        "displayName",
        "picture.type(large)",
        "link",
        "email"
      ],
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      var token = jwt.sign({ id: profile.id }, process.env.JWT_SECRET, {
        expiresIn: 99999999
      });

      let existingUser = await User.findOne({ loginId: profile.id });
      if (existingUser) {
        existingUser.token = token;
        return done(null, existingUser);
      }

      let user = await new User({
        loginId: profile.id,
        image:
          profile.photos[0].value != undefined ? profile.photos[0].value : "",
        userName: profile.displayName,
        provider: "facebook"
      }).save();
      user.token = token;
      done(null, user);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      var token = jwt.sign({ id: profile.id }, process.env.JWT_SECRET, {
        expiresIn: 99999999
      });
      let existingUser = await User.findOne({ loginId: profile.id });

      if (existingUser) {
        existingUser.token = token;
        return done(null, existingUser);
      }

      let user = await new User({
        loginId: profile.id,
        image:
          profile.photos[0].value != undefined ? profile.photos[0].value : "",
        userName: profile.displayName,
        provider: "google"
      }).save();
      user.token = token;
      done(null, user);
    }
  )
);
