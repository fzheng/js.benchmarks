"use strict";

(function () {

var Bell = require('bell');
var _ = require('lodash');

function oauth(server, options) {
    var provider = options.provider;
    server.auth.strategy(provider, 'bell', {
        provider: provider,
        password: options.password,
        isSecure: false,
        scope: options.scope,
        // Make sure to set a "Callback URL" and
        // check the "Allow this application to be used to Sign in with Twitter"
        // on the "Settings" tab in your Twitter application
        clientId: options.clientId,                               // Set client id
        clientSecret: options.clientSecret                            // Set client secret
    });
}

module.exports = function (server, providers) {
    server.register(Bell, function (err) {
        _.forEach(providers, function (p) {
            oauth(server, p);
        });
    });   
};

})();
