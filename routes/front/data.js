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
//and import somewhere..
var loginController = require('../../controller/loginController');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var mail = require('../../routes/config');
var mailgun = require('mailgun-js')({apiKey: mail.api_key, domain: mail.DOMAIN});
var Events = require('../../models/events');
var pesanEvents = require('../../models/pesanEvents');
var register = false;
var globalEvent = {};
// GET articles API.
exports.list = (request, result, next) => {
    console.log(request.body)
    //console.log("bbbbbbbbbbbbbbb");
Events.find({}, (error, events) => {
    if (error) return next(error)
    // result.send({articles: articles})
    var register = false;
    result.render("../views/back/indexLogin", {events: events, register:register, login: loginController.login});
    
    // result.render("../views/articles/index", {events: events});
})
}

exports.show = (request, result, next) => {
        //console.log("bbbbbbbbbbbbbbb");
    Events.find({}, (error, events) => {
        if (error) return next(error)
        // result.send({articles: articles})
        // result.send({articles: articlesOne})
        result.render("../views/back/indexLogin", {events: events, login: loginController.login});
    })
    }

exports.showById = (request, result, next) => {
    if (!request.params.id) return next(new Error('No article ID.'))
    Events.findById(request.params.id,(error, event) => {
        
        if (error) return next(error)
        // result.send({articles: articlesOne})
        var register = false;
        globalEvent = event;
        // console.log('aaa', event)
        result.render("../views/back/show", {event: event, register: register, login: loginController.login});
    })
    }
    
    exports.registerByEmail = (request, result, next) => {
        var newpesanEvents = new pesanEvents();
        // if (!request.params.id) return next(new Error('No article ID.'))
        pesanEvents.findOne({email: request.session.user.email}, (error, reg) => {
            // console.log(request);
            //cek sudah terdaftar di event atau belum
            if(!reg || request.params.id !== reg.event_id){// belum terdaftar
                
                console.log("No match data");
                // cek sudah login atau belum
                if (request.session.user.email){ //sudah login
                Events.findById(request.params.id, (err, eventdata) => {
                    // console.log(eventdata);
                    if(err){
                        return (err);
                        next();
                    }
                    else if(parseInt(eventdata.kuota) > 0){
                        eventdata.update({kuota: parseInt(eventdata.kuota)-1}, (err, data)=> {
                            if(err){
                                return next(err);
                            } else {
                                console.log('aaaaaaaaaaaaaaaaa' + Object.keys(request.session.user));
                            }
                        })
                    }
                    else {
                        result.end("Event's has been fulfilled!");
                        
                    }
                
                newpesanEvents.email = request.session.user.email;
                newpesanEvents.phone = request.session.user.phone;
                newpesanEvents.name = eventdata.name;
                newpesanEvents.tanggal = eventdata.tanggal;
                newpesanEvents.jam = eventdata.jam;
                newpesanEvents.tempat = eventdata.tempat;
                newpesanEvents.event_id = new ObjectId(request.params.id);                   
                                    
                newpesanEvents.save(function(err,registered) {
                    
                      if(err) {
                        // result.render("../views/back/show");
                      } else {
                        console.log("Successfully created.");
                        
                        // var newoid = new ObjectId(res.ops[0]._id);
                        // fs.remove(req.file.path, function(err) {
                        // if (err) { console.log(err) };                            
                        // res.send(newItem);
                        // result.redirect('/../views/back/show', {registered: registered});
                        var register = true;
                        var data = {
                            from: 'Admin <admin@events.com>',
                            to: `${registered.email}`,
                            subject: 'Hello!',
                            text: 'Testing some Mailgun awesomness!',
                            html: `<!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                            
                                <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" rel="stylesheet">    
                            
                                <title>Document</title>
                                
                                <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.5/jspdf.min.js"></script>
                                <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/2.3.2/jspdf.plugin.autotable.js"></script>
                                
                            </head>
                            <body>
                                
                                <div class="container">
                                    <div class="row">
                                      <div class="col-xs-12">
                                  
                                        <div id="content">
                                          <h2 class="text-center">Selamat!</h2>
                                          <p>Anda telah terdaftar di ${registered.name}. Berikut detail acaranya, sebagai berikut :
                                          </p>
                                          
                                          <table id="demo" class="table table-bordered">
                                            <thead>
                                              <tr>
                                                <th>No. Registrasi</th>
                                                <th>Tanggal</th>
                                                <th>Waktu</th>
                                                <th>Tempat</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              <tr>
                                                <td></td>
                                                <td>${registered.tanggal}</td>
                                                <td>${registered.jam}</td>
                                                <td>${registered.tempat}</td>
                                              </tr>
                                              
                                            </tbody>
                                          </table>                                          
                                  
                                          <br>
                                          <!-- <footer class="footer">Demo from https://jsfiddle.net/Purushoth/bor1nggb</footer> -->
                                  
                                        </div>
                                  
                                  
                                      </div>
                                    </div>
                                  </div>
                                  <br>    
                            
                            </body>
                                                        
                            </html>`
                          };
                          
                          mailgun.messages().send(data, function (error, body) {
                            console.log(body);
                          });
                        result.render('../views/back/show', {event: globalEvent, register: register});
                        
                    }}
                )
            })
            }
                else { //belum login
                    result.redirect('/');
                }
            }
            else { //sudah terdaftar
                var register = true;
                // result.render('../views/back/show', {event: globalEvent, register: register})
                
            } 
            })  
        };

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
            // res.send(newItem);
            res.redirect('/admin');
         
            
            //  })
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
      res.render("../views/front/pages/eventsUpdate", {events: event});
    });
  };

// PUT article API.
exports.edit = (req, res, next) => {
if (!req.params.id) return next(new Error('No article ID.'))
// req.collections.articles.updateById(req.params.id, {$set: req.body.article}, (error, count) => {

console.log('slamet sampe sini');
Events.updateById(req.params.id, req.body, (err, event) => {  
    
    if (err) {
        console.log(err);
        res.render("../views/front/pages/eventsUpdate", {events: event});
      }
      res.redirect("/admin");
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