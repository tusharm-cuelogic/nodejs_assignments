var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

var envHandler = require('./envhandler');

var dbdbconnection = require('./dbconnection.js')

/*call the enviornment handler depending on the process.argv*/
var enviornment = envHandler.enviornmentHandler();
app.set('env', enviornment);

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(session({secret: 'ABCDE1234567890'}));

app.use(function(req,res,next) {
	req.tempStore = {};
	next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Define file
var routes = require('./routes/user'),
	routeBlog = require('./routes/blog.js');

app.use('/', routes);
app.use('/blog', routeBlog);

app.use(function(req, res, next) {
	res.send(req.tempStore.data);
	next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;