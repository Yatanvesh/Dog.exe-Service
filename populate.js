const DogModel = require('./models/Dog');
const ThighModel = require('./models/Thigh');
const Scraper = require('images-scraper');
const google = new Scraper({
  puppeteer: {
    headless: false,
  },
  tbs: {isz: 'l'}
});
async function populuateDogs() {
  const dogs = await google.scrape('cute dogs', 2000);
  dogs.map(async (dog, index) => {
    console.log("Saving", index, dog);
    if (!!dog.url)
      await DogModel.create(dog.url)
  });
  console.log("Done saving dogs");
}
async function populuateThighs() {

  const thighs = await google.scrape('Anime thighs aesthetic', 2000);
  thighs.map(async (thigh, index) => {
    console.log("Saving", index, thigh);
    if (!!thigh.url)
      await ThighModel.create(thigh.url)
  });
  console.log("Done saving thighs");
}

populuateThighs()