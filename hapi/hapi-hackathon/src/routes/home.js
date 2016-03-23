
// Base routes for default index/root path, about page, 404 error pages, and others..
"use strict";

var home = function (request, reply) {
    reply.view('index', {
        title: 'Homepage'
    });
};

module.exports = function(server, options){
    server.route([
        {
            method: 'GET',
            path: '/about',
            config: {
                handler: function(request, reply){
                    reply.view('about', {
                        title: 'About this app'
                    });
                },
                id: 'about'
            }
        },
        {
            method: 'GET',
            path: '/',
            config: {
                handler: home,
                id: 'index',
                auth: {
                    mode: 'try',
                    strategy: 'session'
                },
                plugins: {
                    'hapi-auth-cookie': {
                        redirectTo: false
                    }
                }
            }
        },        
        {
            method: 'GET',
            path: '/{path*}',
            config: {
                handler: function(request, reply){
                    reply.view('404', {
                        title: '404 Page'
                    }).code(404);
                },
                id: '404'
            }
        }
    ]);
};
