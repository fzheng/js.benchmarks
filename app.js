'use strict';

var config = require('./config');
var EmailService = require('./lib/email_service');
var emailService = new EmailService(config);

emailService.send(
  {
    from: 'summitzf@gmail.com',
    to: ['summitzf@yahoo.com', 'summitzf@163.com'],
    subject: 'Hello World',
    text: 'How are you doing?',
    html: '<strong>How are you doing?</strong>'
  }
);