const HTTPStatus = require("http-status");
const Ingredient = require("../models/ingredient");

const getById = async (req, res, next) => {
  console.log(req.query.id);
  const ingredient = await Ingredient.findById(req.params.id);
  try {
    return res.status(HTTPStatus.OK).json({
      ingredient
    });
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.find();
    return res.status(HTTPStatus.OK).json({
      ingredients
    });
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

const create = async (req, res, next) => {
  try {
    return res
      .status(HTTPStatus.CREATED)
      .json(await Ingredient.create(req.body));
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

const deleteIngredient = async (req, res, next) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    await ingredient.remove();
    return res.sendStatus(HTTPStatus.OK);
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

const updateIngredient = async (req, res, next) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);

    Object.keys(req.body).forEach(key => {
      ingredient[key] = req.body[key];
    });

    return res.status(HTTPStatus.OK).json(await ingredient.save());
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

module.exports = {
  getById,
  getAll,
  create,
  updateIngredient,
  deleteIngredient
};
