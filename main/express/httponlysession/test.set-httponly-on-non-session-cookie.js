module.exports = function(app, session) {
  'use strict';

  // true negative
  // trigger should not fire, because this is not a session cookie
  app.get('/set_httponly_on_non_session_cookie', function(req, res) {
    res.cookie('viewed_ad_id', '12345678', {
      domain: '.example.com',
      path: '/admin',
      httpOnly: false
    });
  });
};