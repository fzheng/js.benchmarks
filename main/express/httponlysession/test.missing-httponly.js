'use strict';

module.exports = function(app, sssss) {
  var sess = {
    secret: 'keyboard cat',
    key: "sessionId",
    resave: true,
    saveUninitialized: true,
    cookie: {}
  };

  app.use(sssss(sess));

  app.get('/missing_httponly', function(req, res) {
    res.send('Hello World');
  });
};