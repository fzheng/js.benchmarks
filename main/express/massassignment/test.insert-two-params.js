//the whole post body is sent to the insert function as its first parameter

module.exports = function(app) {
  'use strict';

  var mongojs = require('mongojs');
  var db = mongojs('contactlist', ['contactlist']);

  app.post('/contactlist_insert_two_params', function(req, res) {
    console.log("Insert " + req.body);
    db.contactlist.insert(req.body, function(err, doc) {
      res.json(doc);
    });
  });
};