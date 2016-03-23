var Promise     = require('bluebird')
  , db          = require('../../data/db');


exports.findAllBalance = function findAllBalance(userId) {
  return new Promise(function (resolve, reject) {
    userId  = db.ObjectID(userId);

    db.balance.findAllAsync(userId)
      .then(function (balances) {
        resolve(balances);
      })
      .catch(reject);

  });
};
