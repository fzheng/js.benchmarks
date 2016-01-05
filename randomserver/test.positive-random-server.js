module.exports = function(app) {
  'use strict';

  // Positive Trigger
  var crypto = require('crypto');

  // https://twitter.com/coolaj86/status/662774739866226690
  function getRndNum() {
    var res = ('0.' + parseInt(crypto.randomBytes(8).toString('hex'), 16)).replace(/(^0)|(0$)/g, '');
    return parseFloat(res);
  }

  app.get('/positive_random_server', function(req, res) {
    res.send(getRndNum());
  });
};