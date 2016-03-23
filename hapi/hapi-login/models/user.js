var Mongoose = require('../database').Mongoose;

// user schema for Mongo
var userSchema = new Mongoose.Schema({
	email: 	      { type: String,	required: true },
	password:     { type: String,	required: true },
	creationDate: { type: Date,		required: true, default: Date.now },
});

userSchema.plugin(require('passport-local-mongoose'), { usernameField: 'email', hashField: 'password', usernameLowerCase: true, usernameUnique: true });

// Model creantion and added to exports
var User = exports.User = Mongoose.model('User', userSchema, 'Users');
