console.log('Data module loading');

var express = require('express');
var router = express.Router();

const fs = require('fs');

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/gears', (req, res) => {
  console.log('Getting gears list');
  
  let rawdata = fs.readFileSync('data/gears.json');
  let json = JSON.parse(rawdata);
  
  console.log(json);

  res.status(200).json({ json });
});

router.get('/books', (req, res) => {
  console.log('Getting books list');
    
  let rawdata = fs.readFileSync('data/books.json');
  let json = JSON.parse(rawdata);
  
  console.log(json);

  res.status(200).json({ json });
});

router.get('/trip', (req, res) => {
  console.log('Getting trip list');
    
  let rawdata = fs.readFileSync('data/trip.json');
  let json = JSON.parse(rawdata);
  
  console.log(json);

  res.status(200).json({ json });
});

module.exports = router;
console.log('Data module loaded');