var express = require('express');
var router = express.Router();

const AnalyticsModel = require('../models/Analytics');

router.get('/', async function(req, res, next) {
  const list = await AnalyticsModel.getAll();
  res.json({ count:list.length,requests: list });
});

router.get('/dog', async function(req, res, next) {
  const list = await AnalyticsModel.getDogs();
  res.json({ count:list.length,requests: list });
});

module.exports = router;
