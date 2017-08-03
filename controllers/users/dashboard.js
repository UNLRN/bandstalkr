const express = require('express');
var router = express.Router();
const isAuth = require('../../middleware/isAuth');

router.get('/', isAuth(), function(req, res) {
	res.render('users/dashboard');
});

module.exports = router;