'use strict';

var dotenv = require('dotenv');
dotenv.load();

function EmailService(config) {
  var self = this;
  var emailService = null;
  var email = null;

  self.send = function(payload) {
    email.setFrom(payload.from);
    if(Array.isArray(payload.to)) {
      email.setTos(payload.to);
    } else {
      email.addTo(payload.to);
    }
    email.setSubject(payload.subject);
    email.setText(payload.text);
    email.setHtml(payload.html);

    emailService.send(email, function(err, data) {
      if(err) {
        return console.error(err);
      }
      return console.log(data);
    });
  };

  var initialize = function(config) {
    var api_key = process.env.API_KEY;
    emailService = require('sendgrid')(api_key);
    email = new emailService.Email();
  };

  initialize(config);
}

module.exports = EmailService;