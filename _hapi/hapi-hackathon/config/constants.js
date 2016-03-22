"use strict";

module.exports = function() {

	var env = process.env.NODE_ENV || 'development';
	var dbContants = databaseConfig();

	var obj = {
		application : {
			host : process.env.NODE_HOST,
			port : process.env.NODE_PORT
		},
		database : dbContants[env],
		server : {
			defaultHost : 'http://localhost:8001'
		}
	};

	if (!obj.application.host) {
		throw new Error('Missing constant application.host. ' +
			'Check your enviroment variables NODE_HOST.');
	} else if (!obj.application.port) {
		throw new Error('Missing constant application.port. ' +
			'Check your enviroment variable NODE_PORT.');
	} else if (!obj.database) {
		throw new Error(env + ' Missing constant database ' +
			'Check your enviroment variables.');
	}
	
	return obj;

	function databaseConfig(){
		return {
			'production' : process.env.DB_PRD,
			'development' : process.env.DB_DEV,
			'test' : process.env.DB_TEST
		};
	}
}();