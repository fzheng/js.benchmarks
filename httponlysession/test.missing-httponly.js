var express = require('express');
var app = express();
var session = require("express-session");
var sess = {
  secret: 'keyboard cat',
  key: "sessionId",
  cookie: {}
}

app.use(session(sess))