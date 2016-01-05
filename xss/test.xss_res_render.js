module.exports = function(app) {
  'use strict';

  app.get('/xss_res_render', function(req, res) {
    var userId = req.session.userId;
    if(userId) {
      res.render(userId);
    } else {
      res.render(req.param.url);
    }
  });
};