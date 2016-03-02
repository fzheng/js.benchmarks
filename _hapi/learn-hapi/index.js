'use strict';

const Hapi = require('hapi');
const Boom = require('boom');
const Joi = require('joi');
const theBcrypt = require('bcrypt');
const cryptiles = require('cryptiles');
const port = 3000;

const server = new Hapi.Server();
server.app.key = 'secret_app_value_102';
server.connection({
  port: port
});

server.register([
  {
    register: require('inert')
  },
  {
    register: require('hapi-auth-basic')
  },
  {
    register: require('hapi-auth-cookie')
  },
  {
    register: require('hapi-server-session'),
    options: {
      key: cryptiles.randomString(16),
      expiresIn: 100000,
      cookie: {
        isHttpOnly: true,
        isSecure: true
      }
    }
  },
  {
    register: require('./server/auth.js')
  },
  //{
  //  register: require('./server/base.js')
  //},
  //{
  //  register: require('./server/bcrypt.js')
  //},
  //{
  //  register: require('./server/inert.js')
  //}
], function (err) {
  if (err) {
    throw err;
  }
});

//server.state('data', {
//  ttl: null,
//  isSecure: true,
//  isHttpOnly: true,
//  encoding: 'base64json',
//  clearInvalid: false, // remove invalid cookies
//  strictHeader: true // don't allow violations of RFC 6265
//});

server.start(function () {
  console.log('Now Visit: http://localhost:' + port);
});

module.exports = server;
