"use strict";
var replyHelper = require('../reply');

var crud = function (Model) {
	var internal = {};

	internal.findOne = function (request, reply) {
		Model.findOne(request.params, 
			replyHelper.findOne(request, reply));
	};

	internal.findById = function (request, reply) {
		Model.findById(request.params._id, 
			replyHelper.findOne(request, reply));
	};

	internal.insert = function (request, reply) {
	 	Model.create(request.payload).then(
			replyHelper.fulfilled(reply),
			replyHelper.rejected(reply)
		);
	};

	internal.update = function (request, reply) {
		Model.findByIdAndUpdate(request.params._id, request.payload,
			 replyHelper.findOne(request, reply));
	};

	internal.upsert = function (request, reply) {
		Model.findOne(request.query, function (err, doc) {
			if (err) {
				return replyHelper.rejected(reply)(err);
			}
			if (!doc) {
				return internal.insert(request, reply);
			}
			return replyHelper.fulfilled(reply)(doc);		
		});
	};

	internal.delete = function (request, reply) {
		Model.findByIdAndRemove(request.params._id, replyHelper.delete(request, reply));
	};

	internal.findAll = function (request, reply) {
		Model.find({}, replyHelper.find(request, reply));
	};

	return internal;
};

module.exports = crud;