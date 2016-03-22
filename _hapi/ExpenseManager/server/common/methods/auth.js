var _            = require('lodash')
  , usersManager = require('../../api/users/usersManager')
  , errorCodes   = require('../errorCodeRegistry');

module.exports.validateToken = function validateToken(token, next) {
  var server = this;
  usersManager.findByToken(token)
    .then(function (user) {
      var userRole = _.contains(['devendra', 'shamsher', 'pranay'], user.username) ? 'admin' : 'user';
      next(null, true, { token: token, role: userRole, userId: user._id });
    })
    .catch(function (err) {
      var details = { code: errorCodes.auth.invalidAuthToken, message: err.message };
      next(server.methods.createErrObject(401, err.message, details), false, { token: token });
    });
};
