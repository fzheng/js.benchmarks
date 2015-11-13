var express = require('express');
var app = express();
var session = require("express-session");
app.use(session({
  secret:"s3Cur3",
  key: "sessionId",
  cookie: {
    httpOnly: false,
    domain: '.example.com',
    path: '/admin'
  }
}));
