var router = require('express').Router()
var session = require('express-session');
// module.exports = (function(app){
// app.use(session({
//     secret: '2C44-4D44-WppQ38S',
//     resave: true,
//     saveUninitialized: true
// }));
// var MongoClient = require('mongodb').MongoClient;
// var url = 'mongodb://localhost:27017/myproject';
var authentication = require('./authentication');
var User = require('../models/userprofile');

// Authentication and Authorization Middleware
// var authAdmin = function(req, res, next) {
  //   if (req.session && req.session.user === "admin" && req.session.admin)
  //     return next();
  //   else
  //     return res.sendStatus(401);
  // };

router.get('/', function(req,res){
    res.render('home');
  });
  router.get('/register',function(req,res){
    res.render('register');
  });
  router.get('/login',function(req,res){
    res.render('login');
  });
// Login TO DB==================================================================
  router.post('/demo', function(req,res){
    console.log('aaaa', req.body);
  //  MongoClient.connect(url, function(err, database) {
  //  var db=database.db('myproject');
   User.findOne({ email: req.body.email}, function(err, userprofile) {
             if(userprofile === null){
               res.end("Login invalid");
            }else if (userprofile.email && (userprofile.email === req.body.email) && userprofile.pass && (userprofile.pass === req.body.pass)){
              
              req.session.user = userprofile;
              console.log(req.session)
              if(req.session.user.name !== "admin"){
                // req.session.admin = false;
                req.session.userprofile = userprofile;                         
                console.log("login success!");
              res.redirect('/content') 
              } else {
                // req.session.admin = true;
                req.session.userprofile = userprofile;                         
                console.log("login success!");
                res.redirect('/admin');
                
              }
                          
          } else {
            console.log("Credentials wrong");
            res.end("Login invalid");
          }
   });
 ;
});
//register to DB================================================================
router.post('/regiterToDb',function(req,res){
 console.log(req.body);
 var obj = JSON.stringify(req.body);
 var jsonObj = JSON.parse(obj);
     res.render('profile',{loginData:req.body});
  });
//register profile to MongoDB================================================================
  router.post('/completeprofile',function(req,res){
  //  var obj = JSON.stringify(req.body);
  //  console.log("Final reg Data : "+obj);
  //  var jsonObj = JSON.parse(obj);
      // MongoClient.connect(url, function(err, database) {
      // var db=database.db('myproject');
      var newUser = new User(req.body);
        newUser.save(req.body, function(err, res) {
          console.log(res)
     if (err) throw err;
     console.log("1 document inserted");
    //  db.close();
      });
       res.render('completeprofile',{profileData:req.body});
    // console.log(User)
    // console.log(obj)
  //   var newUser = new User(req.body)
  //   newUser.save(function(err, res) {
  //     console.log('success');
  //   })
  });

    router.get('/logout', function (req, res) {
      req.session.destroy();
      // res.send("logout success!");
      res.redirect('/');
    });

    router.get('/content', authentication.authUsers, function (req, res) {
      // res.render("../views/front/pages/events", {events: events});
            
      res.redirect('/users');
      // res.send("You can only see this after you've logged in.");
  });

  module.exports = router;