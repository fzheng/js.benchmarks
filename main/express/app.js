'use strict';

// email service test only

var config = require('./config');
var EmailService = require('./lib/email_service');
var emailService = new EmailService(config);

emailService
  .setFrom('summitzf@gmail.com')
  .setTo(['summitzf@gmail.com', 'summitzf@yahoo.com'])
  .setPayload({
    subject: 'Hello World',
    text: 'How are you doing?',
    html: '<strong>How are you doing?</strong>'
  })
  .send(function(err, data) {
    if(data) {
      console.log(data);
    }
  });

emailService.reset();

emailService.send(function(err, data) {
  if(data) {
    console.log(data);
  }
});