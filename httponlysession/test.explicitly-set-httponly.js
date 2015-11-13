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

  app.get('/explicitly_set_httponly', function(req, res) {
    res.session.cookie.httpOnly = false;
  });
};