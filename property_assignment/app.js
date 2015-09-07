var express = require('express'),
 http = require('http'),
 app = express(),
 bodyParser = require('body-parser');

 dbconnection = require('./dbconnection.js');

app.use(function(req,res,next) {
  req.tempStore = {};
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var routes = require('./routes/property');
app.use('/', routes);


app.use(function(req, res, next) {
  res.send(req.tempStore.data);
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


//Created Server
var server = http.createServer(app).listen(process.env.PORT || 3000);
console.log('Server running at http://localhost:3000/');

server.on('error', function (error) {
    switch (error.code) {
        case 'EADDRINUSE':
            console.error('Port is already in use');
            process.exit(1);
            break;
        default:
            console.log(error);
    }
});

module.exports = app;