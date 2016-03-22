var Joi                     = require('joi')
  , usersController         = require('../api/users/usersController')
  , sessionsController      = require('../api/sessions/sessionsController')
  , errorCodes              = require('../common/errorCodeRegistry')
  , routes;

routes = [
  {
    method : 'POST',
    path   : '/user/register',
    handler: usersController.create,
    config : {
      auth       : false,
      description: 'Register new user',
      tags       : ['api'],
      notes      : 'Returns a created user object',
      validate   : {
        options: {
          abortEarly: false,
        },
        headers: Joi.object({}).unknown(),
        payload: {
          username: Joi.string().required().alphanum().label('Username').description('Chosen username'),
          password: Joi.string().required().label('Password').description('Chosen password'),
          email   : Joi.string().required().email().label('Email').description('Email address'),
          name    : Joi.string().required().label('Name').description('Full name'),
          imageUrl: Joi.string().label('Image URL').description('Profile image URL'),
        },
        failAction: function (req, reply, source, error) {
          var details = { code: errorCodes.user.create.validationError, message: error.message };
          reply(req.server.methods.createErrObject(400, 'User could not be created', details, error));
        },
      },
    },
  },
  {
    method : 'POST',
    path   : '/user/login',
    handler: sessionsController.create,
    config : {
      auth       : false,
      description: 'User login',
      tags       : ['api'],
      notes      : 'Username or email as a login credential, needs to have a deviceId parameter passed with credentials.',
      validate   : {
        headers: Joi.object({
          deviceid: Joi.string().required().description('Unique ID of a device using the API'),
        }).unknown(),
        payload: {
          username: Joi.string().label('Username').description('User\'s username or email'),
          password: Joi.string().label('Password').description('User\'s password'),
        },
        failAction: function (req, reply, source, error) {
          var details = { code: errorCodes.user.login.invalidCredentials, message: error.message };
          return reply(req.server.methods.createErrObject(400, 'Login failed', details, error));
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/user/current',
    handler: usersController.getCurrent,
    config: {
      auth       : 'token',
      description: 'Get current authenticated user',
      tags       : ['api'],
      notes      : 'Finds the current user by the authentication token passed in headers',
      validate   : {
        headers: Joi.object({
          authorization: Joi.string().required().description('Contains access token. Format: token &lt;TokenValue&gt;'),
        }).unknown(),
        failAction: function (req, reply, source, error) {
          var details = { code: errorCodes.generic.requestValidationError, message: error.message };
          return reply(req.server.methods.createErrObject(400, error.message, details, error));
        },
      }
    }
  },
];

module.exports = routes;
