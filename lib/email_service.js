'use strict';

var dotenv = require('dotenv');
dotenv.load();

function EmailService(config) {
  var self = this;
  var emailService = null;
  var email = null;

  self.setFrom = function(from) {
    email.setFrom(from);
    return self;
  };

  self.setTo = function(to) {
    if(Array.isArray(to)) {
      email.setTos(to);
    } else {
      email.addTo(to);
    }
    return self;
  };

  self.setPayload = function(payload) {
    email.setSubject(payload.subject);
    email.setText(payload.text);
    email.setHtml(payload.html);
    return self;
  };

  self.send = function(cb) {
    if(!email.to || !email.from || !email.subject) {
      var err = new Error('No enough params to send emails');
      console.error(err);
      return cb(err);
    }
    emailService.send(email, function(err, data) {
      if(err) {
        console.error(err);
        return cb(err);
      }
      return cb(null, data);
    });
  };

  self.sendOnce = function(cb) {
    self.send(function(err, data) {
      self.reset();
      return cb(err, data);
    });
  };

  self.reset = function() {
    email = new emailService.Email();
  };

  var initialize = function(config) {
    var api_key = process.env.API_KEY;
    emailService = require('sendgrid')(api_key);
    email = new emailService.Email();
  };

  initialize(config);
}

module.exports = EmailService;