var _          = require('lodash')
  , boom       = require('boom')
  , errorCodes = require('../errorCodeRegistry');

module.exports.createErrObject = function createErrObject(errCode, message, details, err) {
  var boomError;
  if (_.isEmpty(details) || !details.code || !details.message) {
    details = {
      code   : errorCodes.unspecifiedError,
      message: 'Unspecified error'
    };
  }

  err       = err || {};
  boomError = err.isBoom ? err : boom.create(errCode, message, details);
  boomError.output.payload.details = details;
  return boomError;
};
