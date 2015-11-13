'use strict';

module.exports = function(app, session) {
  var sess = {
    secret: 'keyboard cat',
    key: "sessionId",
    resave: true,
    saveUninitialized: true,
    cookie: {}
  };

  app.use(session(sess));
};