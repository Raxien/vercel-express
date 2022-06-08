import express from 'express';
import { Request, Response } from 'express';
import fs from 'fs';
import { json } from 'stream/consumers';
const Splitwise = require('splitwise');

// import cors from "cors"; // for CORS setup, usage: app.use(cors());
// const createError = require('http-errors');

// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// var swRouter = require('sw');
// var dataRouter = require('../backend/src/data.js');

const app = express();
const port = process.env.PORT || 3030; // default port to listen

const readFile = function (item: string) {
  let rawdata = fs.readFileSync('../data/' + item + '.json');
  let json = JSON.parse(rawdata.toString());

  console.log(json);

  return json;
};

//#region reading config
// start reading config json
let rawdata = fs.readFileSync('../data/config.json');
let config = JSON.parse(rawdata.toString());
console.log(config);

const group = config.group;
const limit = config.limit;
const consumerKey = config.consumerKey;
const consumerSecret = config.consumerSecret;

// setting splitwise
const sw = Splitwise({
  consumerKey: consumerKey,
  consumerSecret: consumerSecret
});
//#endregion

app.get('/api/sw', (req: Request, res: Response) => {
  console.log('Getting data for vandipety expanses');
  // console.log(req);

  const groupId = req.params.groupId == null ? group : req.params.groupId;
  const datedAfter = req.params.datedAfter == null ? '1900-01-01' : req.params.datedAfter;
  const datedaBefore = req.params.datedaBefore == null ? '3000-01-01' : req.params.datedAfter;

  console.log(groupId);
  console.log(datedAfter);
  console.log(datedaBefore);

  let data = {
    group_id: groupId,
    dated_after: datedAfter,
    dated_before: datedaBefore,
    limit: limit
  };

  console.log(data);

  sw.getExpenses(data)
    .then((value: string) => {
      console.log('getting expense');
      console.log(value.length);
      console.log(value);

      res.status(200).json({ res: value });
    })
    .catch((error: string) => res.status(404).send({ res: -1, err: error }));
});

app.get('/api/gears', (req, res) => {
  var item = 'gears';
  console.log('Getting ' + item + ' list');

  let json = readFile(item);

  res.status(200).json({ json });
});

app.get('/api/books', (req, res) => {
  var item = 'books';
  console.log('Getting ' + item + ' list');

  let json = readFile(item);

  res.status(200).json({ json });
});

app.get('/api/trip', (req, res) => {
  var item = 'trip';
  console.log('Getting ' + item + ' list');

  let json = readFile(item);

  res.status(200).json({ json });
});

app.get('/api', (req: Request, res: Response) => {
  const randomId = `${Math.random()}`.slice(2);
  const path = `/api/item/${randomId}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Fetch one item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:itemId', (req: Request, res: Response) => {
  const { itemId } = req.params;
  res.json({ itemId });
});

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server started at http://localhost:${port}`);
});

module.exports = app;
