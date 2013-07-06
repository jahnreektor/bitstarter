var express = require('express');

var app = express.createServer(express.logger());
var fs = require('fs');
var indexContents = fs.readFileSync("index.html", 'utf-8');
/* OLD CODE
fs.readFile('index.html', 'utf8', function (err,data) {
  indexContents = data;
  console.log(data);
});

if (indexContents)
    console.log("data is " + indexContents);
else
    console.log("data doesn't exist outside of scope!");
*/
/*
app.get('/', function(request, response) {
    response.send(indexContents);
 });
*/
app.get('/', function(request, response) {
  response.send(indexContents);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
