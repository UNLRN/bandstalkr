const express = require('express');
let router = express.Router();
const expressValidator = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET home page. */
router.get('/', function (req, res) {
    res.render('users/register');
});

router.post('/', function (req, res) {

    req.checkBody('username', 'Username field cannot be empty.').notEmpty();
    req.checkBody('username', 'Username must be between 4-25 characters long.').len(4, 25);
    req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
    req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
    req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
    req.checkBody('password', 'Password must include one lowercase character, one uppercase character, a number, and a special character.').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
    req.checkBody('passwordMatch', 'Password must be between 8-100 characters long.').len(8, 100);
    req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password);

    req.sanitize('username').escape();
    req.sanitize('username').trim();
    req.sanitize('email').escape();
    req.sanitize('email').trim();
    req.sanitize('password').escape();
    req.sanitize('password').trim();
    req.sanitize('passwordMatch').escape();
    req.sanitize('passwordMatch').trim();

    const errors = req.validationErrors();

    if (errors) {
        console.log(errors);
        res.render('users/register', {
            errors: errors,
            username: req.body.username,
            email: req.body.email
        })
    };

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;



    const db = require('../../db.js');

    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            db.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hash], function (error, results, fields) {
                if (error) throw error;

                res.redirect('/');
            });
        });
    });


});

module.exports = router;