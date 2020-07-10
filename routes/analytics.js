var express = require('express');
var router = express.Router();

const AnalyticsModel = require('../models/Analytics');

router.get('/', async function(req, res, next) {
  const list = await AnalyticsModel.getAll();
  const requests = await AnalyticsModel.count();
  res.json({ requests,users: list });
});

module.exports = router;
