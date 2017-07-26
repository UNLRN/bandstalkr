const express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
	res.render('users/dashboard');
});


module.exports = router;