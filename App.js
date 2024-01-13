// init project
var express = require('express');
var app = express();
// Enable serverless. This module allows you to 'wrap' your API for serverless use
const serverless = require('serverless-http');
// Enable use of environment variables
require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// // Date parser middleware
// app.use(Date());

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// the project endpoint... 
app.get("/api/:date", function (req, res) {
  // Test to check if the date is a valid date
  if (new Date(req.params.date) == "Invalid Date") {
    // The date maybe a unix timestamp, this is to test whether it is a unix stamp
    if (new Date(Number(req.params.date)) == "Invalid Date") {
    res.json({error: "Invalid Date"});}
   else {
     res.json({"unix": Number(req.params.date), "utc": new Date(Number(req.params.date)).toUTCString()})} }else {
  var date = new Date(req.params.date)
  res.json({"unix": Date.parse(req.params.date), "utc": date.toUTCString()})}
  });

// Request with no parameter returns the current datetime 
app.get("/api", function (req, res) {
  res.json({unix: Date.now(), utc: new Date().toUTCString()});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// Convert app to serverless; exporting handler allows lambda to call it
module.exports.handler = serverless(app);

// Export app as a module
module.exports = app;