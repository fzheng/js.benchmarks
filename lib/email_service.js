'use strict';

var dotenv = require('dotenv');
dotenv.load();

function EmailService(config) {
  var self = this;
  var emailService = null;
  var email = null;

  self.send = function(from, to, content) {
    email.addTo(to);
    email.setFrom(from);
    email.setSubject(content.subject);
    email.setText(content.text);
    email.setHtml(content.html);

    emailService.send(email, function(err, json) {
      if(!err) {
        console.log(json);
      }
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