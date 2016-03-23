/***
 *
 * ROUTES : Auth
 *
 * @type {exports|module.exports}
 */

var auth = require('./auth.handler.js');


module.exports = [


    // Auth the request payload as a user
    {
        method: 'POST',
        path: '/auth',
        config: {
            tags: ['api', 'auth'],
            auth: false
        },
        handler: auth.validate
    },

    // Auth the request payload as a user
    {
        method: 'GET',
        path: '/me',
        config: {
            tags: ['api', 'auth'],
            auth: 'jwt'
        },
        handler: auth.me
    },

    // Remove any tokens from the User sessions
    {
        method: 'POST',
        path: '/logout',
        config: {
            tags: ['api', 'auth'],
            auth: false
        },
        handler: auth.logout
    },


];