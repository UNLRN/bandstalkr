const express = require('express');
const router = express.Router();
const request = require('request');


router.get('/', function (req, res) {
    res.render('search');
});

router.post('/:id', function (req, res) {
    const id = req.params.id;


    const client_id = '8f01408378c5438096f5f11e50a9d395';
    const client_secret = 'cb37a328aaa84304aefdbe043f993412';

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
                url: 'https://api.spotify.com/v1/artists/' + id,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                json: true
            };
            request.get(options, function (error, response, body) {
                res.send(body);
            });
        }
    });
});

router.post('/:id/related', function (req, res) {
    const artistID = req.params.id;


    const client_id = '8f01408378c5438096f5f11e50a9d395';
    const client_secret = 'cb37a328aaa84304aefdbe043f993412';

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

            // albums
            var options = {
                url: 'https://api.spotify.com/v1/artists/' + artistID + '/related-artists',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                json: true
            };
            request.get(options, function (error, response, body) {

                var resObj = [];

                for (var i = 0; i < body.artists.length; i++) {
                    var artistName = body.artists[i].name;
                    var artistImage = body.artists[i].images;
                    var artistURL = body.artists[i].external_urls.spotify;
                    var artistGenres = body.artists[i].genres;

                    var temp = {
                        artist: artistName,
                        image: artistImage,
                        url: artistURL,
                        genres: artistGenres
                    }

                    resObj.push(temp);
                }

                res.send(resObj);
            });
        }
    });
});

router.post('/:id/albums', function (req, res) {
    const artistID = req.params.id;


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

            // albums
            var options = {
                url: 'https://api.spotify.com/v1/artists/' + artistID + '/albums',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                json: true
            };
            request.get(options, function (error, response, body) {

                var resObj = [];

                for (var i = 0; i < body.items.length; i++) {
                    var albumName = body.items[i].name;
                    var albumURL = body.items[i].external_urls.spotify;
                    var albumImage = body.items[i].images;

                    var temp = {
                        album: albumName,
                        image: albumImage,
                        url: albumURL
                    }

                    resObj.push(temp);
                }

                res.send(resObj);
            });
        }
    });
});

router.post('/:id/tracks', function (req, res) {
    const artistID = req.params.id;

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

            // albums
            var options = {
                url: 'https://api.spotify.com/v1/artists/' + artistID + '/top-tracks?country=US',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                json: true
            };
            request.get(options, function (error, response, body) {

                var resObj = [];

                for (var i = 0; i < body.tracks.length; i++) {
                    var topTrackName = body.tracks[i].name;
                    var topTrackURL = body.tracks[i].external_urls.spotify;

                    var temp = {
                        track: topTrackName,
                        url: topTrackURL
                    }

                    resObj.push(temp);
                }

                res.send(resObj);
            });
        }
    });
});

module.exports = router;