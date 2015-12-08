'use strict';

module.exports = function(app, session) {
  var min = 1;
  var max = 10;
  var rnd1 = Math.floor(Math.random() * (max - min) + min);
  app.use(session({
    sessionId: rnd1,
    genid: function(req) {
      return req.param.id * Math.random();
    },
    cookie: {
      httpOnly: true,
      secure: true
    }
  }));
};