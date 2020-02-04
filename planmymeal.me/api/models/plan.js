const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  weekNr: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.String,
    ref: "UserSchema"
  },
  weekDays: {
    type: Array,
    default: [
      {
        weekDay: "monday",
        mealId: { type: mongoose.Schema.Types.ObjectId, ref: "RecipeSchema" }
      },
      {
        weekDay: "tuesday",
        mealId: { type: mongoose.Schema.Types.ObjectId, ref: "RecipeSchema" }
      },
      {
        weekDay: "wednesday",
        mealId: { type: mongoose.Schema.Types.ObjectId, ref: "RecipeSchema" }
      },
      {
        weekDay: "thursday",
        mealId: { type: mongoose.Schema.Types.ObjectId, ref: "RecipeSchema" }
      },
      {
        weekDay: "friday",
        mealId: { type: mongoose.Schema.Types.ObjectId, ref: "RecipeSchema" }
      },
      {
        weekDay: "saturday",
        mealId: { type: mongoose.Schema.Types.ObjectId, ref: "RecipeSchema" }
      },
      {
        weekDay: "sunday",
        mealId: { type: mongoose.Schema.Types.ObjectId, ref: "RecipeSchema" }
      }
    ]
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("PlanSchema", PlanSchema);
