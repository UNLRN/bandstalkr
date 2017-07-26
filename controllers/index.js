const express = require('express');
var router = express.Router();

router.use('/artists', require('./artists/artists'));
router.use('/search', require('./artists/search'));

router.use('/dashboard', require('./users/dashboard'));
router.use('/register', require('./users/register'));
router.use('/login', require('./users/login'));

router.get('/', function(req, res) {
  res.render('index', {user: req.user});
});

module.exports = router;
