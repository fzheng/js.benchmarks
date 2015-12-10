'use strict';

module.exports = function(app) {
  app.get('/', function(req, res) {
    var userId = req.session.userId;
    if(userId) {
      res.render(userId);
    } else {
      res.render(req.param.url);
    }
  });
};