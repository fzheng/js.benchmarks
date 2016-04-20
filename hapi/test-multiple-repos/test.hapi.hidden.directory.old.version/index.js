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
          path: './',
          showHidden: true
        }
      }
    },
    {
      method: 'GET',
      path: '/',
      handler: function (req, reply) {
        reply('Aloha!');
      }
    }
  ]);
});

server.start(function () {
  console.log('Now Visit: http://localhost:' + port);
});
