/***
 *
 * API ROUTES
 *
 * @file Provides a collection of all the routes used within the API.
 *
 */

// Include your component route file here
var Auth = require('./components/auth/auth.route.js');
var Bookmark = require('./components/bookmark/bookmark.route.js');
var User = require('./components/user/user.route.js');


// Add your variable to the export list...
module.exports = [].concat(

    Bookmark,
    User,
    Auth

);