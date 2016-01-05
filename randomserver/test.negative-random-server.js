module.exports = function(app) {
  'use strict';

  var min = 1;
  var max = 10;
  var rnd1 = Math.floor(Math.random() * (max - min) + min - Math.random());

  app.post('/negative_random_server', function(req, res) {
    req.session.sessionId = max * rnd1;
    res.send('PRNG test');
  });
};