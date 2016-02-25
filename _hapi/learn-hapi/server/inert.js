'use strict';

const theBcrypt = require('bcrypt');
const Joi = require('joi');

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

  next();
};

exports.register.attributes = {
  name: 'inert.test'
};