// Base routes for default index/root path, about page, 404 error pages, and others..
"use strict";

var authController = require('src/controllers/auth');

module.exports = function(server, options){
    server.route([
        {
            method: 'GET',
            path: '/login',
            config: {
                handler: authController.getLogin
            }
        },
        {
            method: 'POST',
            path: '/login',
            config: {
                handler: authController.postLogin,
                auth: {
                    mode: 'try',
                    strategy: 'session'
                },
                plugins: {
                    'hapi-auth-cookie': {
                        redirectTo: false
                    }
                },
                payload: {
                    parse: true
                }
            }
        },
        {
            method: 'GET',
            path: '/logout',
            config: {
                handler: authController.logout
            }
        },
        {
            method: 'GET',
            path: '/auth/facebook',
            config: {
                auth: 'facebook',
                handler: authController.oauth
            }
        },
        {
            method: 'GET',
            path: '/auth/twitter',
            config: {
                auth: 'twitter',
                handler: authController.oauth
            }
        }
    ]);
};
