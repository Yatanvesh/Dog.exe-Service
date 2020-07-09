var express = require('express');
var router = express.Router();

const AnalyticsModel = require('../models/Analytics');

router.get('/', async function(req, res, next) {
  const list = await AnalyticsModel.getAll();
  res.json({ users: list });
});

module.exports = router;
