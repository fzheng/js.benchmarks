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
    dummyParam: [{
      firstName: 'meimei',
      lastName: 'han'
    }],
    dummyFunc: function(x) {
      return x;
    },
    cookie: {
      httpOnly: false,
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

  sess.cookie.httpOnly = true;

  // also test open redirect 2
  app.get('/fb_redirect_2', function(req, res) {
    res.redirect(req.query.url);
  });

  app.get('/explicitly_set_httponly', function(req1, res1) {
    var mySess = req1.session;
    //mySess.cookie.httpOnly = false;
    res1.send('Please check your cookie');
  });

  app.all('/fb_redirect', function(req2, res2, next) {
    console.log('Accessing the fb_redirect section');
    next();
  });

  app.get('/taint_name', function(req, res) {
    var theName = req.query.name;
    const largeNumber = 10000000;
    var n = largeNumber * theName.length;
    while(n > 0) {n--;}
    setTimeout(function() {
      res.send(theName);
    }, 1000);
  });

  // also test open redirect
  app.get('/fb_redirect', function(req, resTrouble) {
    (function(happyRes) {
      var safeVal = req.query.referrer;
      setTimeout(function() {
        happyRes.redirect(301, safeVal);
      }, 2000);
    })(resTrouble);
  });

  // test fake open redirect
  app.get('/fake_redirect', function(req, res) {
    var fake = {};
    fake.redirect = function(x) {
      console.log(x);
      res.send('You are not going to anywhere');
    };
    fake.redirect(req.query.referrer);
  });
};