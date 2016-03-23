var _           = require('lodash')
  , util        = require('util')
  , Promise     = require('bluebird')
  , bcrypt      = Promise.promisifyAll(require('bcrypt'))
  , errorCodes  = require('../../common/errorCodeRegistry')
  , db          = require('../../data/db')
  , usersSchema = require('./usersSchema');

function _hashPassword(user) {
  return new Promise(function (resolve, reject) {
    return bcrypt.hashAsync(user.password, 10)
      .then(function (hash) {
        user.password = hash;
        resolve(user);
      })
      .catch(reject);
  });
}

function _verifyPassword(password, hash) {
  return new Promise(function (resolve, reject) {
    bcrypt.compareAsync(password, hash).then(resolve).catch(reject);
  });
}


exports.findByToken = function findByToken(token) {
  return new Promise(function (resolve, reject) {
    var invalidTokenErr = { code: errorCodes.auth.invalidAuthToken, message: 'Invalid auth token' };
    if (_.isEmpty(token)) { return reject(invalidTokenErr); }
    db.users.findByTokenAsync(token).
      then(function (user) {
        if (_.isEmpty(user)) { return reject(invalidTokenErr); }
        resolve(user);
      })
      .catch(reject);
  });
};


exports.verifyOrCreateAuthToken = function verifyOrCreateAuthToken(attrs, deviceId) {
  return new Promise(function (resolve, reject) {
    var existingToken;
    if (_.isEmpty(deviceId)) { return reject({ code: errorCodes.user.authToken.validationError, message: 'Missing deviceId' }); }

    attrs.authTokens = attrs.authTokens || [];
    existingToken = _.find(attrs.authTokens, function (authToken) { return authToken.device === deviceId; });
    if (_.isEmpty(existingToken)) {
      bcrypt.hashAsync(deviceId, 10)
        .then(function (hash) {
          attrs.authTokens.push({ device: deviceId, token: hash });

          db.users.updateAuthTokens(attrs._id, attrs.authTokens, function (err, user) {
            if (err) { return reject(err); }
            resolve(attrs);
          });
        })
        .catch(reject);
    }
    else {
      resolve(attrs);
    }
  });
};


exports.authenticate = function authenticate(usernameOrEmail, password) {
  return new Promise(function (resolve, reject) {
    var user;
    if (_.isEmpty(usernameOrEmail)) {
      return reject({ code: errorCodes.user.login.invalidUsername, message: 'Invalid username' });
    }
    if (_.isEmpty(password)) {
      return reject({ code: errorCodes.user.login.invalidPassword, message: 'Invalid password' });
    }

    db.users.findByUsernameOrEmailAsync(usernameOrEmail)
      .then(function (result) {
        user = result;
        if (_.isEmpty(user)) {
          return reject({ code: errorCodes.user.login.invalidUsername, message: 'Invalid username' });
        }

        return _verifyPassword(password, user.password);
      })
      .then(function (isValidPassword) {
        if (!isValidPassword) {
          return reject({ code: errorCodes.user.login.invalidPassword, message: 'Invalid password' });
        }
        resolve(user);
      })
      .catch(reject);
  });
};


exports.createUser = function createUser(attrs) {
  attrs = attrs || {};
  return new Promise(function (resolve, reject) {
    if (_.isEmpty(attrs.username)) { return reject({ code: errorCodes.user.create.validationError, message: 'Username is required' }); }
    if (_.isEmpty(attrs.email))    { return reject({ code: errorCodes.user.create.validationError, message: 'Email is required' }); }

    Promise.all([
      db.users.findByUsernameAsync(attrs.username),
      db.users.findByEmailAsync(attrs.email),
    ]).then(function (users) {
        if (!_.isEmpty(users[0]) && !_.isEmpty(users[1])) {
          return reject({ code: errorCodes.user.create.usernameAndEmailTaken, message: 'Given username and email address are already taken' });
        }
        else if (!_.isEmpty(users[0])) {
          return reject({ code: errorCodes.user.create.usernameTaken, message: 'Given username is already taken' });
        }
        else if (!_.isEmpty(users[1])) {
          return reject({ code: errorCodes.user.create.emailTaken, message: 'Given email address is already taken' });
        }
        return usersSchema.validate(attrs);
      })
      .then(_hashPassword)
      .then(function (attrs) {
        db.users.save(attrs, function (err, user) {
          if (err) { return reject(err); }
          resolve(user);
        });
      })
      .catch(function (err) {
        return reject({ code: errorCodes.user.create.validationError, message: err.message });
      });
  });
};
