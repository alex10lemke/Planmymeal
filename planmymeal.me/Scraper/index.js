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

const scrapeRecipes = async () => {
  for (let index = 0; index < 1; index++) {
    const url = `https://www.dk-kogebogen.dk/opskrifter/retter-3.php?id=62&limit=${index}00`;
    await waitFor(1000);
    rp(url)
      .then(async function(html) {
        const array = $("table", html)[0].children[0].parent.children[0].next
          .children[0].children[4].next.children[2].next.children[0].next
          .children[0].children[2].next.children;

        await asyncForEach(array, async num => {
          await waitFor(50);
          if (num.name === "table") {
            num.children.forEach(e => {
              obj.table.push(e.next);
            });
          }
        });
        for (let index = 0; index < obj.table[0].children.length - 1; index++) {
          arrayOfLinks.links.push({
            linkName:
              obj.table[0].children[index].children[5].children[0].children[0]
                .attribs.href
          });

          // console.log(
          //   obj.table[0].children[index].children[5].children[0].children[0]
          //     .attribs.href
          // );
        }
        await waitFor(1000);
        console.log(arrayOfLinks.links);
        fs.appendFile(
          "myjsonfile.json",
          JSON.stringify(arrayOfLinks.links),
          "utf8",
          callback => {
            console.log(callback);
          }
        );
      })
      .catch(function(err) {
        //handle error
        console.log(err);
      });
  }
};

scrapeRecipes();
