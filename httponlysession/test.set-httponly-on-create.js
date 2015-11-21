'use strict';

module.exports = function(app, session) {
  app.use(session({
    secret: "s3Cur3",
    key: "sessionId",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: false,
      domain: '.example.com',
      path: '/admin'
    }
  }));
};