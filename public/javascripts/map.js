"use strict";

function initialize() {
    const artist = window.location.pathname.split("/").pop();

    let style = [
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "saturation": 36
                },
                {
                    "color": "#000000"
                },
                {
                    "lightness": 40
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#000000"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 17
                },
                {
                    "weight": 1.2
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "administrative.neighborhood",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                },
                {
                    "color": "#797979"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#151515"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#151515"
                }
            ]
        },
        {
            "featureType": "landscape.natural.landcover",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape.natural.landcover",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#151515"
                }
            ]
        },
        {
            "featureType": "landscape.natural.landcover",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#151515"
                }
            ]
        },
        {
            "featureType": "landscape.natural.terrain",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#151515"
                }
            ]
        },
        {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#151515"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "lightness": 21
                },
                {
                    "color": "#151515"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#151515"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#151515"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 17
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 29
                },
                {
                    "weight": 0.2
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#be3e08"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#be3e08"
                },
                {
                    "lightness": 18
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#000000"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                },
                {
                    "color": "#ff0000"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#be3e08"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#000000"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 19
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                },
                {
                    "lightness": 17
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#151515"
                }
            ]
        }
    ];

    let mapOptions = {
        scrollwheel: false,
        styles: style,
        zoom: 6,
        center: new google.maps.LatLng(33.7490, -84.3880),
    };

    let bandstalkerMap = new google.maps.Map(document.getElementById("map"), mapOptions);

    let image = {
        url: '/images/placeholder.png',
        size: new google.maps.Size(48, 48),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(24, 48)
    }

    let infowindow = new google.maps.InfoWindow({
        maxWidth: 200,
    });

    $.ajax({
        method: 'POST',
        url: `/events/${artist}`,
    }).then(function (data) {
        for (let index = 0; index < data.length; index++) {
            let element = data[index];

            let latLng = new google.maps.LatLng(element.lat, element.lng);
            let marker = new google.maps.Marker({
                map: bandstalkerMap,
                position: latLng,
                icon: image,
                title: element.venue,
                eventContent: element.info
            });

            google.maps.event.addListener(marker, 'click', function () {
                console.log(infowindow.getPosition());
                bandstalkerMap.setCenter(this.getPosition());
                infowindow.setContent(this.eventContent);
                infowindow.open(bandstalkerMap, this);
            })

            window.bandstalker.eventMarkers.push(marker);
        }
    });
}

// function addMarkers(data, map) {
//     for (let index = 0; index < data.length; index++) {
//         let element = data[index];

//         let latLng = new google.maps.LatLng(element.lat, element.lng);
//         let marker = new google.maps.Marker({
//             map: map,
//             position: latLng,
//             icon: image,
//             title: element.venue,
//             eventContent: element.info
//         });

//         google.maps.event.addListener(marker, 'click', function () {
//             console.log(infowindow.getPosition());
//             map.setCenter(this.getPosition());
//             infowindow.setContent(this.eventContent);
//             infowindow.open(map, this);
//         })

//         window.bandstalker.eventMarkers.push(marker);
//     }
// }