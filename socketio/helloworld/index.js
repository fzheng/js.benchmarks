'use strict';

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/chat', function (req, res) {
  res.sendFile(__dirname + '/chat.html');
});

io.on('connection', function (socket) {
  socket.emit('request', {
    from: 'socket.emit',
    path: '/'
  });
  io.emit('request', {
    from: 'io.emit',
    path: '/'
  });
  socket.on('response', function (data) {
    console.log(data);
  });
});

var chat = io.of('/chat').on('connection', function (socket) {
  socket.emit('request', {
    from: 'socket.emit',
    path: '/chat'
  });
  chat.emit('request', {
    from: 'chat.emit',
    path: '/chat'
  });
});