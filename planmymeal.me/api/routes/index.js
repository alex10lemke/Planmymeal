const Router = require("express");

const PlanRoutes = require("./planRoute");
const IngredientRoutes = require("./ingredientRoute");
const RecipeRoutes = require("./recipeRoute");
const CategoryRoutes = require("./categoryRoute");
const UserRoutes = require("./userRoute");
const authRoutes = require("./authRoute");

const routes = new Router();

routes.use("/category", CategoryRoutes);
routes.use("/ingredient", IngredientRoutes);
routes.use("/plan", PlanRoutes);
routes.use("/recipe", RecipeRoutes);
routes.use("/user", UserRoutes);
routes.use("/auth", authRoutes);

module.exports = routes;
