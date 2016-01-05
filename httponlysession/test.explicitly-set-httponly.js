module.exports = function(app, someSession) {
  'use strict';

  var sess = {
    secret:"s3Cur3",
    key: "sessionId",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
      domain: 'test.feng.com',
      path: '/explicitly_set_httponly'
    }
  };

  app.use(someSession(sess));

  sess.cookie.httpOnly = true;

  app.get('/explicitly_set_httponly', function(req, res) {
    var mySess = req.session;
    mySess.cookie.httpOnly = false;
    res.send('Please check your cookie');
  });
};