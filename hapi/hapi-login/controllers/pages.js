var User = require('../models/user').User;

/**
 * Handles a call to / and shows some text with links to login and registration
 */
exports.index = {
	auth: {
		mode: 'try',
		strategy: 'session'
	},
	handler: function (request, reply) {

		if (request.auth.isAuthenticated) {
			// The user is already logged in, redirect it to the dashboard
			return reply.redirect('/dashboard');
		}
        return reply.view('index');
	}
};

/**
 * Handles a call to /login and shows a login form
 */
exports.login = {
	auth: {
		mode: 'try',
		strategy: 'session'
	},
	handler: function (request, reply) {

		if (request.auth.isAuthenticated) {
			// The user is already logged in, redirect it to the dashboard
			return reply.redirect('/dashboard');
		}

   		return reply.view('templates/login');
	}
};

/**
 * Handles a call to /signup and shows a registration form
 */
exports.signup = {
	auth: {
		mode: 'try',
		strategy: 'session'
	},
	handler: function (request, reply) {

		if (request.auth.isAuthenticated) {
			// The user is already logged in, redirect it to the dashboard
			return reply.redirect('/dashboard');
		}

    	return reply.view('templates/signup');
	}
};

/**
 * Handles a call to /dashboard
 */
exports.dashboard = {
	auth: 'session',

	handler: function (request, reply) {
    	return reply.view('templates/dashboard');
	}
};

/**
 * Handles all assets related to public files so no 403 errors will result
 */
exports.assets = {
	handler: {
		directory: {
			path: './public'
		}
	}
};


exports.about = {
	auth: {
		mode: 'try',
		strategy: 'session'
	},
	handler: function (request, reply) {

		return reply.view('templates/about');
	}
};

exports.contact = {
	auth: {
		mode: 'try',
		strategy: 'session'
	},
	handler: function (request, reply) {

		return reply.view('templates/contact');
	}
};

exports.profile = {
    auth: {
        mode: 'try',
        strategy: 'session'
    },
    handler: function (request, reply) {

        if (request.auth.isAuthenticated) {
        	// The user is already logged in, redirect it to the dashboard
            var user;
            return reply.view('templates/profile');
        }

        return reply.view('templates/login');
    }
};
