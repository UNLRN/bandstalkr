const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function (req, res) {
	res.render('users/login');
});

router.post('/', passport.authenticate(
	'local', {
		successRedirect: '/dashboard',
		failureRedirect: '/login',
	}
));

module.exports = router;
