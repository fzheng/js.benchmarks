module.exports = function(app) {
  'use strict';

  var pmongo = require('promised-mongo');
  var db = pmongo('profile', ['profile']);

  app.post('/find_with_untrusted_input', function(req, res) {
    if(req.params.case === 0) {
      var str_1 = "I am an example input for find.";
      db.profile.find({name: str_1}, function(err, docs) {
        if(!err) {
          res.send("Postive Case" + docs);
        }
      });
    } else if(req.params.case === 1) {
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