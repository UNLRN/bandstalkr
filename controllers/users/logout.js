const express = require('express');
var router = express.Router();
const passport = require('passport');


router.get('/', function(req, res) {
	req.logout();
	req.session.destroy();
	res.redirect('/');
});


module.exports = router;
