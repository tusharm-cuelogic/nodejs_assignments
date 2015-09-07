var mysql      = require('mysql');
var Mysqlconnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'node_assignment'
});


Mysqlconnection.connect(function(err) {
    if (err) {
    console.error('error connecting: ' + err.stack);
    return;
}});

module.exports = Mysqlconnection;