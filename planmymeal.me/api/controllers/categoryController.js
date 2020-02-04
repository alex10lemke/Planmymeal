const HTTPStatus = require("http-status");
const Category = require("../models/category");

const getById = async (req, res, next) => {
  console.log(req.query.id);
  const category = await Category.findById(req.params.id);
  try {
    return res.status(HTTPStatus.OK).json({
      category
    });
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const categories = await Category.find();
    return res.status(HTTPStatus.OK).json({
      categories
    });
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

const create = async (req, res, next) => {
  try {
    return res.status(HTTPStatus.CREATED).json(await Category.create(req.body));
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    await category.remove();
    return res.sendStatus(HTTPStatus.OK);
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    Object.keys(req.body).forEach(key => {
      category[key] = req.body[key];
    });

    return res.status(HTTPStatus.OK).json(await category.save());
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

module.exports = {
  getById,
  getAll,
  create,
  updateCategory,
  deleteCategory
};
