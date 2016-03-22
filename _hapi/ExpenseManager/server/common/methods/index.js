var auth            = require('./auth')
  , err             = require('./err');

module.exports.init = function init(server) {
  server.method('auth.validateToken', auth.validateToken, { bind: server });
  server.method('createErrObject', err.createErrObject, { bind: server });
};
