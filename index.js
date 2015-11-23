'use strict';

var express = require('express');
var expSess = require("express-session");
var app = express();
var bodyParser = require('body-parser');

// support json encoded bodies
app.use(bodyParser.json());
// support encoded bodies
app.use(bodyParser.urlencoded({extended: true}));

require('./httponlysession/test.explicitly-set-httponly')(app, expSess);
//require('./httponlysession/test.missing-httponly')(app, expSess);
//require('./httponlysession/test.positive-httponly-set-to-true')(app, expSess);
//require('./httponlysession/test.set-httponly-on-create')(app, expSess);
//require('./httponlysession/test.set-httponly-on-non-session-cookie')(app, expSess);
//require('./random/index')(app);

//app.use(expSess({
//  cookie: {
//    domain: 'random.com',
//    path: '/'
//  }
//}));

//app.disable('X-Powered-By'); // trigger X-Powered-By

var server = app.listen(3000, function() {
  var port = server.address().port;
  console.log('Your app listening at http://localhost:%s', port);
});