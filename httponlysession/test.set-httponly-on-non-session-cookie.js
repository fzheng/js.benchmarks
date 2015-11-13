'use strict';

module.exports = function(app, session) {
  //true negative
  //trigger should not fire, because this is not a session cookie
  app.get('/should_not_fire', function(req, res) {
    res.cookie(
      'viewed_ad_id',
      '12345678',
      {
        domain: '.example.com',
        path: '/admin',
        httpOnly: false
      }
    );
  });
};