'use strict';

var express = require('express');
var expSess = require("express-session");
var app = express();
var bodyParser = require('body-parser');

// support json encoded bodies
app.use(bodyParser.json());
// support encoded bodies
app.use(bodyParser.urlencoded({extended: true}));

// Register templating engine
app.engine('html', require('ejs').renderFile);
app.set("view engine", "html");
app.set("views", __dirname + "/static/views");
app.use(express.static(__dirname + '/static'));

// ======= for X-Powered-By test =======
require('./xpoweredby/test.xpoweredby-helmet')(app);

// ======= for insecure script test =======
require('./insecurescript/test.insecure-script')(app);

// ======= for httpOnly session test =======
require('./httponlysession/test.explicitly-set-httponly')(app, expSess);
require('./httponlysession/test.set-httponly-on-non-session-cookie')(app, expSess);
/**
  require('./httponlysession/test.missing-httponly')(app, expSess);
  require('./httponlysession/test.positive-httponly-set-to-true')(app, expSess);
  require('./httponlysession/test.set-httponly-on-create')(app, expSess);
 */

// ======= for Open Redirect test =======
require('./openredirect/test.open.redirect')(app, expSess);
require('./openredirect/test.positive.with.map')(app, expSess);
require('./openredirect/test.redirect-with-app.locals')(app, expSess);

// ======= for secure session test =======
require('./securesession/test.set-secure-on-non-session-cookie')(app, expSess);
/**
 require('./securesession/test.conditional-setting-secure')(app, expSess);
 require('./securesession/test.explicitly-set-secure')(app, expSess);
 require('./securesession/test.missing-secure')(app, expSess);
 require('./securesession/test.positive-secure-set-to-true')(app, expSess);
 require('./securesession/test.set-secure-on-create')(app, expSess);
 */

// ======= for MongoDB mass untrusted find input =======
require('./untrustedfindinput/test.find-untrusted-input-dataflow')(app);
require('./untrustedfindinput/test.find-untrusted-input-from-req')(app);
require('./untrustedfindinput/test.find-with-untrusted-input')(app);

// ======= for MongoDB mass assignment test =======
require('./massassignment/test.insert-one-param')(app);
require('./massassignment/test.insert-two-params')(app);
require('./massassignment/test.positive-mongoose')(app);

// ======= for server side XSS test =======
require('./xss/test.xss_res_render')(app);

// ======= for server side injection =======
require('./serversideinjection/test.eval-injection')(app);

// ======= for server side PRNG test =======
require('./randomserver/test.negative-random-server')(app, expSess);
require('./randomserver/test.positive-random-server')(app, expSess);

// ======= for client side PRNG test =======
require('./randomclient/test.negative-random-client')(app);

var server = app.listen(3000, function() {
  var port = server.address().port;
  console.log('Your app listening at http://localhost:%s', port);
});