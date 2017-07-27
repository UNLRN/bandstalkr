const express = require('express');
let router = express.Router();
const expressValidator = require('express-validator');
const passport = require('passport');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('../../db.js');

/* GET home page. */
router.get('/', function (req, res) {
    console.log(req.user);
    console.log(req.isAuthenticated());
    res.render('users/register');
});

router.post('/', function (req, res) {

    req.checkBody({
        'username': {
            notEmpty: true,
            isLength: {
                options: [{
                    min: 4,
                    max: 25
                }],
                errorMessage: 'Username must be between 4-25 characters long.'
            }
        },
        'email': {
            notEmpty: true,
            isEmail: {
                errorMessage: 'The email you entered is invalid, please try again.'
            },
            isLength: {
                options: [{
                    min: 4,
                    max: 100
                }],
                errorMessage: 'Email addres must be between 4-100 characters long, please try again.'
            }
        },
        'password': {
            notEmpty: true,
            matches: {
                options: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/i],
                errorMessage: 'Password must include one lowercase character, one uppercase character, a number, and a special character'
            },
            isLength: {
                options: [{
                    min: 4,
                    max: 100
                }],
                errorMessage: 'Password must be between 8-100 characters long'
            }
        }
    });

    req.sanitize('username').escape();
    req.sanitize('username').trim();
    req.sanitize('email').escape();
    req.sanitize('email').trim();
    req.sanitize('password').escape();
    req.sanitize('password').trim();

    const errors = req.getValidationResult()
        .then(function (result) {
            if (!result.isEmpty()) {
                if (errors) {
                    console.log(errors);
                    res.render('users/register', {
                        errors,
                        username,
                        email
                    })
                };
                console.log(result.array());
            }
            const username = req.body.username;
            const email = req.body.email;
            const password = req.body.password;

            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    db.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hash], function (error, results, fields) {
                        if (error) throw error;

                        db.query('SELECT LAST_INSERT_ID() as user_id', function(error, results, fields) {
                            if (error) throw error;

                            const user_id = results[0];

                            req.login(user_id, function(err){
                                res.redirect('/');
                            })
                        })
                    });
                });
            });
        })
});

passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
});

module.exports = router;