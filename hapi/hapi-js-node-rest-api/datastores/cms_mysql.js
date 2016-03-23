var mysql = require("mysql"),
    settings = require("../settings/config.js");

// First you need to create a connection to the db
var con = mysql.createConnection({

    host: settings.cms_mysql.host,
    user: settings.cms_mysql.username,
    password: settings.cms_mysql.password,
    database: settings.cms_mysql.database

});

con.connect(function (err) {
    if (err) {
        console.log('Error connecting to mysql-db');
        return;
    }
    console.log('CMS : mysql-db connection established');
});

//con.end(function(err) {
//    // The connection is terminated gracefully
//    // Ensures all previously enqueued queries are still
//    // before sending a COM_QUIT packet to the MySQL server.
//});


module.exports = {
    con: con
}