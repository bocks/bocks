var mongoose = require('mongoose');

var bocksSchema = new mongoose.Schema({
  user: String,
  title: String,
  html: String
});

module.exports = mongoose.model('bocksSchema', bocksSchema);