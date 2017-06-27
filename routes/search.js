const express = require('express');
const router = express.Router();
const request = require('request');


router.get('/', function(req, res, next) {
  res.render('search');
});

router.post('/', function (req, res, next) {
    const band = req.param('q');


    var client_id = '8f01408378c5438096f5f11e50a9d395';
    var client_secret = 'cb37a328aaa84304aefdbe043f993412';

    // your application requests authorization
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {

            // use the access token to access the Spotify Web API
            var token = body.access_token;
            
            var options = {
                url: 'https://api.spotify.com/v1/search?q='+band+'*&type=artist',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                json: true
            };
            request.get(options, function (error, response, body) {
                let html = "";
                for (var index = 0; index < body.artists.items.length; index++) {
                    var element = body.artists.items[index];
                    let artist = element.name;
                    let id = element.id;
                    html += `<li><a href="#" class="search-results" artistid="${id}">${artist}</a></li>`;
                }
                res.send(html);
            });
        }
    });

});

module.exports = router;