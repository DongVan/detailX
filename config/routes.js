module.exports = function(app){
	var connection = require('./database')(app);

	app.get('/', function (req, res) {
		app.set('title', 'My Site');
		res.send('Hello World');
	});

	app.get('/set_session', function (req, res) {
    let sessionData = req.session;
    sessionData.user = {};
    let username = "adam";
    sessionData.user.username = username;
    sessionData.user.salary = 1000;
    console.log("Setting session data:username=%s and salary=%s", username, sessionData.user.salary)

    // res.end('Saved session and salary : ' + sessionData.username);
    res.json(sessionData.user)
	});

	app.get('/get_session', function (req, res) {
    sessionData = req.session;
    if(sessionData && sessionData.user){
      console.log("Setting session data:username=%s and salary=%s", sessionData.user.username, sessionData.user.salary);
    } else{
      console.log("Error!");
    }

    res.end();

    // res.end('Saved session and salary : ' + sessionData.username);
    // res.json(sessionData.user)
	});

	app.get('/destroy_session', function (req, res) {
    let sessionData = req.session;

    sessionData.destroy(function(err) {
      if(err){
        msg = 'Error destroying session';
        res.json(msg);
      }else{
        msg = 'Session destroy successfully';
        console.log(msg)
        res.json(msg);
      }
    });
	});

	app.get('/user', function (req, res) {
		connection.connect();
		connection.query('SELECT * from customer', function (err, rows, fields) {
			if (err) throw err
			// res.json(JSON.stringify(rows));
			res.send(JSON.stringify(rows));
			res.end();
		});
		connection.end();
	});

	app.post('/post_user', function (req, res) {
		// var username = req.body.username;
		//
		// console.log(req.body);
		// console.log(username);
		// username = username ? username : 'TEXT';
		// var data = {'username': username};
		// //console.log(req.body);
		// //console.log(username);
		// //console.log('Send');
		connection.connect();
		connection.query('SELECT * from customer', function (err, rows, fields) {
			if (err) throw err
			res.json(JSON.stringify(rows));
			res.end();
		});
		connection.end();
	});
}
