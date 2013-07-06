var express = require('express');

var app = express.createServer(express.logger());


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

app.get('/', function(request, response) {
var fs = require('fs');
var buffer = new buffer ();
  response.send(buffer.toString('utc 8', fs.readFileSync("index.html")))});
 });


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
