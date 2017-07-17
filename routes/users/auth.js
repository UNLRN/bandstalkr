import express from 'express';
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let user = firebase.auth().currentUser;
        if (user !== null) {
            req.user = user;
            next();
        } else {
            res.redirect('/login');
        }
});

module.exports = router;