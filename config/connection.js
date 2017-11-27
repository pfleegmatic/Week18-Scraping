// require mongoose
var mongoose = require('mongoose');

// Add require bluebird as promise because mongoose promises are deprecated
// still had error when running program
var Promise = require('bluebird');
mongoose.Promise = Promise;

// make the connection
mongoose.connect("mongodb://localhost/scraping" {
	useMongoClient: true
});
var db = mongoose.connection;

// check for error
db.on("error", function (error) {
    console.log("database error: ", err);
});

// confirm connection
db.once("open", function () {
    console.log("Mongoose connected");
});



//http://mongoosejs.com/docs/connections.html#use-mongo-client
// // Using `mongoose.connect`...
// var promise = mongoose.connect('mongodb://localhost/scraping', {
//   useMongoClient: true,
//    other options 
// });


// // Or, if you already have a connection
// connection.openUri('mongodb://localhost/scraping', { /* options */ });




// export the database
module.exports = db;