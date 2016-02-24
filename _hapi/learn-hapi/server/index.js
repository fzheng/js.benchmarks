'use strict';

var theBcrypt = require('bcrypt');
var Joi = require('joi');

// Base routes for default index/root path, about page, 404 error pages, and others..
exports.register = function (server, options, next) {
  server.route({
    method: 'POST',
    path: '/negative/bcrypt/2/{password*}',
    config: {
      validate: {
        params: {
          password: Joi.string().max(128).min(8).alphanum()
        }
      },
      handler: function (request, reply) {
        reply(theBcrypt.hashSync(request.params.password, 'Hello World') +
              theBcrypt.hashSync(request.params.secret, 3.1415926));
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'base'
};