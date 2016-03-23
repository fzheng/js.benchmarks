"use strict";

var FB = require('fb');
var Q = require('q');
var _ = require('lodash');
var FacebookGraphAPI = Q.denodeify(FB.napi);

(function (module) {
_.extend(module, FB);
var fb_config = require('config/facebook');
FB.options(fb_config);

module.getProfile = function (code) {
    return FacebookGraphAPI('oauth/access_token', {
    	client_id:      FB.options('appId'),
        client_secret:  FB.options('appSecret'),
        redirect_uri:   FB.options('redirectUri'),
        code: code
    }).then(function (result) {
    	console.log(result);
        var access_token = result.access_token;
        return FacebookGraphAPI('/me', {access_token: access_token}).then(function (profile) {
            return {
                profile: profile,
                access_token: access_token
            };
        });
    });
};

module.getHome = function (access_token, filter, fields) {
   return FacebookGraphAPI('/me/home', {
    access_token: access_token,
    filter: filter,
    fields: fields
   });
};

})(module.exports);