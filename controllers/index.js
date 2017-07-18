const express = require('express');
var router = express.Router();

router.use('/artists', require('./artists/artists'));
router.use('/search', require('./artists/search'));
router.use('/register', require('./users/register'));
router.use('/login', require('./users/login'));

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {user: req.user});
});

module.exports = router;
