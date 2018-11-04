var express = require('express');
var router = express.Router();
let price = require("../lib/priceGetter");
let data;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/results', function(req, res, next) {

 if(!data)
 { 
    data = {from: "", to: "", price:0 , distance: 0, stops: 0};
 }
 console.log(JSON.stringify(data));
  res.render('results', { results: data });
});

router.post('/results', function(req, res, next) {
  console.log(JSON.stringify(req.body));
  console.log("req.body.fromLocation= "+req.body.fromLocation);
  console.log("req.body.toLocation= "+req.body.toLocation);

  
  price.findPrice(req.body.fromLocation , req.body.toLocation )
        .then((resolve)=>{
           data = {
            from: "Houston, TX",
             to: "Seattle, WA",
              price:  resolve.price,
               distance: resolve.duration,
                stops: 1
              };
              res.redirect('/results');
        })
        .catch((err)=>{
            console.log('there was an error= '+err);
            
        });
  // res.render('results', { title: "Search Results!", results: req.body })
});

module.exports = router;
