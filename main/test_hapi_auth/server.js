'use strict';

const Hapi = require('hapi');
const Bcrypt = require('bcrypt');
const port = 3000;

let uuid = 1;       // Use seq instead of proper unique identifiers for demo only
let cache;          // Server cache

const users = {
  jane: {
    id: 'jane',
    password: '$2a$10$XPk.7lupEzBSHxUg/IavSuIKmwmpBbW0NfCL8q0ZfHXUPXTtbhmNK',   // 'password'
    name: 'Jane Doe'
    //revokingToken: 'd294b4b6-4d65-4ed8-808e-26954168ff48'
  }
};

const home = function (request, reply) {
  const sid = request.auth.artifacts.sid;
  cache.get(sid, function (err, cached) {
    let name = "";
    let points = "";
    if (cached) {
      console.log("Found session");
      name = cached.account.name;
      points = cached.account.points;
    }
    reply('<html><head><title>Login page</title></head><body><h3>Welcome ' +
          name +
          '!</h3><br>Points:' +
          points +
          '<br><br/><form method="get" action="/add">' +
          '<input type="submit" value="Add Points">' +
          '</form><br/><form method="get" action="/logout">' +
          '<input type="submit" value="Logout">' +
          '</form></body></html>');
  });
};

const login = function (request, reply) {
  let message = '';
  let account = null;

  console.log("login function " + request.auth.isAuthenticated);
  if (request.auth.isAuthenticated) {

    console.log("User isAuthenticated");
    return reply.redirect('/');
  }

  if (request.method === 'post') {
    if (!request.payload.username || !request.payload.password) {
      message = 'Missing username or password';
    } else {
      account = users[request.payload.username];
      if (account) {
        Bcrypt.compare(request.payload.password, account.password, function (err, isValid) {
          if (err || isValid === false) {
            request.auth.isAuthenticated = false;
            return displayLogin(reply, 'Invalid username or password')
          } else {
            console.log("Authenticating user");
            //Using cookie session
            account.points = 0;
            //request.cookieAuth.set(account);

            //Caching session
            const sid = String(++uuid);
            request.server.app.cache.set(sid, {account: account}, 0, (err) => {
              if (err) {
                reply(err);
              }
              request.cookieAuth.set({sid: sid});
              return reply.redirect('/');
            });
          }
        });
      } else {
        message = 'Invalid username or password';
      }
    }
    if (message !== '') {
      return displayLogin(reply, message);
    }
  }

  if (request.method === 'get') {
    return displayLogin(reply, '');
  }
};

const logout = function (request, reply) {
  request.server.app.cache.drop(request.auth.artifacts.sid);  //added to logout function to invalidate session server-side
  request.cookieAuth.clear();
  return reply.redirect('/');
};

const addPoints = function (request, reply) {
  //with cache session
  const sid = request.auth.artifacts.sid;
  cache.get(sid, (err, cached) => {
    if (cached) {
      console.log("Found session");
      cached.account.points++;

      request.server.app.cache.set(sid, {account: cached.account}, 0, (err) => {
        if (err) {
          reply(err);
        }
        return reply.redirect('/');
      });
    }
  });
};

function displayLogin (reply, message) {
  return reply('<html><head><title>Login page</title></head><body>' +
               (message ? '<h3>' + message + '</h3><br/>' : '') +
               '<form method="post" action="/login">' +
               'Username: <input type="text" name="username"><br>' +
               'Password: <input type="password" name="password"><br/>' +
               '<input type="submit" value="Login"></form></body></html>');
}

function validate (request, session, callback) {
  //with cache sessions
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


// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: port
});

server.register(require('custom-hapi-auth-cookie'), {redirectUrl: '/login2'}, function (err) {
  if (err) {
    throw err;
  }

  cache = server.cache({
    segment: 'sessions',
    expiresIn: 3 * 24 * 60 * 60 * 1000
  });
  server.app.cache = cache;

  server.auth.strategy('session', 'cookie', {
    password: 'v7ab7llbj8rsIGA6OqvMQKgAa7bZ7VPTcLOfLxDD', //password for encrypting cookie with Iron. Must be at least 32 chars
    cookie: 'sid-example',
    redirectTo: '/login',
    isSecure: false,
    validateFunc: validate
  });

  server.route([
    {
      method: 'GET',
      path: '/',
      config: {
        handler: home,
        auth: 'session'
      }
    },
    {
      method: [
        'GET',
        'POST'
      ],
      path: '/login',
      config: {
        handler: login,
        auth: {
          mode: 'try',
          strategy: 'session'
        },
        plugins: {
          'hapi-auth-cookie': {
            redirectTo: false
          }
        }
      }
    },
    {
      method: 'GET',
      path: '/logout',
      config: {
        handler: logout,
        auth: 'session'
      }
    },
    {
      method: 'GET',
      path: '/add',
      config: {
        handler: addPoints,
        auth: 'session'
      }
    }
  ]);

  server.start();
  console.log('Now Visit: http://localhost:' + port);
});