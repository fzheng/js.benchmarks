'use strict';

module.exports = function(app, session) {
  app.use(session({
    secret:"s3Cur3",
    key: "sessionId",
    cookie: {
      secure: false,
      domain: '.example.com',
      path: '/admin'
    }
  }));
};