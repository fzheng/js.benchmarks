'use strict';

const fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();

const options = {
  key: fs.readFileSync('./file.pem'),
  cert: fs.readFileSync('./file.crt')
};
const serverPort = 7443;

const server = https.createServer(options, app);
const io = require('socket.io')(server);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('message', 'Hello World!');
});

server.listen(serverPort, function () {
  console.log('server up and running at %s port', serverPort);
});