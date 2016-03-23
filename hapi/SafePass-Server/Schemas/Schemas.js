"use strict"

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const aes = require("crypto-js/aes");

const SecretSchema = new Schema({
	domain:String,
	secret:String
})

const UserSchema = new Schema({
	name: String,
	passHash: String,
	Secrets: [SecretSchema]
})



UserSchema.methods.addSecret = function(domain){
	const secret  = new Secret(domain, user.pass);
	this.Secrets.push(secret)
	return res(this);
}

UserSchema.methods.getSecret = function(domain){

}


SecretSchema.methods.decrypt = function(pass){
	aes.decrypt(this.Secret, pass)
}

module.exports.UserModel = mongoose.model('User', UserSchema);
module.exports.SecretModel = mongoose.model('Secret', SecretSchema);