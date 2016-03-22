/**
 *
 * HANDLER (controller) : Bookmark
 *
 * @param request
 * @param reply
 */


// Include the mysql connection
var db = require('../../datastores/mysql.js');


/**
 *
 * Find
 *
 * @param request
 * @param reply
 */
exports.find = function (request, reply) {

    var sql = 'SELECT * FROM bookmarks';
    var params = [];


    db.con.query('SELECT * FROM bookmarks', function (err, results) {
        if (err) throw err;

        console.log('Data received from Db:\n');

        reply(results);

    });


};


/**
 *
 * Find single item
 *
 * @param request
 * @param reply
 */
exports.findOne = function (request, reply) {


    db.con.query('SELECT * FROM bookmarks WHERE id = ?', [request.params.id], function (err, result) {
        if (err) throw err;

        console.log('Data received from Db:\n');

        reply(result);

    });


};


/**
 *
 * Find bookmarks by user
 *
 * @param request
 * @param reply
 */
exports.findByUser = function (request, reply) {


    db.con.query('SELECT * FROM bookmarks WHERE uid = ?', [request.params.uid], function (err, results) {
        if (err) throw err;

        console.log('Data received from Db:\n');

        reply(results);

    });


};


/**
 *
 * Create a single item
 *
 * @param request
 * @param reply
 */
exports.create = function (request, reply) {


    db.con.query('INSERT INTO bookmarks (uid, url, title) VALUES (?, ?, ?)', [

        request.payload.uid,
        request.payload.url,
        request.payload.title


    ], function (err, results) {

        if (err) throw err;

        console.log('Data saved to db:\n');

        reply({status: 'ok'});

    });


};



/**
 *
 * Delete a single item
 *
 * @param request
 * @param reply
 */
exports.delete = function (request, reply) {


    db.con.query('DELETE from bookmarks WHERE (id) VALUES (?, ?, ?)', [

        request.payload.uid,
        request.payload.url,
        request.payload.title


    ], function (err, results) {

        if (err) throw err;

        console.log('Data saved to db:\n');

        reply({status: 'ok'});

    });


};



