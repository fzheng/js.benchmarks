'use strict';

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.sendFile('helloworld');
  });

  app.get('/another', function(req, res) {
    res.render('helloworld', {name: 'dummy'});
  });
};