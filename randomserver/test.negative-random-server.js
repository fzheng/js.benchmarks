'use strict';

module.exports = function(app, session) {
  var min = 1;
  var max = 10;
  var rnd1 = Math.floor(Math.random() * (max - min) + min);
  app.use(session({
    sessionId: rnd1,
    cookie: {
      httpOnly: true,
      secure: true
    }
  }));

  app.get('/', function(req, res) {
    var rnd2 = (function(x) {
      return x * Math.random() + Math.floor(new Date() / 1000);
    })(10000);
    res.send(rnd2);
  });
};