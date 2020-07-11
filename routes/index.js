var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const ipInfo = req.ipInfo;
  const useragent = req.useragent;
  const message = `Hey, you are browsing from ${ipInfo.city}, ${ipInfo.country}`;
  res.json({ title: 'Scraper', message, useragent });
});

module.exports = router;
