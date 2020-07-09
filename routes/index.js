var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const ipInfo = req.ipInfo;
  const message = `Hey, you are browsing from ${ipInfo.city}, ${ipInfo.country}`;
  res.json({ title: 'Scraper', message });
});

module.exports = router;
