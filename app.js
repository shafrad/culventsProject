var express = require('express');
var fs = require('fs');
var ObjectId = require('mongodb').ObjectId
var fs = require('fs-extra')
   // Your mongodb or mLabs connection string
var multer = require('multer')
var util = require('util')
var upload = multer({limits: {fileSize: 2000000 },dest:'./public/images'});
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/myproject';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/myproject';


var index = require('./routes/index');
var users = require('./routes/users');
var authentication = require('./controller/authentication');
var loginController = require('./controller/loginController');
const api = require(path.join(__dirname, 'routes/api'))
const front = require(path.join(__dirname, 'routes/front'))
var Events = require('./models/events');


var app = express();
app.use(session({
    secret: '2C44-4D44-WppQ38',
    resave: true,
    saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', loginController);
app.get('/admin', api.article.list);
app.post('/admin/tambah', api.article.tambah);
app.get('/admin/update/:id', api.article.update);
app.post('/admin/edit/:id', api.article.edit);
app.post('/admin/delete/:id', api.article.del);
app.get('/users', front.data.list);
app.get('/users/1', front.data.show);
app.get('/users/show/:id', front.data.showById);
app.get('/users/registration/:id', front.data.registerByEmail);
app.get('/update/:id', (req,res) => {
  Events.findById(req.params.id, (err, data) => {
    if(err) {
      console.log(err)
      next()
    } else {
      data.update({kuota: parseInt(data.kuota) -1 }, (err, data) => {
        res.send(data)
      });
    }
  })
})
// app.get('/show/:id/register', front.data.confirm);

app.use('/', index);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
