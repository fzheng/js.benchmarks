module.exports.init = function init(server) {
  var plugins = [{
    register: require('hapi-auth-bearer-token')
  },
  {
    register: require('hapi-authorization'),
    options: {
      roles: ['admin', 'user'],
    }
  }];

  server.register(plugins, function onAuthPluginsRegistered(err) {
    server.auth.strategy('token', 'bearer-access-token', {
      allowQueryToken     : false,
      tokenType           : 'token',
      validateFunc        : server.methods.auth.validateToken,
    });
  });
};
