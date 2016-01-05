//promised-mongo package is used, so mongo calls are returned as promises. 
//then() function is called on a promise to execute a callback function.
//untrusted input (req.body) is the only parameter to the insert() function.

module.exports = function(app) {
  'use strict';

  var pmongo = require('promised-mongo');
  var db = pmongo('contactlist', ['contactlist']);

  app.post('/contactlist_insert_one_param', function(req, res) {
    console.log("Insert " + req.body);
    db.contactlist.insert(req.body).then(function() {
      console.log('Finished!');
      res.json(doc);
    });
  });
};