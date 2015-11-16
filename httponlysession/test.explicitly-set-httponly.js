'use strict';

module.exports = function(app, session) {
  var sess = {
    secret:"s3Cur3",
    key: "sessionId",
    resave: true,
    saveUninitialized: true,
    cookie: {
      domain: '.example.com',
      path: '/admin'
    }
  };
  app.use(session(sess));
  sess.cookie.httpOnly = false;

  app.get('/explicitly_set_httponly', function(req, resp) {
    resp.session.cookie.httpOnly = false;
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