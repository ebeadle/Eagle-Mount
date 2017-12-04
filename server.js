var express = require('express');
var app = require("express")();
let bodyParser = require("body-parser");
var User = require("./models/users");
var Shift = require('./models/shifts');
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var passwordHash = require("password-hash");
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var cookieParser = require('cookie-parser');
var http = require('http');
var path  = require('path');
var nodemailer = require('nodemailer');
require('dotenv').config();

mongoose.Promise = global.Promise;
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

if (process.env.NODE_ENV === 'production') { 
  app.use(express.static("./eagle-client/build"));
} else {
  app.use(express.static("public"));  
}

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "moby" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('./eagle-client/public'));

passport.use(new LocalStrategy({ username: "email", password: "password" },  (email, password, done) => {
  User.findOne({
    email: email
  }, (err, foundUser) => {
    if (err) {
      console.log(err);
      next(err);
    } else if (foundUser == null){
      return done(err, null)
    } else {
      if (passwordHash.verify(password, foundUser.password)) {
        return done(null, foundUser);
      } else {
        return done(err, null);
      }
    }
  })
})
)

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user) {
    done(err, user);
  });
});



app.post('/signup', function(req, res, next){
  
  var user = new User();
 
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.password = req.body.password;
  user.admin = req.body.admin;
  User.findOne({email: user.email}, (err, foundUser)=> {
   
   if(err) {
     res.json({
       found: false,
       message: err,
       success: false
     });
   } else {
     user.save((error, userReturned)=> {
      
       if(error){
         console.log(error);
         res.json({
           found: true,
           message: 'An Account is already associated with that email address',
           success: false
         })
       } else {
         res.json({
           userReturned: userReturned,
           found: true,
           success: true
         });
       }
     });
   }
  });
});


app.get('/getUser', (req, res, next) => {
  if (req.user){
    User.findById(req.user._id, (err, foundUser) => {
      if (err) {
        console.log(err)
      } 
      //else {
    //res.json(foundUser)
    // console.log(foundUser)
    //console.log("found user")
  //} 
      }).populate('shifts').exec((err, foundUser) => {
        console.log(foundUser.shifts);
        console.log('^user in getuser')
    res.json(foundUser)
  })
  } else {
      res.json({message:'nobody logged in '});
    }
  });
  




    

app.post('/login',function(req, res, next){
  passport.authenticate('local', function(err, user){
    if (err){
      res.json({
        
        success: false,
        message: err
      })
    } else if(user){
    req.logIn(user, (err)=> {
      if (err){ 
      console.log(err);
      next(err);
      } else {
        res.json({
          user: user,
          success: true,
          message: "Success"
        });
      }
      });
    
    } else {
      res.json({
        
        success: false,
        message: "Incorrect Email or Password"
      })
    }
  })(req,res, next);
  
});



app.get('/userShifts', function(req, res, next) {
  User.findById(function(err, user) { 
    if(err){
      next(err)
    }  
  }).populate('shift').exec((err, user) => {
    res.json(user)
  });
});

app.get('/logout', function(req, res){
  if(req.user) {
    req.logout();
    res.json('user logged out')
    req.session.destroy();
  } else {
    res.json('no user logged in')
  }
});

app.post('/open-shifts', function(req, res, next){
  var shift = new Shift();
  
  shift.date = req.body.date;
  shift.skill = req.body.skill;
  shift.time = req.body.time;
  shift.title = req.body.title;
  shift.start = req.body.start
  shift.user = req.body.user
  

  shift.save(function(err, newShift){
    //console.log(newShift);
    if(err) {
      console.log(err)
    } else {
      res.json(newShift);
    }
  })
});

app.post('/claimShift', function (req, res, next) {
  nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'reekkmtcs@gmail.com',
        pass: 'codeschool#1'
    }
  });
   let mailOptions = {
    from: '"Volunteer Calendar" <reekkmtcs@gmail.com>',
    to: 'emilykimmel406@gmail.com', 
    subject: 'Hello ✔',
    text: 'Hi there!',
    html:  '<p>This email confirms that a volunteer shift has been claimed </p>' 
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error)
    }
  });
});
  
      Shift.findByIdAndUpdate({_id: req.body.shiftId}, "user", (err, shift) => {
          if (err) {
              console.log(err);
              next(err);
          } else {
            shift.user = req.body.userId
          }
          shift.save((err, returnShift)=> {
            if(err){
              next(err)
            } else {
              //console.log(req.user);
              User.findByIdAndUpdate({_id: req.body.userId}, 'shift', (err, user) =>{
                //console.log(req.body.shift)
                //console.log('this is req.body.shift')
                user.shifts.push(req.body.shiftId)
                user.save((err, returnUser)=> {
                  console.log(returnUser);
                })
              });
              Shift.find(function(err, shift) {
                
                if(err){
                  next(err)
                } else {

                  res.json(shift);
                }   
              });
            }
          })
      
      });



});



app.get('/shift', function(req, res, next) {
  Shift.find(function(err, shift) { 
    if(err){
      next(err)
    }  
  }).populate('user').exec((err, shift) => {
    res.json(shift)
  });
});



app.post('/deleteShift', function(req, res, next){
  Shift.findByIdAndRemove(req.body._id, function(err, shift){
    
      if(err){
          console.log(err);
          next(err);
      } else {
        Shift.find(function(err, shift) {
          if(err){
            next(err)
          } else {
            res.json(shift);
          }   
        });
      }
  });
});




var port = process.env.PORT || 5000;

app.listen(port, function(){
  console.log("Eagle Mount Listening on " + port);
});