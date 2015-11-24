'use strict';

module.exports = function(app, session) {
  var sess = {
    secret: 'keyboard cat',
    key: "sessionId",
    cookie: {}
  };

  app.use(session(sess));
};