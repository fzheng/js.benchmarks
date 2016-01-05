module.exports = function(app) {
  'use strict';

  // ==== case 1: using helmet ====
  var helmetImport = require('helmet');
  //app.use(helmetImport.hidePoweredBy());

  // ==== case 2: using X-Powered-By flag ====
  //app.disable('X-Powered-By');
};