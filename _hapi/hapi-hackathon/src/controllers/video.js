"use strict";

var Video = require('src/models/video');
var VideoService = require('src/services/video');

var _ = require('lodash');
var crud = require('libs/controllers/crud');
var replyHelper = require('libs/reply');

(function (module) {
	_.extend(module, crud(Video));

module.read = function (request, reply) {
	var user_id = request.auth.credentials._id;
	var source = request.params.source;
	
	VideoService.read(user_id, source).then(
		replyHelper.fulfilled(reply), 
		replyHelper.rejected(reply)
	);
};

var replyView = function (reply, source, message) {
	return reply.view('video', {
		title: source,
		source: source,
		message: message
	});
};

module.view = function (request, reply) {
	var source = request.params.source;
	return replyView(reply, source);
};

module.pull = function (request, reply) {	
	var user_id = request.auth.credentials._id;
	var source = request.params.source;
	
	VideoService.pull(user_id, source).done(function () {
			replyView(reply, source);
		}, function (error) {
			if (error.type === 'token') {
				reply.redirect('/auth/' + error.source);
			} else {
				console.log(error);
				replyView(reply, source, error);
			}			
		}
	);
};

})(module.exports);