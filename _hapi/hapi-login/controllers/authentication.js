'use strict';

var Joi = require('joi');
var User = require('../models/user').User;

/**
 * Responds to POST /login
 */
exports.login = {
	validate: {
        payload: {
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        }
    },
	handler: function (request, reply) {

		// In the version with Travelogue and Mongoose this was all handled by Passport (hence we retrieved
		// Passport and inserted the request and reply variables).
		User.authenticate()(request.payload.email, request.payload.password, function (err, user, message) {

			// There has been an error, do something with it. I just print it to console for demo purposes.
			if (err) {
				console.error(err);
				return reply.redirect('/login');
			}

			// If the authentication failed user will be false. If it's not false, we store the user
			// in our session and redirect the user to the hideout
			if (user) {
				request.auth.session.set(user);
				return reply.redirect('/dashboard');
			}
			return reply(message);

		});
    }
};

/**
 * Responds to GET /logout and logs out the user
 */
exports.logout = {
	auth: 'session',
	handler: function (request, reply) {
		request.auth.session.clear();
		reply().redirect('/');
	}
};

/**
 * Responds to POST /signup and creates a new user.
 */
exports.signup = {
	validate: {
		payload: {
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
            firstName: Joi.string().min(2).max(20).required(),
            lastName: Joi.string().min(2).max(20).required()
        }
	},
	handler: function(request, reply) {

		// Create a new user, this is the place where you add firstName, lastName etc.
		// Just don't forget to add them to the validator above.
		var newUser = new User({
			email: request.payload.email,
			firstName: request.payload.firstName,
            lastName: request.payload.lastName
		});

		// The register function has been added by passport-local-mongoose and takes as first parameter
		// the user object, as second the password it has to hash and finally a callback with user info.
		User.register(newUser, request.payload.password, function(err, user) {
			// Return error if present
			if (err) {
                return reply(err);
            }

            reply().redirect('/login');
        });
	}
};

/**
 * Responds to POST /profile
 */
exports.profile = {
    validate: {
        payload: {
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
            firstName: Joi.string().min(2).max(20).required(),
            lastName: Joi.string().min(2).max(20).required(),
            address: Joi.string().alphanum().max(135).required(),
            city: Joi.string().max(25).required(),
            state: Joi.string().max(2).required(),
            zipcode: Joi.number().max(5).required()
        }
    },
    handler: function (request, reply) {

        // In the version with Travelogue and Mongoose this was all handled by Passport (hence we retrieved
        // Passport and inserted the request and reply variables).
        User.authenticate()(request.payload.email, request.payload.password, function (err, user, message) {

            // There has been an error, do something with it. I just print it to console for demo purposes.
            if (err) {
                console.error(err);
                return reply.redirect('/login');
            }

            // If the authentication failed user will be false. If it's not false, we store the user
            // in our session and redirect the user to the hideout
            if (user) {
                request.auth.session.set(user);
                return reply.redirect('/dashboard');
            }
            return reply(message);

        });
    }
};
