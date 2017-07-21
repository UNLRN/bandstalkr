const express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('users/register');
});

router.post('/', (req, res, next) => {
    
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const db = require('../../db.js');

    db.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], function(error, results, fields) {
        if (error) throw error;

        res.redirect('/');
    });
});

module.exports = router;