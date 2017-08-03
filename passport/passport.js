const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
	function (username, password, done) {
		console.log(username, password);

		const db = require('./db.js');

		db.query('SELECT id, password FROM users WHERE username = ?', [username], function (err, results, fields) {
			if (err) {
				done(err);
			};

			if (results.length === 0) {
				done(null, false);
			} else {
				const hash = results[0].password.toString();

				bcrypt.compare(password, hash, function (err, response) {
					if (response) {
						return done(null, {
							user_id: results[0].id
						});
					} else {
						return done(null, false);
					}
				});
			}
		});
	}));