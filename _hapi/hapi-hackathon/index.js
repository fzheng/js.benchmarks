/**
* Dependencies.
*/

"use strict";

var _ = require('lodash');
var Hapi = require('hapi');

var constants = require('config/constants');

var mongoose = require('mongoose');
mongoose.connect(constants.database);
mongoose.connection.on('error', function(err) {
    console.error(err, constants.database); 
    console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});


// Create a new server
var server = new Hapi.Server();
// Setup the server with a host and port
server.connection({
    host: constants.application.host, 
    port: constants.application.port
});
// Export the server to be required elsewhere.
module.exports = server;

var path = require('path');

// Setup the views engine and folder
server.views({    
    engines: {
        html: require('handlebars')
    },
    isCached: false,
    relativeTo: path.join(__dirname, "server", "views"),
    path: '.',
    layoutPath: 'layouts',
    layout: 'layout',
    partialsPath: 'partials',
    helpersPath: 'helpers'
});

var plugins = require('server/plugins');
var cookie_conf = require('config/cookie');
plugins.auth_session(server, {
    password:  cookie_conf.password,
    cookie: cookie_conf.cookie_name,
    redirectTo: '/login',
    isSecure: false
});

plugins.oauth(server, [
    require('config/twitter'),
    require('config/facebook')
]);

var routes = require('src/routes');
_.forEach(routes, function (route, name) {
    console.log("register ", name);
    route(server);
});


/*
    Load all plugins and then start the server.
    First: community/npm plugins are loaded
    Second: project specific plugins are loaded
 */
server.register([
    {
        register: require('tv')
    },
    {
        register: require("good"),
        options: {
            opsInterval: 5000,
            reporters: [{
                reporter: require('good-console'),
                args:[{ ops: '0 *', request: '*', log: '*', response: '*', 'error': '*' }]
            }]
        }
    },   
    {
        register: require("hapi-named-routes")
    },
    {
        register: require("hapi-cache-buster")
    },
    {
        register: plugins.assets,
        options: require('server/assets')
    }
], function () {
    //Start the server
    server.start(function() {
        //Log to the console the host and port info
        console.log('Server started at: ' + server.info.uri);
    });
});
