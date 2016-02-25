'use strict';

const theBcrypt = require('bcrypt');
const Joi = require('joi');
const path = require('path');

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
        reply(theBcrypt.hashSync(request.params.password, '$2a$10$sdfasdf23fsdfsdfasdfaa') +
              theBcrypt.hashSync(request.params.secret, '$2a$10$xczxcvcxdfsdfasdfaasdfasdfsadbcxb'));
      }
    }
  });

  server.route({
    method: [
      'GET',
      'POST'
    ],
    path: '/{name*}',
    config: {
      // validate will ensure YOURNAME is valid before replying to your request
      validate: {
        params: {
          name: Joi.string().max(40).min(2).alphanum()
        }
      },
      handler: function (request, reply) {
        reply('Hi ' + request.params.name + '!');
      }
    }
  });

  server.route({
    method: 'DELETE',
    path: '/{name*}',
    config: {
      // validate will ensure YOURNAME is valid before replying to your request
      validate: {
        params: {
          name: Joi.string().max(40).min(2).alphanum()
        }
      },
      handler: function (request, reply) {
        reply('Goodbye ' + request.params.name + '!');
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/photo/{id*}',
    config: {
      // validate will ensure YOURNAME is valid before replying to your request
      validate: {
        params: {
          id: Joi.string().max(40).min(2).alphanum()
        }
      }
    },
    handler: function (request, reply) {
      // until we implement authentication we are simply returning a 401:
      reply(Boom.unauthorized('Please log-in to see that'));
    }
  });

  server.route([
    {
      method: 'GET',
      path: '/route/num/2',
      handler: function (request, reply) {
        return reply('ok 2');
      }
    },
    {
      method: 'GET',
      path: '/route/num/{id*}',
      config: {
        validate: {
          params: {
            id: Joi.string().max(10).min(3).alphanum()
          }
        }
      },
      handler: function (request, reply) {
        return reply('ok 1');
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'base'
};