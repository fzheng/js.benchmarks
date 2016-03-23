"use strict";
var bower_components = require('./bower_components');

function getBowerComponentLink(file) {
    return '/bower_components' + file;
}


function getDevelopment() {
    var js = [];
    var css = [
        '/css/main.css'
    ];

    js = js.concat(bower_components.js.map(getBowerComponentLink));
    // css = bower_components.css.map(getBowerComponentLink).concat(css);
            

    var development = {
        js: js,
        css: css
    };
    return development;
}

function getProduction() {
    var production = {
        js: ['js/scripts.js'],
        css: ['css/styles.css']
    };
    return production;
}


module.exports = {
    development: getDevelopment(),
    production: getProduction()
};