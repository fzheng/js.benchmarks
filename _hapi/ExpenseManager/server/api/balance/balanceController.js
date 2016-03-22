var boom         = require('boom')
  , balanceManager = require('./balanceManager')
  , balanceSchema  = require('./balanceSchema');


module.exports.getAllBalance = function getAllBalance(req, reply) {
  var userId = req.query.userId;
  balanceManager.findAllBalance(userId)
    .then(balanceSchema.toApiJson)
    .then(reply)
    .catch(function (err) {
      reply(req.server.methods.createErrObject(400, err.message, err));
    });
};
