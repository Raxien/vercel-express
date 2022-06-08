console.log('Splitwise module loading');

var express = require('express');
var router = express.Router();

const Splitwise = require('splitwise');
const fs = require('fs');

console.log('Loading splitwise config');

//#region reading config
// start reading config json
let rawdata = fs.readFileSync('data/config.json');
let config = JSON.parse(rawdata);
console.log(config);

const port = config.port;
const group = config.group;
const limit = config.limit;
const consumerKey = config.consumerKey;
const consumerSecret = config.consumerSecret;

// setting splitwise 
const sw = Splitwise({
  consumerKey: consumerKey,
  consumerSecret: consumerSecret
})
//#endregion

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/get', (req, res) => {
  console.log('Getting data for vandipety expanses');
  // console.log(req);

  const groupId = req.params.groupId == null? group : req.params.groupId ;
  const datedAfter = req.params.datedAfter == null? '1900-01-01' : req.params.datedAfter;
  const datedaBefore = req.params.datedaBefore == null? '3000-01-01' : eq.params.datedAfter;

  console.log(groupId);
  console.log(datedAfter);
  console.log(datedaBefore);

  let data = {
    group_id: groupId,
    dated_after: datedAfter,
    dated_before: datedaBefore,
    limit : limit
  }
  
  console.log(data);

  sw.getExpenses(data).then((value) => {
    console.log('getting expense');
    console.log(value.length);
    console.log(value);
  
    res.status(200).json({ res: value });
  }).catch(error => res.status(404).send({ res: -1, err: error})) 
});

module.exports = router;
console.log('Splitwise module loaded');