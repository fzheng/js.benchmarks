'use strict';

const theBcrypt = require('bcrypt');
const Joi = require('joi');
const users = {
  john: {
    username: 'john',
    password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
    name: 'John Doe',
    id: '2133d32a'
  }
};

// Base routes for auth
exports.register = function (server, options, next) {
  server.auth.strategy('simple', 'basic', {
    validateFunc: function (request, username, password, callback) {
      const user = users[username];
      if (!user) {
        return callback(null, false);
      }
      //theBcrypt.compare(password, user.password, function (err, isValid) {
      //  callback(err, isValid, {
      //    id: user.id,
      //    name: user.name
      //  });
      //});
    }
  });

  server.route({
    method: 'GET',
    path: '/auth',
    config: {
      auth: 'simple',
      handler: function (request, reply) {
        reply('hello, ' + request.auth.credentials.name);
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/live',
    config: {
      auth: 'simple',
      handler: function (request, reply) {
        reply('Hello World');
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'auth'
};