var fs = require('fs');
fs.readFile('index.html', 'utf8', function (err,data) {
    console.log(data);

});
