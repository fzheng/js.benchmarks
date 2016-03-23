var boom         = require('boom')
  , usersManager = require('./usersManager')
  , usersSchema  = require('./usersSchema');


module.exports.create = function register(req, reply) {
  var attrs = req.payload;
  usersManager.createUser(attrs)
    .then(usersSchema.toApiJson)
    .then(reply)
    .catch(function (err) {
      reply(req.server.methods.createErrObject(400, 'User could not be created', err));
    });
};


module.exports.getCurrent = function getCurrent(req, reply) {
  usersManager.findByToken(req.auth.credentials.token)
    .then(usersSchema.toApiJson)
    .then(reply)
    .catch(function (err) {
      reply(req.server.methods.createErrObject(400, err.message, err));
    });
};
