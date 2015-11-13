var express = require('express');
var app = express();
var session = require("express-session");
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