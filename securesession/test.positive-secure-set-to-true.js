'use strict';

module.exports = function(app, session) {
  app.use(session({
    secret:"s3Cur3",
    key: "sessionId",
    cookie: {
      httpOnly: true,
      secure: true,
      domain: '.example.com',
      path: '/'
    }
  }));
};