var http = require('http'),
    express = require('express');

var app = express();

app.use(express.Router());

app.get('/hello/:username', function (req, res) {
    res.send('Hello ' + req.params['username']);
});

app.use(function (req, res, next) {
    console.log('404 Not Found');
    res.status(404);
    res.type('txt').send('Not found');
});

//Created Server
var server = http.createServer(app).listen(process.env.PORT || 8000);
console.log('Server running at http://localhost:8000/');

//console.log('listning on %s', listener.address().port);
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
