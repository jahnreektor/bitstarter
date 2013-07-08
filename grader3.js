#!/usr/bin/env node
/*
Automatically grade files for the presence of specified HTML tags/attributes.
Uses commander.js and cheerio. Teaches command line application development
and basic DOM parsing.

References:

 + cheerio
   - https://github.com/MatthewMueller/cheerio
   - http://encosia.com/cheerio-faster-windows-friendly-alternative-jsdom/
   - http://maxogden.com/scraping-with-node.html

 + commander.js
   - https://github.com/visionmedia/commander.js
   - http://tjholowaychuk.com/post/9103188408/commander-js-nodejs-command-line-interfaces-made-easy

 + JSON
   - http://en.wikipedia.org/wiki/JSON
   - https://developer.mozilla.org/en-US/docs/JSON
   - https://developer.mozilla.org/en-US/docs/JSON#JSON_in_Firefox_2
*/

var fs = require('fs');
var program = require('commander');
var cheerio = require('cheerio');
var HTMLFILE_DEFAULT = "index.html";
var CHECKSFILE_DEFAULT = "checks.json";
var rest = require('restler');

var assertFileExists = function(infile) {
    var instr = infile.toString();
    if(!fs.existsSync(instr)) {
        console.log("%s does not exist. Exiting.", instr);
        process.exit(1); // http://nodejs.org/api/process.html#process_process_exit_code
    }
    return instr;
};


var cheerioHtmlFile = function(htmlfile) {
    return cheerio.load(fs.readFileSync(htmlfile));
};

var loadChecks = function(checksfile) {
    return JSON.parse(fs.readFileSync(checksfile));
};

var checkHtmlFile = function(htmlfile, checksfile) {
    $ = cheerioHtmlFile(htmlfile);
    var checks = loadChecks(checksfile).sort();
    var out = {};
    for(var ii in checks) {
        var present = $(checks[ii]).length > 0;
        out[checks[ii]] = present;
    }
    return out;
};
var checkURLHtmlFile = function(htmlfile, checksfile) {
    $ = cheerio.load(htmlfile);
    var checks = loadChecks(checksfile).sort();
    var out = {};
    for(var ii in checks) {
        var present = $(checks[ii]).length > 0;
        out[checks[ii]] = present;
    }
    return out;
};

var clone = function(fn) {
    // Workaround for commander.js issue.
    // http://stackoverflow.com/a/6772648
    return fn.bind({});
};

var visitURL = function(url) {
    console.log("in visit");
    var response = rest.get(url).on('complete', function(result) {
	if (result instanceof Error) {
	    console.error('Error: ' + result.message);
	} else {
	    console.log("\n\n\n\n\n\nResult: " + result + "\n\n\n\nENDRESULTS");
    }});
    return response;
}

var searchStringInArray = function (str, strArray) {
        for (var j=0; j<strArray.length; j++) {
	            if (strArray[j].match(str)) return j;
	        }
        return -1;
    }

if(require.main == module) {
    program
        .option('-c, --checks <check_file>', 'Path to checks.json', clone(assertFileExists), CHECKSFILE_DEFAULT)
        .option('-f, --file <html_file>', 'Path to index.html', clone(assertFileExists), HTMLFILE_DEFAULT)
        .option('-u, --url <url_path>', 'The url')
        .parse(process.argv);
    console.log(process.argv);
    if (searchStringInArray("--url", process.argv)>0 || searchStringInArray("-u", process.argv)>0) {
	console.log("YOU ARE IN THE URL IF STATEMENT: " + program.url);
	rest.get(program.url).on('complete', function (result) {
	    var checkJson = checkURLHtmlFile(result,program.checks);
	    var outJson = JSON.stringify(checkJson,null,4)
	    console.log(outJson);
	});
    }
    else if (searchStringInArray("-f", process.argv)>0 || searchStringInArray("--file", process.argv)>0) {
	console.log("YOU ARE IN THE FILE IF STATEMENT: " + program.file);
	response = rest.get(program.url).on('complete', function (result) {
	    var checkJson = checkHtmlFile(program.file, program.checks);
	    var outJson = JSON.stringify(checkJson, null, 4);
	    console.log(outJson);
	});
    }
}
else {
    exports.checkHtmlFile = checkHtmlFile;
}
