"use strict";
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: { type: String, index: {unique: true}, lowercase: true },
  password: String,

  profile: {
    picture: String,
    name: String
  },

  social: [{
    provider: String,
    profile: Object
  }],

  oauth: [{
    provider: String,
    token: String, 
    secret: String
  }]
});

/**
 * Password hash middleware.
 */
userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
  	return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
    	return next(err);
    }
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
      	return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
    	return cb(err);
    }
    cb(null, isMatch);
  });
};

userSchema.methods.public = function () {
  return {
    _id: this._id,
    email: this.email,
    profile: this.profile
  };
};

var Joi = require('joi');
userSchema.statics.login = function (params, cb) {

  var schema = Joi.object().keys({
    email: Joi.string().min(3).max(30).required(),
    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/)
  });


  var result = Joi.validate(params, schema);

  if (result.error) {
      return cb(null, result.error);
  }

  var credentials = result.value;

  var email = credentials.email.toLowerCase();
  var password = credentials.password;

  this.findOne({email: email}, function(err, user) {
    if (err) {
      return cb(err);
    }
    if (!user) {
      return cb(null, 'email ' + email + ' not found');
    }

    user.comparePassword(password, function(err, isMatch) {
      if (isMatch) {
        return cb(null, null, user);
      } else {
        return cb(null, 'wrong password for ' + email);
      }
    });
  });
};

var User = mongoose.model('User', userSchema);

module.exports = User;
