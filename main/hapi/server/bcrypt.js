'use strict';

const theBcrypt = require('bcrypt');
const Joi = require('joi');

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  bcrypt cases >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.register = function (server, options, next) {
  server.route({
    method: 'POST',
    path: '/negative/bcrypt/1/{password*}',
    config: {
      validate: {
        params: {
          password: Joi.string().max(128).min(8).alphanum()
        }
      },
      handler: function (request, reply) {
        theBcrypt.hash(request.params.password, '$2a$10$somesaltyvaluertsetrse', null, function (err, hash) {
          if (err) {
            return reply(err);
          }
          reply(hash);
        });
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/negative/bcrypt/1/{password*}',
    config: {
      validate: {
        params: {
          password: Joi.string().max(128).min(8).alphanum()
        }
      },
      handler: function (request, reply) {
        reply(theBcrypt.hashSync(request.params.password, request.params.hash));
      }
    }
  });


  next();
};

exports.register.attributes = {
  name: 'bcrypt.test'
};