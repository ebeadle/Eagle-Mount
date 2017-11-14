var express = require('express');
var app = require("express")();
let bodyParser = require("body-parser");
var User = require("./models/users");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var passwordHash = require("password-hash");
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var cookieParser = require('cookie-parser');
var http = require('http');
var path  = require('path');
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
app.use(session({ secret: "moby" }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  {email:'username', password:'password'}, 
  function(email, password, done) {
    
    User.findOne({ email: email }, function(error, user) {
      
      if (passwordHash.verify(password, user.password)) {
        console.log('success')
        done(null, user);
      } else if (user || !error) {
        done(error, null);
      } else {
        done(error, null);
      }
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

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

app.post('/getUser', (req, res, next) => {
  User.findById( req.body.user.id, (err, userObj)=>{
    if(err) {
      console.log(err);
    }else {
      console.log(userObj);
      done(null, userObj);
    }
    
  })
});

app.post('/login',function(req, res, next){
  passport.authenticate('local', function(err, user){
    if (err){
      console.log(err);
    }
    req.logIn(user, function(error) {
      if (error) return next(error);
        res.json(user);
      });
  })(req,res, next);
});

var port = process.env.PORT || 5000;

app.listen(port, function(){
  console.log("Eagle Mount Listening on " + port);
});