//This is a positive example. Although, part of the user input is passed into res.redirect, 
//an attack is not possible, because the code validates if the value is in the map.

module.exports = function(app) {
  'use strict';

  const urlMap = {
    "home": "http://mysite.com/",
    "confirm": "http://mysite.com/confirmation/",
    "logout": "http://mysite.com/logout",
    "partner1": "http://partner1.com/"
  };

  app.get('/', function(req, res) {
    var url = urlMap[res.param.url];
    if (url !== undefined) {
      res.redirect(urlMap[res.params.url]);
    } else {
      res.redirect(urlMap["home"]);
    }
  });
};