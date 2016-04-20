'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
const port = 3000;

server.connection({
  port: port
});

server.register([
  {
    register: require('inert')
  }
], function (err) {
  if (err) {
    throw err;
  }

  server.route([
    {
      method: 'GET',
      path: '/directory/{path*}',
      handler: {
        directory: {
          path: './'
        }
      }
    },
    {
      method: 'GET',
      path: '/',
      handler: function (req, reply) {
        reply('Hello World');
      }
    }
  ]);
});

server.start(function () {
  console.log('Now Visit: http://localhost:' + port);
});
