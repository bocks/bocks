var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = 1337;

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));

var bocksSchema = require('./schemaModel.js');
mongoose.connect(__dirname, 'mongodb://host/db');

// allowCrossDomain = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//   if ('OPTIONS' === req.method) {
//     res.sendStatus(200);
//   } else {
//     next();
//   }
// };
// app.use(allowCrossDomain);
// app.post('/', function (req, res) {
// });
// app.get('/', function (req, res) {
//   // res.send('hello world');
// });
// app.delete('/', function (req, res) {
// });

app.listen(port, function() {
  console.log('listening on ', port);
});

/*login, signin routes */
