'use strict';

var dotenv = require('dotenv');
dotenv.load();

function EmailService(config) {
  /**
   * Email service prototype (powered by sendgrid)
   */
  var self = this;

  // instance of the email service
  var emailService = null;

  // instance of the email
  var email = null;

  var initialize = function(config) {
    /**
     * Private method to initialize email service with {config}
     * @param {object} config: necessary config settings for the service
     * @return {EmailService}
     */
    var api_key = process.env.API_KEY;
    emailService = require('sendgrid')(api_key);
    email = new emailService.Email();
  };

  self.setFrom = function(from) {
    /**
     * set email from address
     * @param {string} from: sender email address
     * @return {EmailService}
     */
    email.setFrom(from);
    return self;
  };

  self.setTo = function(to) {
    /**
     * Sets email recipient address(es)
     * @param {*} to: either string or array of recipients
     * @return {EmailService}
     */
    if(Array.isArray(to)) {
      email.setTos(to);
    } else {
      email.addTo(to);
    }
    return self;
  };

  self.setPayload = function(payload) {
    /**
     * Sets email payload/content
     * @param {object}: payload, TODO: expand
     * @return {EmailService}
     */
    email.setSubject(payload.subject);
    email.setText(payload.text);
    email.setHtml(payload.html);
    return self;
  };

  self.send = function(cb) {
    /**
     * Sends email, exception will be thrown if necessary info are missing
     * Email settings will be preserved after email is sent.
     * @param {function} cb: callback function
     */
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
    /**
     * Sends email only once, @see EmailService.send
     * Email settings will be discarded after email is sent.
     * @param {function} cb: callback function
     */
    self.send(function(err, data) {
      self.reset();
      return cb(err, data);
    });
  };

  self.reset = function() {
    /**
     * Reset all settings of the email.
     */
    email = new emailService.Email();
  };

  // initialize the service
  initialize(config);
}

module.exports = EmailService;