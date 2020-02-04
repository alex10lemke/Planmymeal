const mongoose = require("mongoose");
const constants = require("./constants");

// Remove the warning with Promise
mongoose.Promise = global.Promise;

// Connect the db
try {
  mongoose.connect(constants.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
  });
} catch (err) {
  mongoose.createConnection(constants.MONGO_URL);
}
mongoose.connection
  .once("open", () => console.log("MongoDB Running"))
  .on("error", e => {
    throw e;
  });
