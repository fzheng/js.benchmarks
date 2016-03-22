"use strict";

var _ = require('lodash');

module.exports = function (opt) {
	if (!opt.prefix) {
		throw new Error('Missing route prefix.');
	}

	if (!opt.controller) {
		throw new Error('Missing route controller.');
	}

	if (!opt.validator) {
		throw new Error('Missing route validator.');
	}

	var prefix = opt.prefix;
	
	if (prefix[0] !== '/') {
		prefix = '/' + prefix;
	}

	var controller = opt.controller;
	var validator = opt.validator;
	var auth = opt.auth;

	var internal = [];
	function makeRoute(name) {
		name = (name[0] === '/')? name : ('/' + name);
		return prefix + name;
	}

	internal.push({
		method: 'GET',
		path: makeRoute('/get/{_id}'),
		config: {
			handler: controller.findById,
			validate: validator.get,
			auth: auth
		}
	});

	internal.push({
		method: 'PUT',
		path: makeRoute('/update/{_id}'),
		config: {
			handler: controller.update,
			validate: validator.update,
			auth: auth
		}
	});

	internal.push({
		method: 'POST',
		path: makeRoute('/upsert'),
		config: {
			handler: controller.upsert,
			validate: validator.upsert,
			auth: auth,
			payload: {
				parse: true,
				override: 'application/json'
			}
		}
	});

	internal.push({
		method: 'GET',
		path: makeRoute('/getall'),
		config: {
			handler: controller.findAll,
			auth: auth
		}
	});

	internal.push({
		method: 'POST',
		path: makeRoute('/insert'),			
		config: {
			payload: {
				parse: true,
				override: "application/json"
			},
			handler: controller.insert,
			validate: validator.insert,
			auth: auth
		}
	});

	internal.push({
		method: 'DELETE',
		path: makeRoute('/delete/{_id}'),
		config: {
			handler: controller.delete,
			validate: validator.delete,
			auth: auth
		}
	});
	return internal;
};