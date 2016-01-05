module.exports = function(app) {
  'use strict';

  var pmongo = require('promised-mongo');
  var db = pmongo('report', ['report']);

  app.post('/find_untrusted_input_from_req', function(req, res) {
    db.report.find({
      where: {
        identifier: req.param.identifier
      }
    }, {
      parameters: 1
    }).exec(function(error, report) {
      if(err) {
        return res.send(err, 500);
      } else {
        res.view({
          reportPage: report
        });
      }
    });
  });
};