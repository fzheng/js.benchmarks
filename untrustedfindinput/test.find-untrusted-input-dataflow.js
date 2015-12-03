'use strict';

var pmongo = require('promised-mongo');

module.exports = function(app) {
  'use strict';
  var db = pmongo('calendar', ['calendar']);
  var yr = req.params.yr;
  //add or remove comma seperated "key":values given your JSON collection
  var jsonQuery = {
    "year": yr
  };
  //leave year out since that's specified in the query anyhow
  var jsonProjection = {
    _id: 0, "quarter": 1, "daily": 1, "sms": 1, "paid": 1
  };
  //-1 descending or 1 ascending
  var jsort = {
    "quarter": -1
  };
  app.get('/', function(req, res) {
    db.collection("calendar", function(err, collection) {
      collection.find(jsonQuery, jsonProjection).sort(jsort).toArray(function(err, items) {
        res.send(items);
      });
    });
  });
};