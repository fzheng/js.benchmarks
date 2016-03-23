"use strict";

var Joi = require('joi');

var Crud = require('libs/routes/crud');
var VideoController = require('src/controllers/video');

function authCookieRoute(options) {
	return {
		method: options.method || 'GET',
		path: options.path,
		config: {
			auth: 'session',
			handler: options.handler,
			validate: options.validate
		}
	};
}

module.exports = function(server, options){
	var sourceValidate = {
		params: {
			source: Joi.string().valid('facebook', 'twitter').default("facebook")
		}
	};

	server.route([
		authCookieRoute({
			path: '/video/{source}/getall',
			handler: VideoController.read,
			validate: sourceValidate
		}),
		authCookieRoute({
			path: '/video/{source}', 
			handler: VideoController.view,
			validate: sourceValidate
		}),
		authCookieRoute({
			method: 'POST',
			path: '/video/{source}',
			handler: VideoController.pull,
			validate: sourceValidate
		})
	]);
};
