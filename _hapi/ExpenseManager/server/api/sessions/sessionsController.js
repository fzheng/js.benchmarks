var _            = require('lodash')
  , boom         = require('boom')
  , usersManager = require('../users/usersManager')
  , usersSchema  = require('../users/usersSchema');


module.exports.create = function login(req, reply) {
  var headers = req.headers || {}
    , payload = req.payload || {};

  usersManager.authenticate(payload.username, payload.password)
    .then(function (user) {
      return usersManager.verifyOrCreateAuthToken(user, headers.deviceid);
    })
    .then(function (user) {
      reply(usersSchema.toAuthJson(user, headers.deviceid));
    })
    .catch(function (err) {
      reply(boom.create(401, 'Login failed', err));
    });
};
