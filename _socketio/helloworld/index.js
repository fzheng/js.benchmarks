'use strict';

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('request', {message: 'Hello World'});
  socket.on('response', function (data) {
    console.log(data);
  });
});