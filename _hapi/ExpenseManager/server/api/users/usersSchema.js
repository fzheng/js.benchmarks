var _       = require('lodash')
  , Joi     = require('joi')
  , Promise = require('bluebird')
  , userSchema;

userSchema = Joi.object().keys({
  _id       : Joi.any(),
  username  : Joi.string().required().alphanum().label('Username'),
  password  : Joi.string().required().label('Password'),
  email     : Joi.string().required().email().label('Email'),
  name      : Joi.string().required().label('Name'),
  imageUrl  : Joi.string().label('Image URL'),
  authTokens: Joi.array().items(Joi.object({
    device: Joi.string().required(),
    token : Joi.string().required(),
  })),
});

exports.validate = function validate(user) {
  return new Promise(function (resolve, reject) {
    Joi.validate(user, userSchema, function (err, value) {
      if (err) { return reject(err); }
      resolve(value);
    });
  });
};

exports.toAuthJson = function toApiJson(user, deviceId) {
  user = user || {};
  var authToken = _.findWhere(user.authTokens, { device: deviceId });
  return _.extend(_.omit(user, '_id', 'password', 'authTokens'), {
    id   : user._id,
    token: authToken.token
  });
};

exports.toApiJson = function toApiJson(user) {
  return _.extend(_.omit(user, '_id', 'password', 'authTokens'), {
    id: user._id
  });
};
