/***
 *
 * API (main)
 *
 * @author : @aat-labs
 *
 * @file The main application file for the REST API
 *
 * @see API/documentation for API documentation & confluence
 *
 * @type {exports|module.exports}
 *
 *
 */


var Hapi = require('hapi'),
    Routes = require('./routes'),
    Inert = require('inert'),
    Vision = require('vision'),
    HapiSwagger = require('hapi-swagger'),
    User = require('./components/user/user.handler.js'),
    Pack = require('./package');


// Create server instance
var server = new Hapi.Server();

// Set ports and enable CORS
server.connection({
    port: process.env.PORT || 3000,
    routes: {cors: true}
});


// API Documentation
var swaggerOptions = {
    apiVersion: Pack.version
};


// AUTH : bring your own validation function
var validate = function (decoded, request, callback) {

    // Decode the provided token and do a database lookup on the UUID
    var userExists = function () {

        // Check the user exists
        if (User.findByUserUuid(decoded.uuid)) {
            return true;
        } else {
            return false;
        }
    };

    // Debug
    console.log(decoded);

    // Do your checks to see if the person is valid from the JWT
    if (userExists === false) {
        return callback(null, false);
    }
    else {
        return callback(null, true);
    }


};

// AUTH : JWT Setup for HAPI
server.register(require('hapi-auth-jwt2'), function (err) {

    if (err) {
        console.log(err);
    }

    server.auth.strategy('jwt', 'jwt',
        {
            key: '981u2981i23ghk1jh23v12o83ukbhj12m',          // Never Share your secret key
            validateFunc: validate,            // validate function defined above
            verifyOptions: {algorithms: ['HS256']} // pick a strong algorithm
        });

    server.auth.default('jwt');

    // AS TEST
    server.route([

        {
            method: 'GET', path: '/restricted', config: {auth: 'jwt'},
            handler: function (request, reply) {
                reply({text: 'You used a Token!'})
                    .header("Authorization", request.headers.authorization);
            }
        }
    ]);
});


// ROUTES (define generic + for load balancer health checks)
server.route({
    method: 'GET',
    path: '/ping',
    config: {auth: false},
    handler: function (request, reply) {
        reply('pong');
    }
});

server.route({
    method: 'GET',
    config: {auth: false},
    path: '/',
    handler: function (request, reply) {
        reply(Pack.version);
    }
});

// Load API routes from the Component modules
server.route(Routes);


// Setup server
server.register([
    Inert,
    Vision,
    {
        register: HapiSwagger,
        options: swaggerOptions
    }], function (err) {

    // Start the API app/server
    server.start(function () {
        // Add any server.route() config here
        console.log('Server running at:', server.info.uri);
    });
});


