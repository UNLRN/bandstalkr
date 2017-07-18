const express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('users/register');
});

router.post('/', (req, res, next) => {
    console.log(req.body.username);
    
    const db = require('../../db.js');

    res.redirect('/');
});

module.exports = router;