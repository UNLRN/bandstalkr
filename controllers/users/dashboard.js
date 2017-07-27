const path = require('path');
const express = require('express');
var router = express.Router();
const isAuth = require(path.join('middleware', 'isAuth.js'));

router.get('/', isAuth(), function(req, res) {
	res.render('users/dashboard');
});

module.exports = router;