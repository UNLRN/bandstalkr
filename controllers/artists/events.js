const express = require('express');
const router = express.Router();

router.post('/', function (req, res) {

	const artist = req.query.artist;
	// EVENTS
	let eventOptions = {
		url: 'https://rest.bandsintown.com/artists/' + artist + '/events?app_id=bootcamp',
		json: true
	};
	request.get(eventOptions, function (error, response, body) {
		let eventsArray = [];
		let html = "";
		for (let index = 0; index < body.length; index++) {
			let date = moment(body[index].datetime);
			let element = body[index].venue;
			let venue = element.name;
			let city = element.city;
			let region = element.region;
			let country = element.country;
			let latitude = element.latitude;
			let longitude = element.longitude;
			let url = body[index].url;
			let month = date.format('MMM');
			let day = date.format('D');
			let info = `<div id="infowindow">
                            <h3>${artist}</h3>
                            <div id="content">
                                <div>
                                    <h5>${month} ${day}</h5>
                                    <h6>${venue}</h6>
                                    <h6>${city} ${region} ${country}</h6>
                                </div>
                                <div class="map-ticket">
                                    <a href="${url}">tickets</a>
                                </div>
                            </div>
                        </div>`;

			eventsArray.push({
				venue: venue,
				lat: latitude,
				lng: longitude,
				info: info
			});

			res.send(eventsArray);
		}
	})
	
})