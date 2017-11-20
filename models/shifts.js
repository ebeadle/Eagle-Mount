var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ShiftSchema = new mongoose.Schema({
  date: String,
  claimed: Boolean,
  title: String, //this is going to skill I think
  start: String,
  

})

module.exports = mongoose.model('Shift', ShiftSchema);