// var fs = require('fs');
// express = require('express')
//    , router = express.Router()
//    , MongoClient = require('mongodb').MongoClient
//    , ObjectId = require('mongodb').ObjectId
//    , fs = require('fs-extra')
   // Your mongodb or mLabs connection string
//    , multer = require('multer')
//    , util = require('util')
//    , upload = multer({limits: {fileSize: 2000000 },dest:'./public/images'});
// var app = require('../../app');
var Events = require('../../models/events');
var User = require('../../models/userprofile');
var loginController = require('../../controller/loginController');
// GET articles API.
exports.list = (request, result, next) => {
    //console.log("bbbbbbbbbbbbbbb");
Events.find({}, (error, events) => {
    if (error) return next(error)
    // result.send({articles: articles})
    result.render("../views/front/pages/events", {events: events, login: loginController.login});
    
    // result.render("../views/articles/index", {events: events});
})
}

exports.listById = (request, result, next) => {
    if (!request.params.id) return next(new Error('No article ID.'))
    request.collections.articles.findById(request.params.id,(error, articlesOne) => {
        
        if (error) return next(error)
        // result.send({articles: articlesOne})
        result.render("../views/articles/show", {articles: articlesOne});
    })
    }

exports.create = function(req, res) {
    res.render("../views/front/pages/events", {events: events});
      };

exports.tambah = function(req, res) {
    // let payload = req.body;
console.log(req.body);
    if (!req.body) return next(new Error('No payload.'))
    
        //  console.log('landing here', req.file)
        // read the img file from tmp in-memory location
        // var newImg = fs.readFileSync(req.file.path);
        // encode the file as a base64 string.
        // var encImg = newImg.toString('base64');
        // define your new document
        var newEvents = new Events(req.body);        
        // var newItem = {
        //    email: req.body.email,
        //    phone: req.body.phone,
        //    name: req.body.name,           
        //    jam: req.body.jam,
        //    tanggal: req.body.tanggal,           
        //    tempat: req.body.tempat,           
        //    guestStar: req.body.guestStar,           
        //    created: req.body.created
        //    contentType: req.file.mimetype,
        //    size: req.file.size,
        //    name: req.file.originalname,
        //    path: req.file.path,
        //    img: Buffer(encImg, 'base64')
        // };
// article.published = false
    newEvents.save(req.body, function(err,events) {
        console.log(events);
          if(err) {
            console.log(err);
            res.render("../views/articles/create");
          } else {
            console.log("Successfully created.");
            // var newoid = new ObjectId(res.ops[0]._id);
            // fs.remove(req.file.path, function(err) {
            if (err) { console.log(err) };
            res.send(events);
         
            
            
        }
        });
    }

    exports.pictures = function(req, res){
        // assign the URL parameter to a variable
        console.log("sembarang bro");
        
        var filename = req.params.picture;
        // // open the mongodb connection with the connection
        // // string stored in the variable called url.
        req.collections.articles
        // // perform a mongodb search and return only one result.
        // // convert the variabvle called filename into a valid
        // // objectId.
             .findOne({'_id': ObjectId(filename)}, function(err, results){
        // // set the http response header so the browser knows this
        // // is an 'image/jpeg' or 'image/png'
            res.setHeader('content-type', results.contentType);
        // // send only the base64 string stored in the img object
        // // buffer element
                 res.send(results.img.buffer);
              });
           
        };
  
// POST article API.
// exports.tambah = (req, res, next) => {
    // console.log(req.body)
    // if (!req.body) return next(new Error('No payload.'))
// let article = req.body.article
// article.published = false
// var newEvents = new Events(req.body);
// newEvents.save(req.body, (error, events) => {
//     console.log('aaa', events)
//     if (error) return next(error)
//     res.render("../views/front/pages/events");   
    
    // res.send(articleResponse)
// })
//  }

exports.update = function(req, res) {
    Events.findById(req.params.id, function (err, event) {
      if (err) return next(error)
      res.send(event);
      
    });
  };

// PUT article API.
exports.edit = (req, res, next) => {
if (!req.params.id) return next(new Error('No article ID.'))
// req.collections.articles.updateById(req.params.id, {$set: req.body.article}, (error, count) => {

console.log(req.body);
Events.updateOne({_id: req.params.id}, req.body, (err, event) => {  
    
    if (err) {
        console.log(err);
        // res.render("../views/front/pages/events", {events: event});
      }
      res.send(event);
    // if (error) return next(error)
    // res.send({affectedCount: count})
})
}
  
// DELETE article API.
exports.del = (req, res, next) => {
if (!req.params.id) return next(new Error('No event ID.'))       
Events.findByIdAndRemove(req.params.id, (error) => {
    if (error) return next(error)
    // res.send({affectedCount: count})
    console.log("deleted!");
    res.redirect('/admin');
})
}

exports.usersManagement = (req, res, next) => {
    User.find({}, (error, users) => {
        if (error) return next(error)
        // result.send({articles: articles})
        res.render("../views/front/pages/usersmanagement", {users: users, login: loginController.login});
        
        // result.render("../views/articles/index", {events: events});
    })
}

exports.updateUsersM = function(req, res) {
    User.findById(req.params.id, function (err, user) {
      if (err) return next(error)
      res.send(user);
      
    });
  };

exports.editUsersM = (req, res, next) => {
    if (!req.params.id) return next(new Error('No article ID.'))
    // req.collections.articles.updateById(req.params.id, {$set: req.body.article}, (error, count) => {
    
    console.log(req.body);
    User.updateOne({_id: req.params.id}, req.body, (err, user) => {  
        
        if (err) {
            console.log(err);
            // res.render("../views/front/pages/events", {events: event});
          }
          res.send(user);
        // if (error) return next(error)
        // res.send({affectedCount: count})
    })
    }

exports.confirm = (req, res, next) => {
    User.findById(req.params.id, (error, user) => {
        if (error) return next(error)
        // result.send({articles: articles})
        user.update({status: 'Disetujui'}, (err, userupdate) => {
            if (err) throw err;
            console.log("Aktivasi berhasil!");
            console.log('Silahkan login');
            res.redirect('/');
        })
        
        // result.render("../views/articles/index", {events: events});
    })
    }