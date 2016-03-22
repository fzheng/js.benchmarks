/**
 *
 * HANDLER (controller) : User
 *
 * @param request
 * @param reply
 */


// Include the mysql connection
var db = require('../../datastores/mysql.js');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

// move to ENV_VAR
var secret = "981u2976564356455687tuyukbhj12m"; // Don't use this in PROD



/**
 *
 * Generate a JWT Token on successful login
 *
 * @param req
 */

function generateJwtToken(req, userData) {

    var token = jwt.sign({

            uuid: userData.uuid,
            roles: userData.roles,
            agent: req.headers['user-agent'],
            exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60,// Note: in seconds!



            //currentTime.setDate(currentTime.getDate()+14);


        }, secret
    ); // secret is defined in the environment variable JWT_SECRET

    return token

}


/**
 *
 * Validate Auth Request
 *
 * @param request
 * @param reply
 *
 *
 */

exports.validate = function (request, reply) {


    db.con.query('SELECT * FROM users where mail = ? limit 1',
        [
            request.payload.email,

        ],
        function (err, results) {

            if (err) throw err;

            if (typeof results[0] !== 'undefined') {

                var password = request.payload.password;

                var hash = results[0].pass;

                var passChecked = bcrypt.compareSync(password, hash); // true

                if (passChecked === true) {

                    // Generate JWT Token
                    var token = generateJwtToken(request, results[0]);

                    reply(token);

                } else {

                    reply(false);

                }

            } else {
                reply(false);
            }

        });

};


/**
 *
 * Remove related Tokens from Auth datastore...
 *
 * @param request
 * @param reply
 */
exports.logout = function (request, reply) {


    db.con.query('SELECT * FROM users WHERE id = ?', [request.params.id], function (err, result) {
        if (err) throw err;

        console.log('Data received from Db:\n');

        reply(result);

    });


};


/**
 *
 * Validate the User
 *
 * @param request
 * @param reply
 */
exports.me = function (request, reply) {



    db.con.query('SELECT * FROM users WHERE id = ?', [request.params.id], function (err, result) {
        if (err) throw err;

        console.log('Data received from Db:\n');

        reply(result);

    });


};
