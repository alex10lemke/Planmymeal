const rp = require("request-promise");
const $ = require("cheerio");
const fs = require("fs");

var obj = {
  table: []
};

var arrayOfLinks = {
  links: []
};

const waitFor = ms => new Promise(r => setTimeout(r, ms));

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const singleLink = async () => {
  for (let index = 0; index < 1; index++) {
    const url = `https://www.dk-kogebogen.dk/opskrifter/34066/kyllingefrikadeller-04`;
    await waitFor(1000);
    rp(url)
      .then(async function(html) {
        // console.log($("table", html));
        // const recipeName = $("table", html)[0].children[0].parent.children[0]
        //   .next.children[0].children[4].next.children[0].children[0].children[0]
        //   .children[0].children[0].data;

        // const ingredients = $("table", html)[0].children[0].parent.children[0]
        //   .next.children[0].children[4].next.children[0].children[8].next
        //   .children[0].children[0].children[1].children[5].children[1].next
        //   .children[0].children[5].children[0].children[0].data;

        // const ingredientWithTag = $("table", html)[0].children[0].parent
        //   .children[0].next.children[0].children[4].next.children[0].children[8]
        //   .next.children[0].children[0].children[1].children[5].children[0].next
        //   .children[4].children[5].children[1].children[1].children[0].data;
        const ingredientWithTag = $("table", html)[0].children[0].parent
          .children[0].next.children[0].children[4].next.children[0].children[8]
          .next.children[0].children[0].children[1].children[5].children[0].next
          .children[3];
        console.log(ingredientWithTag);

        // for (let index = 0; index < array.length; index++) {
        //   const element = array[index];

        // }

        // await asyncForEach(array, async num => {
        //   await waitFor(50);
        //   if (num.name === "table") {
        //     num.children.forEach(e => {
        //       obj.table.push(e.next);
        //     });
        //   }
        // });
        // for (let index = 0; index < obj.table[0].children.length - 1; index++) {
        //   arrayOfLinks.links.push({
        //     linkName:
        //       obj.table[0].children[index].children[5].children[0].children[0]
        //         .attribs.href
        //   });
        // }
      })
      .catch(function(err) {
        //handle error
        console.log(err);
      });
  }
};

singleLink();
