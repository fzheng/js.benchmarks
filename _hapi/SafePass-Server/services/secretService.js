"use strict"

const crypto = require("crypto-js");
const aes = require("crypto-js/aes");
const random = require("secure-random");	




//returns Promise that either resolves with a Secret, or Rejects with the user and domain
function getSecret(user, domain){
	return new Promise(function(resolve , reject){
		for (let i = user.Secrets.length - 1; i >= 0; i--) {
			if(user.Secrets[i].domain === domain){
				return resolve(user.Secrets[i].Secret);
			}
			//no secret found for this domain - reject with user&domain so handler can make a Secret
			reject(user, domain);
		}
	})
}

function addSecret(user, domain){
	return new Promise(function(res, rej){	

	})
}