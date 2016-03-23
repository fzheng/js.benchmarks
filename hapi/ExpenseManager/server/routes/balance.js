var Joi               = require('joi')
  , errorCodes        = require('../common/errorCodeRegistry')
  , balanceController = require('../api/balance/balanceController')
  , routes;

routes = [
{
  method  : 'GET',
  path   : '/balance',
  handler: balanceController.getAllBalance,
  config : {
      auth       : false,
      description: 'Gets list of all incoming transactions',
      tags       : ['api'],
      notes      : 'Returns a list of all incoming transactions',
      validate   : {
        headers: Joi.object({
          authorization: Joi.string().required().description('Contains access token. Format: token &lt;TokenValue&gt;'),
        }).unknown(),
        query : {
          userId : Joi.string().required().description('Id of the user whose balance we are requesting')
        },
        failAction: function (req, reply, source, error) {
          var details = { code: errorCodes.balance.index.invalidQueryParams, message: error.message };
          reply(req.server.methods.createErrObject(400, error.message, details, error));
        }
      }
  }
}
];

module.exports = routes;
