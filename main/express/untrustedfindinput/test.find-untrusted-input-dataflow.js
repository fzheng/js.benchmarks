module.exports = function(app) {
  'use strict';

  var MongoClient = require('mongodb').MongoClient;
  const url = "mongodb://localhost:27017/exampleDb";

  app.get('/find_untrusted_input_dataflow', function(req, res) {
    var yr = req.params.yr;
    // add or remove comma separated "key": values given your JSON collection
    var jsonQuery = {
      "year": yr, _id: 0, "quarter": 1, "daily": 1, "sms": 1, "paid": 1
    };
    // -1 descending or 1 ascending
    var jsort = {
      "quarter": -1
    };
    MongoClient.connect(url, function(err, db) {
      if(err) {
        return console.dir(err);
      }
      db.collection("calendar", function(err, collection) {
        collection.find(jsonQuery).sort(jsort).toArray(function(err, items) {
          res.send(items);
        });
      });
    });
  });
};