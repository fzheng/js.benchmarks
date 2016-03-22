/***
 *
 * ROUTES : Bookmark
 *
 * @type {exports|module.exports}
 */


var Joi = require('joi');

var Bookmark = require('./bookmark.handler.js');

module.exports = [

    // Get single bookmark item
    {
        method: 'GET',
        path: '/bookmark/{id}',
        config: {
            tags: ['api','bookmark']
        },
        handler: Bookmark.findOne
    },

    // Delete a single bookmark item
    {
        method: 'DELETE',
        path: '/bookmark/{id}',
        config: {
            tags: ['api','bookmark']
        },
        handler: Bookmark.delete
    },

    // Get ALL bookmark items
    {
        method: 'GET',
        path: '/bookmarks',
        config: {
            tags: ['api','bookmark']
        },
        handler: Bookmark.find
    },


    // Get bookmark items by User ID
    {
        method: 'GET',
        path: '/bookmarks/{uid}',
        config: {
            tags: ['api','bookmark']
        },
        handler: Bookmark.findByUser
    },


    // Create a bookmark item
    {
        method: 'POST',
        path: '/bookmark',
        config: {
            tags: ['api','bookmark'],
            validate: {
                payload: {
                    uid: Joi.number().min(1).max(999999999).required(),
                    url: Joi.string().required(),
                    title: Joi.string().required()
                }
            }
        },

        handler: Bookmark.create
    }


];