"use strict";

var Q = require('q');
var _ = require('lodash');

(function (module) {


var Video = require('src/models/video');
var FB = require('src/services/fb');
var User = require('src/services/user');
var TWIT = require('src/services/twit');


module.pullFacebookMovies = function (user_id) {
    return User.getToken(user_id, 'facebook').then(function(token) {
        if (!token) {
            throw {
                type: 'token',
                source: 'facebook',
                message: 'access_token not found'
            };
        }
        
        return FB.getHome(
            token.token, 
            'app_2392950137', 
            'shares,likes.limit(0).summary(true)'
        );
    }).then(function (res) {
        if (res.error) {
            throw res.error;
        }
    	var promises = _.map(res.data, function (video) {
    		return Video.findOneAndUpdate(
            {user_id: user_id, id:video.id},
            {
                id: video.id,
    			user_id: user_id,
                source: 'facebook',
    			created_time: video.created_time,
    			shares: (video.shares)? video.shares.count : 0,
    			likes: (video.likes && video.likes.summary)? video.likes.summary.total_count : 0
    		},
            {upsert: true});
    	});
    	return Q.all(promises);
    });
};

module.pullTwitterMovies = function (user_id) {

    return User.getToken(user_id, 'twitter').then(function(token) {
        if (!token) {
            throw {
                type: 'token',
                source: 'twitter',
                message: 'access_token not found'
            };
        }
        return TWIT.getHome(token);
    }).then(function (res) {
        var data = res[0];
        var promises = _.map(data, function (video) {
            return Video.findOneAndUpdate(
            {user_id: user_id, id:video.id},
            {
                id: video.id,
                user_id: user_id,
                source: 'twitter',
                created_time: video.created_at,
                shares: video.retweet_count,
                likes: video.favorite_count
            },
            {upsert: true});
        });
        return Q.all(promises);
    });
};

module.pull = function (user_id, source) {
    var promise;
    switch(source) {
        case 'facebook':
            promise = module.pullFacebookMovies(user_id);
            break;
        case 'twitter':
            promise = module.pullTwitterMovies(user_id);
            break;
        default: 
            throw Error('unknown source ' + source);
    }
    return promise;
};

module.read = function (user_id, source) {
    return Video.find(
        {user_id: user_id, source: source}, 
        {_id: 0, __v: 0, user_id: 0});
};

})(module.exports);

