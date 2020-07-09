const DogModel = require('./models/Dog');
const Scraper = require('images-scraper');

async function populuate () {
  const google = new Scraper({
    puppeteer: {
      headless: true,
    },
    tbs: {isz: 'l'  }
  });
  const dogs = await google.scrape('cute dogs', 10);
  dogs.map(async dog => await DogModel.create(dog.url));
  console.log("Done saving dogs");
}

populuate();