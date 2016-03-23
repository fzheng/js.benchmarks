"use strict";

var User = require('src/models/user');
var UserService = require('src/services/user');

(function(module){
module.getLogin = function (request, reply) {

    if (request.auth.isAuthenticated) {
        return reply.redirect('/');
    }

    reply.view('account/login', {message: ''});
};

module.postLogin = function (request, reply) {
    if (request.auth.isAuthenticated) {
        return reply.redirect('/');
    }
    

    delete request.payload._csrf;
    User.login(request.payload, function (err, message, user) {
        if (err) {
            return reply(500, err);
        }
        if (message) {
            return reply.view("account/login", {
                message: message
            });
        }
        request.auth.session.set(user);
        reply.redirect('/');
    });
};

module.logout = function (request, reply) {
    request.auth.session.clear();
    return reply.redirect('/');
}; 

var cookie_conf = require('config/cookie');

module.oauth = function (request, reply) {
    var user = request.state[cookie_conf.cookie_name] || {};
    UserService.oauth(request.auth.credentials, user.email).then(function (user) {        
        request.auth.session.set(user);
    })
    .done(function() {
        reply.redirect('/');
    }, function (err) {
        console.log(err);
        reply().code(500);
    });
};

})(module.exports);

