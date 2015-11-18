'use strict';

var redis = require('redis');
var client = redis.createClient();

module.exports = function(app, someSession) {
  var RedisStore = require('connect-redis')(someSession);
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
  app.use(someSession(sess));

  sess.cookie.httpOnly = false;

  app.get('/explicitly_set_httponly', function(req1, res1) {
    var mySess = req1.session;
    mySess.cookie.httpOnly = false;
    res1.send('Please check your cookie');
  });

  app.all('/fb_redirect', function(req2, res2, next) {
    console.log('Accessing the fb_redirect section');
    next();
  });

  app.post('/fb_redirect', function(req, res) {
    setTimeout(function() {
      res.redirect('http://www.facebook.com');
    }, 2000);
  });

  app.get('/fb_redirect', function(req, res) {
    res.send('You have to use post');
  });
};