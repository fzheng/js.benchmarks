'use strict';

var app = (require('express'))();
app.disable('X-Powered-By');

function foo(cb) {
  cb(true);
}

app.get('/', function (req, res) {
  foo(function(req) {
    res.send(req);
  });
});