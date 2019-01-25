//Import the mongoose module
let mongoose = require("mongoose");

//Set up default mongoose connection
let mongoDB = "mongodb://127.0.0.1/miniproject";
const options = { useMongoClient: true};
// Get Mongoose to use the global promise library
mongoose.Promise = require("bluebird");

mongoose.connect(mongoDB, options);
//Get the default connection
let db = mongoose.connection;

/*eslint-disable */
//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
/*eslint-enable */

module.exports = db;