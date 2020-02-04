const Router = require("express");

const CategoryController = require("../controllers/categoryController");

const routes = new Router();

routes.get("/", CategoryController.getAll);
routes.get("/:id", CategoryController.getById);
routes.patch("/:id", CategoryController.updateCategory);
routes.post("/", CategoryController.create);
routes.delete("/:id", CategoryController.deleteCategory);

module.exports = routes;
