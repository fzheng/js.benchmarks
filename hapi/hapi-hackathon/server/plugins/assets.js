"use strict";

// These are the public assets. Goal is to serve css, js, partials, images, or bower packages.
exports.register = function(server, options, next){
    
    server.route([
        {
            method: 'GET',
            path: '/partials/{path*}',
            config: {
                handler: {
                    directory: { path: './server/views/partials' }
                },
                id: 'partials'
            }
        },
        {
            method: 'GET',
            path: '/images/{path*}',
            config: {
                handler: {
                    directory: { path: './public/images' }
                },
                id: 'images'
            }
        },
        {
            method: 'GET',
            path: '/css/{path*}',
            config: {
                handler: {
                    directory: { path: './public/css' }
                },
                id: 'css'
            }
        },
        {
            method: 'GET',
            path: '/fonts/{path*}',
            config: {
                handler: {
                    directory: { path: './public/fonts' }
                },
                id: 'fonts'
            }
        },
        {
            method: 'GET',
            path: '/js/{path*}',
            config: {
                handler: {
                    directory: { path: './public/js' }
                },
                id: 'js'
            }
        },
        {
            method: 'GET',
            path: '/bower_components/{path*}',
            config: {
                handler: {
                    directory: { path: './public/bower_components' }
                },
                id: 'bower'
            }
        }
    ]);
    
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

            if(_.isEmpty(response.source.context.assets)){
                response.source.context.assets = {};
            }
            response.source.context.assets = options[environment];
        }
        return reply.continue();
    });
   
    next();
};

exports.register.attributes = {
    name: 'assets'
};