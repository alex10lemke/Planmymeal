const rp = require("request-promise");
const $ = require("cheerio");
const waitFor = ms => new Promise(r => setTimeout(r, ms));

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const singleLink = async () => {
  for (let index = 0; index < 1; index++) {
    const url = `https://www.valdemarsro.dk/aftensmad/`;
    await waitFor(1000);
    rp(url)
      .then(async function(html) {
        // console.log($(".thumb-link-wrapper", html));

        const arrayRecipes = $(".thumb-link-wrapper", html);
        console.log(arrayRecipes);

        for (let index = 1; index < 2; index++) {
          const name = arrayRecipes[index].children[3].children[0].data;
          const link = arrayRecipes[index].children[1].children[1].attribs.href;
          const image =
            arrayRecipes[index].children[1].children[1].attribs.style;
          await waitFor(2000);
          rp(link)
            .then(async function(htmlSingle) {
              const ingredientLength = $(".ingredientlist", htmlSingle)[0]
                .children.length;
              let ingredientsConcat = [];
              for (let index = 0; index < ingredientLength; index++) {
                if (
                  $(".ingredientlist", htmlSingle)[0].children[index].children
                    .length === 3
                ) {
                  ingredientsConcat.push(
                    $(".ingredientlist", htmlSingle)[0].children[index]
                      .children[1].children[0].data
                  );
                } else if (
                  $(".ingredientlist", htmlSingle)[0].children[index].children
                    .length === 2
                ) {
                  ingredientsConcat.push(
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
  }
};

singleLink();
