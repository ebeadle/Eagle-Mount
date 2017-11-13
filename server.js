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
//require('dotenv').config();
var mongodbUri = process.env.mongoStuff;
var mongooseUri = uriUtil.formatMongoose(mongodbUri);
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