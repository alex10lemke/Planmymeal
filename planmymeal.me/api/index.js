const express = require("express");
const chalk = require("chalk");
const jwt = require("jsonwebtoken");

require("./models/user");
require("./config/database");
require("./services/passport");
const middlewaresConfig = require("./config/middlewares");
const constants = require("./config/constants");
const ApiRoutes = require("./routes");

const app = express();
const ProtectedRoutes = express.Router();

// Wrap all the middlewares with the server
middlewaresConfig(app);

// Add the apiRoutes stack to the server with protected routes
app.use("/api", ApiRoutes);
app.get("/", (req, res) => {
  res.send(`
    <div style="position: absolute; top:0; bottom: 0; left: 0; right: 0; margin: auto; width: 350px;height: 350px;">
      <h4>Welcome to the Planmymeal.me REST API</h4>
    </div>
  `);
});

app.get("/generateToken", (req, res) => {
  const payload = {
    Centrisoft: true
  };
  var token = jwt.sign(payload, "mySecret", {
    expiresIn: 99999999
  });
  res.send({ token });
});

ProtectedRoutes.use((req, res, next) => {
  var token = req.headers["access-token"];
  if (token) {
    jwt.verify(token, "mySecret", (err, decoded) => {
      if (err) {
        return res.json({ message: "Invalid token" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.send({
      message: "No token provided."
    });
  }
});

// We need this to make sure we don't run a second instance
app.listen(constants.PORT, err => {
  if (err) {
    console.log(chalk.red("Cannot run!"));
  } else {
    console.log(
      chalk.green.bold(
        `
        Server running... Cheers! 🍺
        REST API on port: ${constants.PORT} 🍕
        Environment: ${process.env.NODE_ENV} 🦄
      `
      )
    );
  }
});

module.exports = app;
