module.exports = function(app) {
  'use strict';

  app.get('/insecure_script', function(req, res) {
    res.sendFile('helloworld');
  });

  app.get('/another_insecure_script', function(req, res) {
    res.render('helloworld', {name: 'dummy'});
  });
};