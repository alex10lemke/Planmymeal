const Router = require("express");

const UserController = require("../controllers/userController");

const routes = new Router();

routes.get("/", UserController.getAll);
routes.get("/:id", UserController.getById);
routes.get("/userWithPlan/:id", UserController.getUserWithPlans);
routes.patch("/:id", UserController.updateUser);
routes.post("/", UserController.create);
routes.delete("/:id", UserController.deleteUser);

module.exports = routes;
