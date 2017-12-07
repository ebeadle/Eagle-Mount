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
var http = require('https');


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
  // Kate's code.
  user.confirmed = false;

  //Kate's code start here
  var options = {
    "method": "POST",
    "hostname": "api.sendgrid.com",
    "port": null,
    "path": "/v3/mail/send",
    "headers": {
      "authorization": "Bearer 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",
      "content-type": "application/json"
    }
  };

  console.log("Email is processing for " + user.email);

  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  req.write(JSON.stringify({ personalizations: 
    [ { to: [ { email: user.email, name: user.firstName } ],
        subject: 'Confirm Email' } ],
    from: { email: 'do-not-reply@eaglemount.org', name: 'Eagle Mount' },
    reply_to: { email: 'do-not-reply@eaglemount.org', name: 'Eagle Mount' },
    subject: 'Confirm Email',
    content: 
    [ { type: 'text/html',
        value: '<html><p>Hello! Please confirm your email by following this link: <a href="http://localhost:3000/confirm?email=' + user.email + '">Confirm</a></p></html>' } ] }));
  req.end();
  console.log("Email processed.");

// End Kate's code

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

//Kate's code
app.get('/confirm', function(req, res, next) {
  if (req.query.email) {
    console.log("Confirmation for: " + req.query.email);
    var email = req.query.email;
    var user = new User();
    if (req.query && req.query.email) {
      User.findOneAndUpdate({email: req.query.email}, {$set: {confirmed: true}}, {upsert: true}, function(error, update_entry) {
        if (error) {
          console.log("Error: " + JSON.stringify(error));
          res.status(404).end();
        } else {
          console.log("Successful confirmation of " + email);
          //Kate's code start here
          var options = {
            "method": "POST",
            "hostname": "api.sendgrid.com",
            "port": null,
            "path": "/v3/mail/send",
            "headers": {
              "authorization": "Bearer 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",
              "content-type": "application/json"
            }
          };
  
          console.log("Email is processing for " + email);
  
          var req = http.request(options, function (res) {
            var chunks = [];
  
            res.on("data", function (chunk) {
              chunks.push(chunk);
            });
  
            res.on("end", function () {
              var body = Buffer.concat(chunks);
              console.log(body.toString());
            });
          });
  
          req.write(JSON.stringify({ personalizations: 
            [ { to: [ { email: email, name: "New User" } ],
                subject: 'Successful confirmation' } ],
            from: { email: 'do-not-reply@eaglemount.org', name: 'Eagle Mount' },
            reply_to: { email: 'do-not-reply@eaglemount.org', name: 'Eagle Mount' },
            subject: 'Successful Confirmation',
            content: 
            [ { type: 'text/html',
                value: '<html><p>Your email has been successfully confirmed. Thank you!</p></html>' } ] }));
          req.end();
          console.log("Email processed.");
  
        // End Kate's code
          res.redirect('/fancyCalendar');
        }
      })
    }
  }
  
});
//The end Kate's code

app.get('/getUser', (req, res, next) => {
  console.log(req.user)
  console.log("!!!!!!!!!!!!!!!!!!!")
  if (req.user){

    User.findById(req.user._id, (err, foundUser) => {
      if (err) {
        console.log(err)
      } else {
        res.json(foundUser)
        console.log(foundUser)
        console.log("found user")
      }
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
  console.log(req.body.user)
  console.log("LOGGING USER********")
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
      // host: 'smtp.gmail.com',
      // port: 587,
      // secure: false, // true for 465, false for other ports
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
        //return error
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
              Shift.find(function(err, shift) {
                
                if(err){
                  next(err)
                } else {
                  console.log(shift)
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
    console.log(req.body._id);
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