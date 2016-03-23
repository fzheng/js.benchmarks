"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var videoSchema = new mongoose.Schema({
	user_id: String,
	id: String,
	source: String, 
	created_time: Date, 
	likes: Number,
	shares: Number
}, {
	id: false // do not override id field
});

// find 
// by user_id
// by user_id and soruce 
// by user_id, source and id
videoSchema.index({ user_id: 1, source: 1, id: 1}, { unique: true });

module.exports = mongoose.model('Video', videoSchema);