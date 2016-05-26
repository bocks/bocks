var express = require('express');
var app = express();
var static = require('express-static');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = 1337;

console.log('listening on ', port);

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
app.use(bodyParser.json());
app.use(static(__dirname + '/../public'));

mongoose.connect('mongodb://localhost/bocks');


app.post('/', function (req, res) {

});

// app.get('/', function (req, res) {
//   // res.send('hello world');
// });

app.delete('/', function (req, res) {

});



app.listen(port);


