var createError = require('http-errors');
var express = require('express');
var cors = require('cors')


//import the express-fileupload library
var fileUpload = require("express-fileupload");

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/* create the router files to handle the valid incident api endpoint
and all bad URL requests */
var incidentRouter = require('./routes/incident');
var unknownRouter = require('./routes/404');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
//add the express-fileupload library to this express instance
app.use(fileUpload());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//map the incident router to the root path of this web service
app.use('/',incidentRouter)

//deal with any unknown URLs
app.use(function(req, res, next) {
  next(unknownRouter(req,res));
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
