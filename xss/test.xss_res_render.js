'use strict';

module.exports = function(app) {
  app.get('/', function(req, res) {
    var userId = req.session.userId;
    if(userId) {
      res.render(req.param.url);
    } else {
      res.render("contributions", {
        updateError: "Contribution percentages cannot exceed 30 %",
        userId: userId
      });
    }
  });
};