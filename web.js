var express = require('express');

var app = express.createServer(express.logger());
var fs = require('fs');
var indexContents;
fs.readFile('index.html', 'utf8', function (err,data) {
    indexContents = console.log(data);

});


app.get('/', function(request, response) {
  response.send(indexContents);
});
/*
app.get('/', function(request, response) {
  response.send("test");
});*/


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
