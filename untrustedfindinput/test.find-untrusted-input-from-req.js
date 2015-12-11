var pmongo = require('promised-mongo');

module.exports = function(app) {
  'use strict';

  var db = pmongo('report', ['report']);

  app.post('/', function(req, res) {
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