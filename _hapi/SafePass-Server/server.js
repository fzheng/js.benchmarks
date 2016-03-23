var Hapi = require("hapi");
var routes = require("./routes/index.js");
var mongoose = require("mongoose");



var server = new Hapi.Server();

server.connection({
	port:process.env.PORT || 3000
})


/****************** Database Setup **************/

var mongoUri = process.env.MONGOLAB_URI || 'localhost/27017'
var options = {
  'db': { 'native_parser': true }
}

mongoose.connect(mongoUri, options, function(err){
	if(err){
		console.log(err);
		process.exit(1);
	}
});




var plugins = [
	{
		register: require('hapi-auth-basic')
	},
	{
		register: require('hapi-authorization'),
		options: {
		  roles: false	// no heirarky, you can only acces your own passwords  
		}
	}
];
 
server.register(plugins, function(err){
	
}) 

server.route(routes);




server.start(function(err){
	if(err){
		throw err
	}
	console.log("server running at " + server.info.uri);
})

module.exports = server;