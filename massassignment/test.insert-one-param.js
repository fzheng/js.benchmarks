//promised-mongo package is used, so mongo calls are returned as promises. 
//then() function is called on a promise to execute a callback function.
//untrusted input (req.body) is the only parameter to the insert() function.

var pmongo = require('promised-mongo');

module.exports = function(app) {
  var db = pmongo('contactlist', ['contactlist']);

  app.post('/contactlist', function(req, res) {
    console.log("Insert " + req.body);
    db.contactlist.insert(req.body).then(function() {
      console.log('Finished!');
      res.json(doc);
    });
  });
};