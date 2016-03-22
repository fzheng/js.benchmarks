/**
 * Created by htm on 5/31/15.
 */

'use strict';

var nodemailer = require('nodemailer');
var Config = require('./config');
var sesTransport = require('nodemailer-ses-transport');


var transport = nodemailer.createTransport(sesTransport(
        Config.get('/nodemailer'))
);

var mailOptions = {

};
