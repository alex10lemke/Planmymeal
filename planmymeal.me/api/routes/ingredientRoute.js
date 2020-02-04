const Router = require("express");

const IngredientController = require("../controllers/ingredientController");

const routes = new Router();

routes.get("/", IngredientController.getAll);
routes.get("/:id", IngredientController.getById);
routes.patch("/:id", IngredientController.updateIngredient);
routes.post("/", IngredientController.create);
routes.delete("/:id", IngredientController.deleteIngredient);

module.exports = routes;
