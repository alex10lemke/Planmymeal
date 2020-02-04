const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  link: { type: String, default: "" },
  duration: { type: String, default: "" },
  recipeType: { type: String, default: "" },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "CategorySchema" }],
  ingredients: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("RecipeSchema", RecipeSchema);
