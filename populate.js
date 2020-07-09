const DogModel = require('./models/Dog');
const Scraper = require('images-scraper');

async function populuate() {
  const google = new Scraper({
    puppeteer: {
      headless: true,
    },
    tbs: {isz: 'l'}
  });
  const dogs = await google.scrape('cute dogs and puppies', 2000);
  dogs.map(async (dog, index) => {
    console.log("Saving", index, dog);
    if (!!dog.url)
      await DogModel.create(dog.url)
  });
  console.log("Done saving dogs");
}

populuate();