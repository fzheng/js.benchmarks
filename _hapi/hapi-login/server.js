'use strict';

var Hapi = require('hapi');
var Good = require('good');
var path = require('path');
var Routes = require('./routes');
var Config = require('./config');
// var User = require('./models/user').User;

var publicPath = path.join(__dirname, 'public');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ port: Config.get('/server/port') });

server.views({
    engines: {
        jade: require('jade')
    },
    path: publicPath
});

// Register the plugin
server.register([
    { register: require('hapi-auth-cookie') },
    { register: require('hapi-context-credentials') }
    ], function (err) {
    if (err) {
        console.log("Hapi Auth Cookie Error:", err);
    }

    // Set our strategy
    server.auth.strategy('session', 'cookie', {
        password: 'thepursuitofhapiness', // cookie secret
        cookie: 'session', // Cookie name
        isSecure: false, // required for non-https applications
        ttl: 24* 60 * 60 * 1000 // Set session to 1 day
    });
});

// Print some information about the incoming request for debugging purposes
server.ext('onRequest', function (request, reply) {
    console.log(request.path, request.query);
    return reply.continue();
});

// Load the routes
server.route(Routes.endpoints);

// Good logging & Start the server
server.register({
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        }]
    }
}, function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
