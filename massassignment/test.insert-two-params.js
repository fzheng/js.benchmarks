//the whole post body is sent to the insert function as its first parameter

var mongojs = require('mongojs');

module.exports = function(app) {
  var db = mongojs('contactlist', ['contactlist']);

  app.post('/contactlist', function(req, res) {
    console.log("Insert " + req.body);
    db.contactlist.insert(req.body, function(err, doc) {
      res.json(doc);
    });
  });
};