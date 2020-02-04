const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  image: { type: String },
  loginId: { type: String, unique: true },
  email: { type: String },
  provider: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("UserSchema", UserSchema);
