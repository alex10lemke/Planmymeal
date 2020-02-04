const Router = require("express");

const PlanController = require("../controllers/planController");

const routes = new Router();

routes.get("/", PlanController.getAll);
routes.get("/:id", PlanController.getById);
routes.patch("/:id", PlanController.updatePlan);
routes.post("/", PlanController.create);
routes.delete("/:id", PlanController.deletePlan);

module.exports = routes;
