var _       = require('lodash')
  , Joi     = require('joi')
  , Promise = require('bluebird')
  , balanceSchema;

balanceSchema = Joi.object().keys({
  _id       : Joi.any(),
  dateAdded : Joi.date().required().label('Transaction date'),
  amount    : Joi.number().greater(0).required().label('Transaction amount'),
  userId    : Joi.any().required().label('User Id')
});

function _itemToApiJson(balanceObject) {
  balanceObject = balanceObject || {};

  return _.chain(balanceObject)
    .omit('_id', 'userId')
    .assign({ id: balanceObject._id })
    .value();
}

function _collectionToApiJson(balanceList) {
  return _.map(balanceList, _itemToApiJson);
}

function _validateItem(balanceObject) {
  return new Promise(function (resolve, reject) {
    Joi.validate(balanceObject, balanceSchema, function (err, value) {
      if (err) { return reject(err); }
      resolve(value);
    });
  });
}

function _validateCollection(balanceList) {
  return Promise
    .map(balanceList, _validateItem)
    .all();
}

exports.validate = function validate(balanceList) {
  return _.isArray(balanceList) ? _validateCollection(balanceList) : _validateItem(balanceList);
};

exports.toApiJson = function toApiJson(balanceList) {
  return _.isArray(balanceList) ? _collectionToApiJson(balanceList) : _itemToApiJson(balanceList);
};
