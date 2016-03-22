"use strict";

var constants = require('src/config/constants');

var mongoose = require('mongoose');
mongoose.connect(constants.database);
mongoose.connection.on('error', function(err) {
    console.error(err, constants.database); 
    console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});


var User = require('./src/dao/user');

// create a new user
var newUser = User({
  username: 'admin',
  password: '123456',
  admin: true
});

newUser.save(function(err) {
	console.log(err);
});

// Base routes for default index/root path, about page, 404 error pages, and others..
"use strict";

var User = require('src/dao/user');
var FB   = require('fb');
var config = require('src/config/facebook');

FB.options({
    appId:          config.facebook.appId,
    appSecret:      config.facebook.appSecret,
    redirectUri:    config.facebook.redirectUri
});

var login = function (request, reply) {

    if (request.auth.isAuthenticated) {
        return reply.redirect('/');
    }

    return reply.redirect(FB.getLoginUrl({ scope: 'user_about_me,email,read_stream' }));

    /*if (request.method === 'post') {
        User.login(request.payload, function (err, message, user) {
            if (err) {
                return reply(500, err);
            }
            if (message) {
                return reply.view("login", {
                    message: message
                });
            }
            request.auth.session.set(user);
            reply.redirect('/');
        });
    } else {
        reply.view('login', {message: ''});
    }*/
};

var Video = require('src/dao/video');
var Q = require('q');
var _ = require('lodash');
var FacebookGraphAPI = Q.denodeify(FB.napi);

var loginCallback = function (request, reply) {
    if (request.query.error) {
        // user might have disallowed the app
        return reply('login-error ' + request.query.error_description).code(400);
    }
    var code = request.query.code;
    if (!code) {
        // 
        return reply.redirect('/');
    }
    
    FacebookGraphAPI('oauth/access_token', {
        client_id:      FB.options('appId'),
        client_secret:  FB.options('appSecret'),
        redirect_uri:   FB.options('redirectUri'),
        code:           code
    }).then(function (result) {

        var access_token = result.access_token;



        return FacebookGraphAPI('/me', {access_token: access_token})
        .then(function (profile) {
            FB.napi('/me/home', {access_token: access_token, filter: 'app_2392950137'}, function (err, data) {
                if (err) {
                    return;
                }

                _.forEach(data.data, function(v) {
                    v.user = profile.id;
                    Video(v).save();
                });          
            });
            return Q.ninvoke(User, 'FacebookLogin', profile, access_token);
        });
    }).then(function (user) {
        if (!user) {
            throw new Error("cannot save user to mongodb ");
        }
        request.auth.session.set(user);
    })
    .done(function(err) {
        if (err) {
            console.log(err);
            reply().code(500);
        } else {
            reply.redirect('/');
        }
        
    });
};

var logout = function (request, reply) {

    request.auth.session.clear();
    return reply.redirect('/');
};

var home = function (request, reply) {
    
    var user = request.auth.credentials;
    if (!user || !user.facebook) {
        return reply("please link facebook");
    } 

    Video.find({'user': user.facebook.id}, function (err, videos) {
        reply.view('index', {
            title: 'Your Videos',
            videos: videos
        });
    });    
};