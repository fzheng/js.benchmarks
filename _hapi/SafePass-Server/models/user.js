"use strict"

var bcrypt = require("bcrypt");



class User {
	constructor(name, password){
	this.username = name;
	this.passHash = hashSync(password);
	this.Secrets = [];
	}

}
