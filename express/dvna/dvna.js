var ws = require('ws');
var fs = require('fs');
var path = require('path');
var express = require('express');
var md = require('marked');
var bodyParser = require('body-parser');

var challenge_token = require('./lib/challenge_token');

var DVNA = express();
var port = process.env.PORT || 3000;

var vulnerabilities = [];
var vulnerabilities_path = './vulnerabilities/';

//fs.readdir(vulnerabilities_path, function (err, folders) {
//  if (err) {
//    throw err;
//  }
//
//  DVNA.set('vulnerabilities', vulnerabilities);
//
//  folders.map(function (folder) {
//    return path.join(vulnerabilities_path, folder);
//  }).filter(function (folder) {
//    return !fs.statSync(folder).isFile();
//  }).forEach(function (folder) {
//    console.log("Loading vulnerability '%s'...",  folder);
//
//    var vulnerability_id = path.basename(folder);
//    var vulnerability_path = path.join(folder, 'vulnerability.js');
//    var challenge_path = path.join(folder, 'challenge.md');
//    var hint_path = path.join(folder, 'hint.md');
//
//    var vulnerability = require('./' + vulnerability_path);
//    var challenge = fs.readFileSync(challenge_path, 'utf8');
//    var hint = fs.readFileSync(hint_path, 'utf8');
//
//    vulnerability.id = vulnerability_id;
//    vulnerability.path = vulnerability_id;
//    vulnerability.challenge = challenge;
//    vulnerability.hint = hint;
//
//    console.log("Generating challenge token for '%s'...",  vulnerability.id);
//    vulnerability.challenge_token = challenge_token(vulnerability.id);
//
//    vulnerabilities.push(vulnerability);
//
//    if (vulnerability.server) {
//      console.log("Mounting it in '/%s'...",  vulnerability.path);
//      DVNA.use('/' + vulnerability.path, vulnerability.server);
//    }
//  });
//});

var vulnerability;
DVNA.set('vulnerabilities', vulnerabilities);

vulnerability = require('./vulnerabilities/command_injection/vulnerability');
DVNA.use('/command_injection', vulnerability.server);

vulnerability = require('./vulnerabilities/cross_site_request_forgery/vulnerability');
DVNA.use('/cross_site_request_forgery', vulnerability.server);

vulnerability = require('./vulnerabilities/denial_of_service/vulnerability');
DVNA.use('/denial_of_service', vulnerability.server);

vulnerability = require('./vulnerabilities/directory_traversal/vulnerability');
DVNA.use('/directory_traversal', vulnerability.server);

vulnerability = require('./vulnerabilities/eval_remote_code_execution/vulnerability');
DVNA.use('/eval_remote_code_execution', vulnerability.server);

vulnerability = require('./vulnerabilities/global_namespace_pollution/vulnerability');
DVNA.use('/global_namespace_pollution', vulnerability.server);

vulnerability = require('./vulnerabilities/information_disclosure/vulnerability');
DVNA.use('/information_disclosure', vulnerability.server);

vulnerability = require('./vulnerabilities/invalid_redirects/vulnerability');
DVNA.use('/invalid_redirects', vulnerability.server);

vulnerability = require('./vulnerabilities/parameter_pollution/vulnerability');
DVNA.use('/parameter_pollution', vulnerability.server);

vulnerability = require('./vulnerabilities/proto_abuse/vulnerability');
DVNA.use('/proto_abuse', vulnerability.server);

vulnerability = require('./vulnerabilities/proto_inheritance/vulnerability');
DVNA.use('/proto_inheritance', vulnerability.server);

vulnerability = require('./vulnerabilities/regex_dos/vulnerability');
DVNA.use('/regex_dos', vulnerability.server);

vulnerability = require('./vulnerabilities/scope_violation/vulnerability');
DVNA.use('/scope_violation', vulnerability.server);

vulnerability = require('./vulnerabilities/sql_injection/vulnerability');
DVNA.use('/sql_injection', vulnerability.server);

vulnerability = require('./vulnerabilities/websocket_memory_disclosure/vulnerability');
DVNA.use('/websocket_memory_disclosure', vulnerability.server);

vulnerability = require('./vulnerabilities/xss_reflected/vulnerability');
DVNA.use('/xss_reflected', vulnerability.server);

DVNA.set('view engine', 'jade');
DVNA.use('/assets', express.static('public'));
DVNA.use(bodyParser.urlencoded({ extended: true }));

DVNA.get('/', function (req, res) {
  var data = {
    vulnerabilities: vulnerabilities
  };

  res.render('dvna', data);
});

DVNA.locals.md = md;

DVNA.get('/:vulnerability/challenge', function (req, res) {
  var vulnerability = req.app.set('vulnerabilities').filter(function (vulnerability) {
    return vulnerability.path  === req.params.vulnerability;
  })[0];

  res.render('vulnerability', {
    challenge: vulnerability.challenge
  });
});

DVNA.post('/:vulnerability/challenge', function (req, res) {
  var vulnerability = req.app.set('vulnerabilities').filter(function (vulnerability) {
    return vulnerability.path  === req.params.vulnerability;
  })[0];

  if (req.body.challenge_token === vulnerability.challenge_token) {
    vulnerability.passed = true;
  }

  res.redirect('/');
});

DVNA.set('port', port);
DVNA.listen(port, function welcome () {
  console.log("   ______            _        _______ ");
  console.log("  (  __  \\ |\\     /|( (    /|(  ___  )");
  console.log("  | (  \\  )| )   ( ||  \\  ( || (   ) |");
  console.log("  | |   ) || |   | ||   \\ | || (___) |");
  console.log("  | |   | |( (   ) )| (\\ \\) ||  ___  |");
  console.log("  | |   ) | \\ \\_/ / | | \\   || (   ) |");
  console.log("  | (__/  )  \\   /  | )  \\  || )   ( |");
  console.log("  (______/    \\_/   |/    )_)|/     \\|");

  console.log("\r\n   Damn Vulnerable Node Application ");

  console.log("  https://github.com/quantumfoam/DVNA \r\n");
  console.log("DVNA listening at: http://127.0.0.1:" + port + "/");
});
