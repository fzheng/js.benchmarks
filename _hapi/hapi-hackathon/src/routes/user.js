"use strict";

var Joi = require('joi');

var Crud = require('libs/routes/crud');

module.exports = function(server, options){
	server.route(Crud({
		prefix: '/users', 
		controller: require('src/controllers/user'), 
		validator: require('src/validators/user')
	}));
};
