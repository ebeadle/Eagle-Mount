var express = require('express');
var app = require("express")();
let bodyParser = require("body-parser");
var User = require("./models/users");
//var expressSession = require("express-session");
//var passport = require("passport");
//var LocalStrategy = require("passport-local").Strategy;
var passwordHash = require("password-hash");
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
//var cookieParser = require('cookie-parser');
//var http = require('http');
//var path  = require('path');
require('dotenv').config();

let mongodbUri = "mongodb://"+process.env.SERVER_MLAB_USER+":"+process.env.SERVER_MLAB_PASSWORD+"@ds259175.mlab.com:59175/eaglemount";
console.log(mongodbUri);
var mongooseUri = uriUtil.formatMongoose(mongodbUri);
//var mongooseUri = 'mongodb://localhost/eaglemount';    need for robo mongo


var options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};

mongoose.connect(mongooseUri, options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Eagle-Mount database connected.');
});
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(expressSession({ secret: "moby" }));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(express.static('./eagle-client/public'));

app.post('/signup', function(req, res, next){
  
  var user = new User();
  console.log(user)
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.password = req.body.password;
  user.skill = req.body.skill;
  user.admin = req.body.admin;
  user.save(function(err, newUser){
    console.log(newUser);
    if(err) {
      console.log(err)
    } else {
      res.json(newUser);
    }
  })
});

var port = process.env.PORT || 5000;

app.listen(port, function(){
  console.log("Eagle Mount Listening on " + port);
});