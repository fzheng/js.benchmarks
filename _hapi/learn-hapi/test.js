'use strict';

var Hapi = require('hapi');
var path = require('path');
var server = new Hapi.Server();

server.route({
  method: 'GET',
  path: '/photo2/{id*}',
  handler: function (request, reply) {
    reply(path.join('/photos', request.params.id));
  }
});