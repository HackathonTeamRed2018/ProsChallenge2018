var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/results', function(req, res, next) {
  let data = {from: "Houston, TX", to: "Seattle, WA", price: 420, distance: 500, stops: 1};
  res.render('results', { results: data });
});

router.post('/results', function(req, res, next) {
  if (req.body) {
    for (i in req.body) {
      console.log(i);
    }
  }
  res.render('results', { title: "Search Results!", results: req.body })
});

module.exports = router;
