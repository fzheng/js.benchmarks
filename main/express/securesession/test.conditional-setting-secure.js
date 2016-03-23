//this test case may be both a positive and a negative example, since the secure flag is set based on the condition

module.exports = function(app, session) {
  var sess = {
    secret: 'keyboard cat',
    cookie: {}
  };

  if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
  }

  app.use(session(sess));

  app.get('/', function(req, res) {
    res.send('Hello World');
  });
};