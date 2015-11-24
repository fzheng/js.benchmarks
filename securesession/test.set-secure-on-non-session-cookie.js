'use strict';

module.exports = function(app, session) {
  app.get('/', function(req, res) {
    //true negative
    // trigger should not fire, because this is not a session cookie
    res.cookie('viewed_ad_id', '12345678', {
      domain: '.example.com',
      path: '/admin',
      httpOnly: false,
      secure: false
    });
  });
};