const HTTPStatus = require("http-status");
const Plan = require("../models/plan");

const getAll = async (req, res, next) => {
  try {
    const plans = await Plan.find();
    return res.status(HTTPStatus.OK).json({
      plans
    });
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

const getById = async (req, res, next) => {
  const plan = await Plan.findById(req.params.id).populate({
    path: "weekDays.mealId",
    model: "RecipeSchema"
  });

  try {
    return res.status(HTTPStatus.OK).json({
      plan
    });
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

const create = async (req, res, next) => {
  try {
    return res.status(HTTPStatus.CREATED).json(await Plan.create(req.body));
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

const deletePlan = async (req, res, next) => {
  try {
    const plan = await Plan.findById(req.params.id);
    await plan.remove();
    return res.sendStatus(HTTPStatus.OK);
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

const updatePlan = async (req, res, next) => {
  try {
    const plan = await Plan.findById(req.params.id);

    Object.keys(req.body).forEach(key => {
      plan[key] = req.body[key];
    });

    return res.status(HTTPStatus.OK).json(await plan.save());
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

module.exports = {
  getById,
  getAll,
  create,
  updatePlan,
  deletePlan
};
