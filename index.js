"use strict";

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.get('/api/users', function(req, res) {
  var user_id = req.query.id;
  var token = req.query.token;
  var geo = req.query.geo;

  res.send(user_id + ' ' + token + ' ' + geo);
});

app.get('/api/:version', function(req, res) {
  res.send(req.params.version);
});

app.post('/api/users', function(req, res) {
  var user_id = req.body.id;
  var token = req.body.token;
  var geo = req.body.geo;

  res.send(user_id + ' ' + token + ' ' + geo);
});

var server = app.listen(3000, function() {
  var port = server.address().port;
  console.log('Example app listening at http://127.0.0.1:%s', port);
});