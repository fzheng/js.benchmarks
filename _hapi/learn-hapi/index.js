'use strict';

// Start this app from your command line with: node hellovalidate.js
// then visit: http://localhost:3000/YOURNAME

var Hapi = require('hapi');
var path = require('path');
var Boom = require('boom');
var Joi = require('joi');
var port = 3000; // process.env.PORT || 3000; // allow port to be set by environment

var server = new Hapi.Server();
server.app.key = 'secret_app_value_102';
server.connection({
  port: port
});

const web = server.connection({
  port: 8000,
  host: 'example.com',
  labels: ['web']
});

const admin = server.connection({
  port: 8001,
  host: 'example.com',
  labels: ['admin']
});

server.state('data', {
  ttl: null,
  isSecure: true,
  isHttpOnly: true,
  encoding: 'base64json',
  clearInvalid: false, // remove invalid cookies
  strictHeader: true // don't allow violations of RFC 6265
});

server.register([
  {
    register: require('inert')
  },
  {
    register: require('hapi-server-session'),
    options: {
      cookie: {
        isHttpOnly: false,
        isSecure: false
      }
    }
  }
], function (err) {
  if (err) {
    throw err;
  }

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
});

server.start(function () {
  console.log('Now Visit: http://localhost:' + port + '/{YOURNAME}');
});

module.exports = server;
