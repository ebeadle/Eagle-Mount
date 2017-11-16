var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ShiftSchema = new mongoose.Schema({
  date: String,
  day: String,
  time: String,
  skill: String,
  claimed: Boolean

})

module.exports = mongoose.model('Shift', ShiftSchema);