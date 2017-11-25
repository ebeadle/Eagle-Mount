var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ShiftSchema = new mongoose.Schema({
  date: String,
  time: String,
  title: String, //this is going to skill I think
  start: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'},

});

module.exports = mongoose.model('Shift', ShiftSchema);