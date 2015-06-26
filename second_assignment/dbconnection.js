// Retrieve
var MongoClient = require('mongoose');

// Connect to the db
MongoClient.connect("mongodb://localhost/db_demoapp", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});

module.exports = MongoClient.connection;