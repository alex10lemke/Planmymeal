const createMealsFromScraper = async (req, res, next) => {
  try {
    const singleLink = async () => {
      const url = `https://www.valdemarsro.dk/aftensmad/`;
      rp(url)
        .then(async function(html) {
          const arrayRecipes = $(".thumb-link-wrapper", html);
          for (let index = 0; index < arrayRecipes.length; index++) {
            const name = arrayRecipes[index].children[3].children[0].data;
            const link =
              arrayRecipes[index].children[1].children[1].attribs.href;
            const image =
              arrayRecipes[index].children[1].children[1].attribs.style;
            await waitFor(2000);
            rp(link)
              .then(async function(htmlSingle) {
                const ingredientLength = $(".ingredientlist", htmlSingle)[0]
                  .children.length;
                let ingredientsConcat = [];

                for (let index = 0; index < ingredientLength; index++) {
                  const zLength = $(".ingredientlist", htmlSingle)[0].children[
                    index
                  ].children.length;
                  if (zLength === 3) {
                    ingredientsConcat.push(
                      $(".ingredientlist", htmlSingle)[0].children[index]
                        .children[1].children[0].data
                    );
                  } else if (zLength === 2) {
                    ingredientsConcat.push(
                      $(".ingredientlist", htmlSingle)[0].children[index]
                        .children[1].children === undefined
                        ? "Dno"
                        : $(".ingredientlist", htmlSingle)[0].children[index]
                            .children[1].children[0].data
                    );
                  } else if (zLength === 4 || zLength === 5) {
                    $(".ingredientlist", htmlSingle)[0].children[index]
                      .children[1].children === undefined
                      ? ingredientsConcat.push(
                          $(".ingredientlist", htmlSingle)[0].children[index]
                            .children[0].children[0].data
                        )
                      : ingredientsConcat.push(
                          $(".ingredientlist", htmlSingle)[0].children[index]
                            .children[1].children[0].data
                        );
                  } else {
                    ingredientsConcat.push(
                      $(".ingredientlist", htmlSingle)[0].children[index]
                        .children[0].data
                    );
                  }
                }
                function arrayToString(arr) {
                  let str = "";
                  arr.forEach(function(i, index) {
                    str += i;
                    if (index != arr.length - 1) {
                      str += ",";
                    }
                  });
                  return str;
                }
                let newString = arrayToString(ingredientsConcat);
                await waitFor(1000);

                const recipe = {
                  name,
                  image,
                  link,
                  ingredients: newString
                };
                const res = await Recipe.create(recipe);
                console.log(res);
              })
              .catch(function(err) {
                //handle error
                console.log(err);
              });
          }
        })
        .catch(function(err) {
          //handle error
          console.log(err);
        });
    };
    singleLink();
    return res.send({ status: "GO" });
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
};
