'use strict';

var config = require('./config');
var EmailService = require('./lib/email_service');
var emailService = new EmailService(config);

emailService.send(
  'summitzf@gmail.com',
  'summitzf@gmail.com',
  {
    subject: 'Hello World',
    text: 'How are you doing?',
    html: '<strong>How are you doing?</strong>'
  }
);