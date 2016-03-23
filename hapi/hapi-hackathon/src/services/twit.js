"use strict";

var Twit = require('twit');
var Q = require('q');
var _ = require('lodash');

(function (module) {
var twitter_conf = require('config/twitter');

module.getHome = function (token) {
   var T = new Twit({
        consumer_key: twitter_conf.clientId,
        consumer_secret: twitter_conf.clientSecret,
        access_token: token.token,
        access_token_secret: token.secret
    });
  
  return Q.ninvoke(T, 'get', '/statuses/home_timeline', {
    trim_user: true,
    exclude_replies: true
  });
};

})(module.exports);