var express = require('express');
var app = express();

//true negative
//trigger should not fire, because this is not a session cookie 
res.cookie('viewed_ad_id', '12345678', { domain: '.example.com', path: '/admin', httpOnly: false }); 