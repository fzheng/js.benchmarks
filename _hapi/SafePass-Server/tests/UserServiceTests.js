var userService = require("~/services/userService.js");


//tests user-registration and login
function testRegisterUser(){
	var Registersuccess = userService.Register("name","pass");
	var authSucces = userService.Login("name", "pass");
	assert(Registersuccess && authSucces);
}




