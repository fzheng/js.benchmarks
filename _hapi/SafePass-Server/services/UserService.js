"use strict"
const mongoose = require("mongoose"); 
const User = require("./../Schemas/Schemas.js").UserModel;
const bcrypt = require("bcrypt");


exports.Register = function Register(request) {
	return new Promise(function(resolve, reject){
		const user = new User(name, pass);
		user.save();
	})
}

exports.Login = function Login(name, pass){
	//body...
}

exports.Authenticate = function authenticate(request){
	console.log("authing!");
	return new Promise(function (resolve, reject) {
		const user = User.findOne({name:request.username}, function(err, user){
			if(err){
				return reject(err);
			}
			request.user = user;

			resolve(request);
		});

	})

	
}
