'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require("express-session");

var caseNum = 0;
switch(caseNum) {
  case 1:
    // test explicitly set httponly
    app.use(session({
      secret:"s3Cur3",
      key: "sessionId",
      cookie: {
        domain: '.example.com',
        path: '/admin'
      }
    }));
    session.cookie.httpOnly = false;
    res.session.cookie.httpOnly = false;
    break;

  case 2:
    // test missing httponly
    var sess = {
      secret: 'keyboard cat',
      key: "sessionId",
      cookie: {}
    };
    app.use(session(sess));
    break;

  case 3:
    // test positive httponly set to true
    app.use(session({
      secret:"s3Cur3",
      key: "sessionId",
      cookie: {
        httpOnly: true,
        secure: true,
        domain: '.example.com',
        path: '/'
      }
    }));
    break;

  case 4:
    // test set httponly on create
    app.use(session({
      secret:"s3Cur3",
      key: "sessionId",
      cookie: {
        httpOnly: false,
        domain: '.example.com',
        path: '/admin'
      }
    }));
    break;

  case 5:
    // test set httponly on non session cookie
    res.cookie(
      'viewed_ad_id',
      '12345678',
      {
        domain: '.example.com',
        path: '/admin',
        httpOnly: false
      }
    );
    break;

  default:
    console.log('do nothing');
}

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

//app.disable('X-Powered-By'); // trigger X-Powered-By

app.get('/', function(req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function() {
  var port = server.address().port;
  console.log('Example app listening at http://127.0.0.1:%s', port);
});