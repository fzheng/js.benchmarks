"use strict"

/********* Imports**************/

const secretService = require("./../services/secretService.js"),
		UserService = require("./../services/UserService.js"),
		hapi = require("hapi"),
		User = require("../Schemas/Schemas.js").UserModel,
		basic = require("hapi-auth-basic");

const internals = {};



internals.signup = function(request, reply){
			console.log( `signing up user: ${request.params.username}` );
			let user = new User(request.params.username, request.params.password);
		}


 internals.login = function(request, reply){
			console.log(`Logging in user: ${request.username}! ` );
			if(UserService.Authenticate(request.params.username, request.params.password)){
				reply(200, 'OK');
			}else{
				reply(403, 'forbidden');
			}
		}

internals.getSecret = function(request, reply){
			//remember to check credentials!
			let user = UserService.getUser(request.params.username, request.params.password);

			const Secret = secretService.getSecret(user, request.params.Domain).catch(secretService.addSecret);

			reply({secret:Secret.secret});
		}




	module.exports = [{
		method:'POST',
		path: '/signup' ,
		handler:internals.signup
	},

	{
		method :'POST',
		path:'/login/*',
		handler:internals.login

	},

	{
		method:'POST',
		path: '/Secret/*',
		handler:internals.getSecret
	}];