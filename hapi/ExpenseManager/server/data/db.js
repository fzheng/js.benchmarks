var _                      = require('lodash')
  , Promise                = require('bluebird')
  , mongo                  = require('mongoskin')
  , db                     = mongo.db('mongodb://localhost:27017/expensesmgr', { native_parser: true })
  , usersSchema            = require('../api/users/usersSchema');

db.ObjectID = mongo.ObjectID;

db.bind('users').bind({
  findByUsername: function findByUsername(username, callback) {
    this.findOne({ username: username }, callback);
  },
  findByEmail: function findByEmail(email, callback) {
    this.findOne({ email: email }, callback);
  },
  findByUsernameOrEmail: function findByUsernameOrEmail(usernameOrEmail, callback) {
    this.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] }, callback);
  },
  findByToken: function findByToken(token, callback) {
    this.findOne({ 'authTokens.token': token }, callback);
  },
  updateAuthTokens: function updateAuthTokens(id, authTokens, callback) {
    var self = this;
    this.findOne({ _id: id }, function (err, user) {
      if (err) { return callback(err); }
      user.authTokens = authTokens;
      usersSchema.validate(user)
        .then(function (user) {
          self.save(user, callback);
        })
        .catch(function (err) {
          return callback(err);
        });
    });
  }
});

db.bind('balance').bind({
  findAll: function findAll(userId, callback) {
    var query = { userId: userId };
    this.find(query)
      .toArray(callback);
  }
});


Promise.promisifyAll(db.users);
Promise.promisifyAll(db.balance);

module.exports = db;
