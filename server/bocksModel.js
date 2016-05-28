var mongoose = require('mongoose');

var bocksSchema = new mongoose.Schema({
  userName: String,
  title: String,
  text: String,
  isPrivate: Boolean,
  createdAt: {type: Date, default: Date.now},
  modifiedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Bocks', bocksSchema);