'use strict';

var express = require('express');
var expSess = require("express-session");
var app = express();
var bodyParser = require('body-parser');

// support json encoded bodies
app.use(bodyParser.json());
// support encoded bodies
app.use(bodyParser.urlencoded({extended: true}));

// ======= for httpOnly session test =======
//require('./httponlysession/test.explicitly-set-httponly')(app, expSess);
//require('./httponlysession/test.missing-httponly')(app, expSess);
//require('./httponlysession/test.positive-httponly-set-to-true')(app, expSess);
//require('./httponlysession/test.set-httponly-on-create')(app, expSess);
//require('./httponlysession/test.set-httponly-on-non-session-cookie')(app, expSess);

// ======= for Open Redirect test =======
//require('./openredirect/test.open.redirect')(app, expSess);
//require('./openredirect/test.positive.with.map')(app, expSess);
//require('./openredirect/test.redirect-with-app.locals')(app, expSess);

// ======= for secure session test =======
//require('./securesession/test.conditional-setting-secure')(app, expSess);
//require('./securesession/test.explicitly-set-secure')(app, expSess);
require('./securesession/test.missing-secure')(app, expSess);
//require('./securesession/test.positive-secure-set-to-true')(app, expSess);
//require('./securesession/test.set-secure-on-create')(app, expSess);
//require('./securesession/test.set-secure-on-non-session-cookie')(app, expSess);

// ======= for X-Powered-By test =======
app.disable('X-Powered-By'); // trigger X-Powered-By

var server = app.listen(3000, function() {
  var port = server.address().port;
  console.log('Your app listening at http://localhost:%s', port);
});