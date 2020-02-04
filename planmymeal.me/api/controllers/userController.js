const HTTPStatus = require("http-status");
const User = require("../models/user");
const Plan = require("../models/plan");

const getAll = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(HTTPStatus.OK).json({
      users
    });
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const user = await User.findOne({ loginId: req.params.id });
    return res.status(HTTPStatus.OK).json({
      user
    });
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

const getUserWithPlans = async (req, res, next) => {
  try {
    const user = await User.findOne({ loginId: req.params.id });
    const userPlans = await Plan.find({ userId: user.loginId }).populate({
      path: "weekDays.mealId",
      model: "RecipeSchema"
    });
    return res.status(HTTPStatus.OK).json({
      userPlans
    });
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

const create = async (req, res, next) => {
  try {
    return res.status(HTTPStatus.CREATED).json(await User.create(req.body));
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    await user.remove();
    return res.sendStatus(HTTPStatus.OK);
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    Object.keys(req.body).forEach(key => {
      user[key] = req.body[key];
    });
    return res.status(HTTPStatus.OK).json(await user.save());
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

module.exports = {
  getById,
  getAll,
  create,
  updateUser,
  deleteUser,
  getUserWithPlans
};
