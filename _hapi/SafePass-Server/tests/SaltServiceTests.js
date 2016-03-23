var assert = require("assert");
var secretService = require("~/services/secretService.js");

// Tests that getSalt returns unique salts for unique user/domain pairs
function TestUniqueSecrets(){

	var Secret;
	secretService.getSecret("name","pass", "facebook", function(err, Secret){
		Secret = Secret;
	});
	secretService.getSecret("name","pass", "google", function(err, classified){
		assert(Secret != null && classified!= null);
		assert(Secret != classified);
	});


}


//test that the same Secret is returned for the same user/domain pair each time it is invoked
function TestConsistentSecrets(){
	var Secret;
	//Store initial Secret in Secret
	secretService.getSecret("name","google", function(err, Secret){
		Secret=Secret;
	})
	//get Secret for same domain 10 times, and assert they are always equal
	for (var i = 10; i >= 0; i--) {			
	secretService.getSecret("name","google", function(err, classified){
		assert(classified==Secret);
	})

	}