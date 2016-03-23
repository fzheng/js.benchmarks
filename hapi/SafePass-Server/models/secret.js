"use strict"

const random = require("secure-random");
const aes = require("crypto-js/aes");
 
class Secret{
	constructor(domain, pass){
		this.domain = domain,
		// generate new secret and symetrically encrypt it usiing crypt-js AES functionality and the users passphrase.
		this.Secret = aes.encrypt(random.randomUint8Array(128) , pass);
	}


}
