'use strict';

const theBcrypt = require('bcrypt');
const Joi = require('joi');
let uuid = 1;
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

  const cache = server.cache({
    segment: 'sessions',
    expiresIn: 3 * 24 * 60 * 60 * 1000
  });
  server.app.cache = cache;

  server.auth.strategy('session', 'cookie', {
    password: 'password-should-be-32-characters',
    cookie: 'sid-example',
    redirectTo: '/login',
    isSecure: false,
    validateFunc: function (request, session, callback) {
      cache.get(session.sid, (err, cached) => {
        if (err) {
          return callback(err, false);
        }
        if (!cached) {
          return callback(null, false);
        }
        return callback(null, true, cached.account);
      });
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
    path: '/home',
    config: {
      handler: function (request, reply) {
        reply('<html><head><title>Login page</title></head><body><h3>Welcome ' +
              request.auth.credentials.name +
              '!</h3><br/><form method="get" action="/logout">' +
              '<input type="submit" value="Logout">' +
              '</form></body></html>');
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/directory/listing/{path*}',
    handler: {
      directory: {
        path: [
          './'
        ],
        listing: true // negative case
      }
    }
  });

  server.route({
    method: [
      'GET',
      'POST'
    ],
    path: '/login',
    config: {
      auth: {
        strategy: 'session',
        mode: 'try'
      },
      plugins: {
        'hapi-auth-cookie': {
          redirectTo: false
        }
      },
      handler: function (request, reply) {
        if (request.auth.isAuthenticated) {
          return reply.redirect('/home');
        }
        let message = '';
        let account = null;
        if (request.method === 'post') {
          if (!request.payload.username || !request.payload.password) {
            message = 'Missing username or password';
          } else {
            account = users[request.payload.username];
            if (!account || account.password !== request.payload.password) {
              message = 'Invalid username or password';
            }
            //if (!account || !theBcrypt.compareSync(request.payload.password, account.password)) {
            //  message = 'Invalid username or password';
            //}
          }
        }
        if (request.method === 'get' || message) {
          return reply('<html><head><title>Login page</title></head><body>' +
                       (message ? '<h3>' + message + '</h3><br/>' : '') +
                       '<form method="post" action="/login">' +
                       'Username: <input type="text" name="username"><br>' +
                       'Password: <input type="password" name="password"><br/>' +
                       '<input type="submit" value="Login"></form></body></html>');
        }

        const sid = String(++uuid);
        request.server.app.cache.set(sid, {account: account}, 0, (err) => {
          if (err) {
            reply(err);
          }
          request.cookieAuth.set({sid: sid});
          return reply.redirect('/home');
        });
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'auth'
};