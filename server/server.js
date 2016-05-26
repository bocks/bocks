var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 1337;

console.log('listening on ', port);

allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);
app.use(bodyParser.json())

app.post('/', function (req, res) {

});

app.get('/', function (req, res) {

});

app.delete('/', function (req, res) {

});

app.listen(port);