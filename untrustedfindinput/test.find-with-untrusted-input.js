'use strict';

var pmongo = require('promised-mongo');

module.exports = function(app) {
  'use strict';
  var db = pmongo('profile', ['profile']);
  app.post('/', function(req, res) {
    switch(req.body.id) {
      case 101:
        var str_1 = "I am an example input for find.";
        db.profile.find({name: str_1}, function(err, docs) {
          if(!err) {
            res.send("Postive Case" + docs);
          }
        });
        break;
      case 102:
        db.profile.find({name: req.params.name}, function(err, docs) {
          if(!err) {
            res.send("Use of untrusted input" + docs);
          }
        });
        break;
      case 103:
        var condition = "this.group == " + req.params.group;
        db.profile.find({$where: condition}, function(err, docs) {
          if(!err) {
            res.send("Use of untrusted input in $where" + docs);
          }
        });
        break;
      default:
        res.error("No default case defined");
    }
  });
};