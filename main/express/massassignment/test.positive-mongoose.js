//using Mongoose mass-assign package to create a schema for the model and using massAssign function
module.exports = function(app) {
  'use strict';

  var mongojs = require('mongojs');
  var mongoose = require('mongoose');
  var massAssign = require('mongoose-mass-assign');

  var UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: String,
    priority: {
      type: String,
      protect: true,
      default: "low"
    }
  });

  UserSchema.plugin(massAssign);
  var User = mongoose.model('User', UserSchema, 'contactlist');

  app.post('/contactlist_positive_mongoose', function(req, res) {
    console.log("Insert " + req.body);
    var user = new User;
    user.massAssign({
      name: req.body.name,
      email: req.body.email,
      number: req.body.number
    });
    user.save(function(err, data) {
      if(err) {
        res.json(err);
      } else {
        console.log(data);
        res.json(data);
      }
    });
  });
};