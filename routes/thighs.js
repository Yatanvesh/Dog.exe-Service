const express = require('express');
const router = express.Router();

const Scraper = require('images-scraper');
const ThighModel = require('../models/Thigh');

router.get('/', async function (req, res, next) {
  try {
    console
    const randomThigh = await ThighModel.getRandom();
    res.json({url: randomThigh});
  } catch (err) {
    console.log("error", err);
    res.status(500).json({error: err});
  }
});

router.get('/count', async function (req, res, next) {
  try {
    const count = await ThighModel.getRemaining();
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
    const thighs = await google.scrape('beatiful thighs models', 1000);
    thighs.map(async thigh => {
      if (!!thigh.url){
        await ThighModel.create(thigh.url)
      }
    });
    console.log("Added", thighs.length, 'thighs');
    res.json({thighs});
  } catch (err) {
    console.log("error", err);
    res.status(500).json({error: err});
  }
});

module.exports = router;
