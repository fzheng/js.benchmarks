'use strict';

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.send('Hello World!');
  });

  app.get('/api/users', function(req, res) {
    var user_id = req.query.id;
    var token = req.query.token;
    var geo = req.query.geo;

    res.send(user_id + ' ' + token + ' ' + geo);
  });

  app.get('/api/:version', function(req, res) {
    res.send(req.params.version);
  });

  app.post('/api/users', function(req, res) {
    var user_id = req.body.id;
    var token = req.body.token;
    var geo = req.body.geo;

    res.send(user_id + ' ' + token + ' ' + geo);
  });
};