const HTTPStatus = require("http-status");
const Recipe = require("../models/recipe");
const rp = require("request-promise");
const $ = require("cheerio");
var moment = require("moment");
const Plan = require("../models/plan");
const jwt = require("jsonwebtoken");

const waitFor = ms => new Promise(r => setTimeout(r, ms));

const getAll = async (req, res, next) => {
  try {
    const recipes = await Recipe.find().populate({
      path: "categories",
      model: "CategorySchema"
    });
    return res.status(HTTPStatus.OK).json({
      recipes
    });
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

const getRecipesWithFilters = async (req, res, next) => {
  try {
    const recipes = await Recipe.find().populate({
      path: "categories",
      model: "CategorySchema"
    }).limit(18);
    return res.status(HTTPStatus.OK).json({
      recipes
    });
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

const getById = async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id).populate({
    path: "categories",
    model: "CategorySchema"
  });
  try {
    return res.status(HTTPStatus.OK).json({
      recipe
    });
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

const create = async (req, res, next) => {
  try {
    return res.status(HTTPStatus.CREATED).json(await Recipe.create(req.body));
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

const generateTrialPlan = async (req, res, next) => {
  try {
    let categoryFilters = [];
    let recipeOptions;
    if (typeof req.body.data.category === "string") {
      categoryFilters.push({
        ingredients: new RegExp(req.body.data.category, "i")
      });
      recipeOptions = {
        $or: categoryFilters
      };
    }
    if (
      typeof req.body.data.category === "object" &&
      req.body.data.category != null
    ) {
      for (let index = 0; index < req.body.data.category.length; index++) {
        categoryFilters.push({
          ingredients: new RegExp(req.body.data.category[index], "i")
        });
        recipeOptions = {
          $or: categoryFilters
        };
      }
    }

    let kitchenTypeFilters = [];
    if (typeof req.body.data.kitchenType === "string") {
      kitchenTypeFilters.push(req.body.data.kitchenType);
      recipeOptions = {
        categories: { $in: kitchenTypeFilters },
        ...recipeOptions
      };
    }
    if (
      typeof req.body.data.kitchenType === "object" &&
      req.body.data.kitchenType != null
    ) {
      for (let index = 0; index < req.body.data.kitchenType.length; index++) {
        kitchenTypeFilters.push(req.body.data.kitchenType[index]);
        recipeOptions = {
          categories: { $in: kitchenTypeFilters },
          ...recipeOptions
        };
      }
    }
    const weekNr = moment().week();

    const planObj = {
      weekNr
    };

    const planRes = await Plan.create(planObj);
    const recipes = await Recipe.find(recipeOptions);
    const updatedPlan = [];
    const weekDaysArray = planRes.weekDays;
    await waitFor(1000);

    let shuffled = recipes.sort(() => Math.random() - 0.5);
    shuffled.forEach((recipe, i) => {
      if (i <= 6) {
        updatedPlan.push({
          weekDay: weekDaysArray[i].weekDay,
          mealId: recipe._id
        });
      }
    });

    planRes.weekDays = updatedPlan;
    await planRes.save();
    return res.send({ data: updatedPlan, id: planRes._id });
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

const generateWeekPlan = async (req, res, next) => {
  try {
    jwt.verify(
      req.header("authorization"),
      "mySecret",
      async (err, decoded) => {
        if (err) {
          console.log("Invalid Token", err);
        } else {
          let categoryFilters = [];
          let recipeOptions;
          if (typeof req.body.data.category === "string") {
            categoryFilters.push({
              ingredients: new RegExp(req.body.data.category, "i")
            });
            recipeOptions = {
              $or: categoryFilters
            };
          }
          if (
            typeof req.body.data.category === "object" &&
            req.body.data.category != null
          ) {
            for (
              let index = 0;
              index < req.body.data.category.length;
              index++
            ) {
              categoryFilters.push({
                ingredients: new RegExp(req.body.data.category[index], "i")
              });
              recipeOptions = {
                $or: categoryFilters
              };
            }
          }

          let kitchenTypeFilters = [];
          if (
            typeof req.body.data.kitchenType === "object" &&
            req.body.data.kitchenType != null
          ) {
            for (
              let index = 0;
              index < req.body.data.kitchenType.length;
              index++
            ) {
              kitchenTypeFilters.push(req.body.data.kitchenType[index]);
              recipeOptions = {
                categories: { $in: kitchenTypeFilters },
                ...recipeOptions
              };
            }
          }
          const weekNr = moment().week();

          const planObj = {
            weekNr,
            userId: decoded.id
          };

          const planRes = await Plan.create(planObj);
          const recipes = await Recipe.find(recipeOptions);
          const updatedPlan = [];
          const weekDaysArray = planRes.weekDays;
          await waitFor(1000);

          let shuffled = recipes.sort(() => Math.random() - 0.5);
          shuffled.forEach((recipe, i) => {
            if (i <= 6) {
              updatedPlan.push({
                weekDay: weekDaysArray[i].weekDay,
                mealId: recipe._id
              });
            }
          });

          planRes.weekDays = updatedPlan;
          await planRes.save();
          return res.send({ data: updatedPlan, id: planRes._id });
        }
      }
    );
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    await recipe.remove();
    return res.sendStatus(HTTPStatus.OK);
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

const insertRecipeCategory = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    recipe.categories.push(req.body.category);
    return res.status(HTTPStatus.OK).json(await recipe.save());
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

const updateRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    Object.keys(req.body).forEach(key => {
      recipe[key] = req.body[key];
    });
    return res.status(HTTPStatus.OK).json(await recipe.save());
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};

module.exports = {
  getById,
  getAll,
  create,
  updateRecipe,
  deleteRecipe,
  generateTrialPlan,
  generateWeekPlan,
  insertRecipeCategory,
  getRecipesWithFilters
};
