'use strict';

var Mongoose = require('mongoose');
var Config = require('./config');

// load database
// Mongoose.connect('mongodb://localhost/test');
Mongoose.connect('mongodb://' + Config.get('/mongo/username') + ':' + Config.get('/mongo/password') + '@' + Config.get('/mongo/url') + '/' + Config.get('/mongo/database'));
var db = Mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error'));

db.once('open', function () {
	console.log("Connection with database succeeded.");
});

exports.Mongoose = Mongoose;
exports.db = db;
