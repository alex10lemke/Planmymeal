const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const passport = require("passport");

module.exports = app => {
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use(passport.initialize());
  app.use(passport.session());
};
