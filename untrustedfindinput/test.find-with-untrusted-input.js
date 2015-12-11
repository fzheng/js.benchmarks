var pmongo = require('promised-mongo');

module.exports = function(app) {
  'use strict';

  var db = pmongo('profile', ['profile']);

  app.post('/', function(req, res) {
    if(req.params.case === 1) {
      var str_1 = "I am an example input for find.";
      db.profile.find({name: str_1}, function(err, docs) {
        if(!err) {
          res.send("Postive Case" + docs);
        }
      });
    } else if(req.params.case === 2) {
      db.profile.find({name: req.params.name}, function(err, docs) {
        if(!err) {
          res.send("Use of untrusted input" + docs);
        }
      });
    } else {
      var condition = "this.group == " + req.params.group;
      db.profile.find({$where: condition}, function(err, docs) {
        if(!err) {
          res.send("Use of untrusted input in $where" + docs);
        }
      });
    }
  });
};