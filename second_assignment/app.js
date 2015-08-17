var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var envHandler = require('./envhandler');

/*call the enviornment handler depending on the process.argv*/
var enviornment = envHandler.enviornmentHandler();
app.set('env', enviornment);


//app.use(session({secret: 'ABCDE1234567890'}));

app.use(function(req,res,next) {
	req.tempStore = {};
	next();
});

app.use(bodyParser.json());
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