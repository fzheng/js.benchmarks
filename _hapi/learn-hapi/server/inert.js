'use strict';

const theBcrypt = require('bcrypt');
const Joi = require('joi');
const Path = require('path');

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  inert cases >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.register = function (server, options, next) {
  server.route({
    method: 'GET',
    path: '/document1/{user}/{file}',
    handler: function (request, reply) {
      reply.file(path.join(request.params.user, request.params.file));
    }
  });

  server.route({
    method: 'GET',
    path: '/document2/{file}',
    handler: function (request, reply) {
      reply.file(request.params.file);
    }
  });

  server.route({
    method: 'GET',
    path: '/document3/{user}/{file}',
    handler: {
      file: function (request) {
        return path.join(request.params.user, request.params.file);
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/document4/{name}',
    handler: {
      file: function (request) {
        return request.params.name;
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/directory/{path*}',
    handler: {
      directory: {
        path: './',
        listing: true // negative 2
      }
    }
  });

  server.route([{
    method: 'POST',
    path: '/multiple/{path*}',
    handler: {
      directory: {
        path: [
          './',
          '../'
        ],
        listing: true // negative case
      }
    }
  }, {
    method: 'GET',
    path: '/test/{path*}',
    config: {
      handler: {
        directory: {
          path: Path.join('.', 'directory'),
          index: false,
          listing: false // good
        }
      }
    }
  }]);

  next();
};

exports.register.attributes = {
  name: 'inert.test'
};