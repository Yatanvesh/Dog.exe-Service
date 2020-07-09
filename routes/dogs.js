const express = require('express');
const router = express.Router();

const Scraper = require('images-scraper');
const DogModel = require('../models/Dog');

router.get('/', async function (req, res, next) {
  try {
    const randomDog = await DogModel.getRandom();
    res.json({url: randomDog});
  } catch (err) {
    console.log("error", err);
    res.status(500).json({error: err});
  }
});

router.get('/remaining', async function (req, res, next) {
  try {
    const count = await DogModel.getRemaining();
    res.json({count});
  } catch (err) {
    console.log("error", err);
    res.status(500).json({error: err});
  }
});

router.get('/populate', async function (req, res, next) {
  try {
    const google = new Scraper({
      puppeteer: {
        headless: true,
      },
      tbs: {  // every possible tbs search option, some examples and more info: http://jwebnet.net/advancedgooglesearch.html
        isz: 'l'
      },
    });
    const dogs = await google.scrape('cute dogs', 10);
    dogs.map(async dog => await DogModel.create(dog.url));

    res.json({dogs});
  } catch (err) {
    console.log("error", err);
    res.status(500).json({error: err});
  }
});

module.exports = router;
