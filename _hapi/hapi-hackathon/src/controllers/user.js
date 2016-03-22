"use strict";

var User = require('src/models/user');
var _ = require('lodash');
var crud = require('libs/controllers/crud');

(function (module) {
	_.extend(module, crud(User));
})(module.exports);