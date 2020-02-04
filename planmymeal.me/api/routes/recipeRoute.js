const Router = require("express");

const RecipeController = require("../controllers/recipeController");

const routes = new Router();

routes.get("/", RecipeController.getAll);
routes.get("/:id", RecipeController.getById);
routes.patch("/:id", RecipeController.updateRecipe);
routes.post("/", RecipeController.create);
routes.post("/generateTrialPlan", RecipeController.generateTrialPlan);
routes.post("/generateWeekPlan", RecipeController.generateWeekPlan);
routes.post("/insertCategory/:id", RecipeController.insertRecipeCategory);
// routes.post("/scrapeMeals", RecipeController.createMealsFromScraper);
routes.delete("/:id", RecipeController.deleteRecipe);

module.exports = routes;
