"use strict";

function authCookie(server, options) {


    server.register(require('hapi-auth-cookie'), function (err) {

        server.auth.strategy('session', 'cookie', {
            password: options.password,
            cookie: options.cookie,
            redirectTo: options.redirectTo,
            isSecure: options.isSecure
        });
    });

    var environment = process.env.NODE_ENV || 'development';
    var _ = require('lodash');

    // Hook onto the 'onPostHandler'
    server.ext('onPostHandler', function (request, reply) {
        // Get the response object
        var response = request.response;

        // Check to see if the response is a view
        if (response.variety === 'view') {

            if(_.isEmpty(response.source.context)){
                response.source.context = {};
            }
            
            response.source.context.__me = request.auth.credentials;
            // console.log(response.source.context);
        }
        return reply.continue();
    });
}

module.exports = authCookie;