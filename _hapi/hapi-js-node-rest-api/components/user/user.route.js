/***
 *
 * ROUTES : User
 *
 * @type {exports|module.exports}
 */

var User = require('./user.handler.js');

module.exports = [


    // Get All Users
    {
        method: 'GET',
        path: '/users',
        config: {
            tags: ['api' , 'user'],
            auth: 'jwt'
        },
        handler: User.find
    },

    // Get User by Id (UUID)
    {
        method: 'GET',
        path: '/user/{id}',
        config: {
            tags: ['api' , 'user'],
            auth: 'jwt'
        },
        handler: User.findOne
    },

    // Delete User by Id
    {
        method: 'DELETE',
        path: '/user/{uid}',
        config: {
            tags: ['api' , 'user'],
            auth: 'jwt'
        },
        handler: User.deleteById
    },

    // Create a User
    {
        method: 'POST',
        path: '/user',
        config: {
            tags: ['api' , 'user'],
            auth: 'jwt'
        },
        handler: User.create
    }


];