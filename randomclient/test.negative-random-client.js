module.exports = function(app) {
  'use strict';

  app.get('/negative_random_client', function(req, res) {
    res.render('client_prng');
  });
};