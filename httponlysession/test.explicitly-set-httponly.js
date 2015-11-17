'use strict';

var redis = require('redis');
var client = redis.createClient();

module.exports = function(app, session) {
  var RedisStore = require('connect-redis')(session);
  var sess = {
    secret:"s3Cur3",
    key: "sessionId",
    resave: true,
    saveUninitialized: true,
    cookie: {
      domain: 'test.feng.com',
      path: '/explicitly_set_httponly'
    },
    store: new RedisStore({
      client: client,
      host: "127.0.0.1",
      port: "6379"
    })
  };
  app.use(session(sess));

  sess.cookie.httpOnly = false;

  app.get('/explicitly_set_httponly', function(req, res) {
    var mySess = req.session;
    mySess.cookie.httpOnly = true;
    res.send('Please check your cookie');
  });

  app.all('/fb_redirect', function(req, res2, next) {
    console.log('Accessing the fb_redirect section');
    next();
  });

  app.post('/fb_redirect', function(req, res1) {
    setTimeout(function() {
      res1.redirect('http://www.facebook.com');
    }, 2000);
  });
};