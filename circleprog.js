#!/usr/bin/env node
var circle = require('./circle.js');


if (require.main==module) {
    var myCirc = new Circle(1,1,1);
    console.log(circle);
}
