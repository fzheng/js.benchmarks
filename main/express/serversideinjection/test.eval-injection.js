module.exports = function(app) {
  'use strict';

  var pmongo = require('promised-mongo');
  var db = pmongo('contactlist', ['contactlist']);

  app.post('/eval_injection', function(req, res) {
    // not support yet
    eval('console.log("Hello World");');
    var x = req.body;
    // should capture this
    eval(x);
    // not support yet
    eval('db.contactlist.insert(x).then(function() {res.send("Done");});');
    eval(req.body);
  });
};