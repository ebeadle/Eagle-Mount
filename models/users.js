var mongoose = require('mongoose');
var passwordHash = require('password-hash');

var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {type: String, required: true, unique: true},
  // email: String,
  password: {
    type: String,
    set: function(password) {
      return passwordHash.generate(password);
    }
  },
  admin: String,
  shifts: [{type: Schema.Types.ObjectId, ref: 'Shift'}]
  
})

module.exports = mongoose.model('User', UserSchema);