// Test application saves a URL from user input into app.locals and then redirects to that address in one of the requests
// Method POST /url saves the URL to app.locals.url
// Method POST /next redirects to the saved URL

module.exports = function(app) {
  'use strict';

  var mongojs = require('mongojs');
  var db = mongojs('contactlist', ['contactlist']);

  var validator = require('validator');

  app.get('/contactlist_open_redirect', function (req, res) {
    console.log('I received a GET request');
    db.contactlist.find(function (err, docs) {
      res.json(docs);
    });
  });

  app.post('/contactlist_open_redirect', function (req, res) {
    console.log(req.body);
    if (validator.isNull(req.body.priority)) {
      req.body.priority = 'low';
    }
    db.contactlist.insert(req.body, function(err, doc) {
      res.json(doc);
    });
  });

  app.delete('/contactlist_open_redirect/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
      res.json(doc);
    });
  });

  app.get('/contactlist_open_redirect/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
      res.json(doc);
    });
  });

  app.put('/contactlist_open_redirect/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    db.contactlist.findAndModify({
        query: {_id: mongojs.ObjectId(id)},
        update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
        new: true}, function (err, doc) {
        res.json(doc);
      }
    );
  });

  app.post('/url_open_redirect',function(req, res){
    //store value from user input in app.locals
    app.locals.url = req.body.url;

    var name = req.body.name;
    if (!validator.isNull(name)){
      db.contactlist.find({name: name}, function(err, docs){
        res.json(docs);
      })
    } else {
      res.json({"error":"invalid name"});
    }
  });

  app.post('/next_open_redirect', function(req, res){
    console.log("go to the next page "+app.locals.url);
    var url = app.locals.url;

    //redirect user to the value from app.locals, but prepend it with protocol and host
    console.log(("URL: "+url));
    res.redirect(302, 'https://' + req.host + '/' + url);
  });
};