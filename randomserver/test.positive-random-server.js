'use strict';

// Positive Trigger
var crypto = require('crypto');

// https://twitter.com/coolaj86/status/662774739866226690
function getRndNum() {
  var res = ('0.' + parseInt(crypto.randomBytes(8).toString('hex'), 16)).replace(/(^0)|(0$)/g, '');
  return parseFloat(res);
}

module.exports = function(app, session) {
  app.use(session({
    sessionId: getRndNum()
  }));

  app.get('/', function(req, res) {
    res.send(getRndNum());
  });
};