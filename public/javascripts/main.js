"use strict";

function bandstalker() {

    this.eventMarkers = [];

    this.document = $(document);

    this.artist = $('#artist-name > h4').text();

    this.searchInput = $('#search');
    this.searchIcon = $('.fa-search');

    this.overlaySearchContainer = $('#overlay-search-container');
    this.overlaySearchInput = $('#overlay-search-input');
    this.overlaySearchClose = $('#overlay-search-close');
    this.overlaySearchResults = $('#overlay-search-results');

    this.bio = $('#bio');
    this.tracks = $('#tracks');
    this.albums = $('#albums');
    this.events = $('#event-container');

    this.toggleButton = $('.toggle-button');
    this.artistMain = $('#main');

    this.searchInput.on('focus', this.showSearch.bind(this));
    this.searchIcon.on('click', this.showSearch.bind(this));
    this.overlaySearchInput.on('keydown', _.debounce(this.search.bind(this), 200));
    this.overlaySearchClose.on('click', this.closeSearch.bind(this));
    this.toggleButton.on('click', this.toggleInfo.bind(this));
}

bandstalker.prototype.showSearch = function () {
    this.overlaySearchContainer.css('transform', 'scale(1)');
    this.overlaySearchInput.focus();
};

bandstalker.prototype.closeSearch = function () {
    this.overlaySearchContainer.css('transform', 'scale(0)');
    this.overlaySearchInput.val('');
    this.overlaySearchResults.empty();
};

bandstalker.prototype.toggleInfo = function () {
    this.artistMain.toggleClass("in");
    this.toggleButton.toggleClass("on");
};

bandstalker.prototype.search = function () {
    let $this = this;
    let artist = this.overlaySearchInput.val().trim();
    $.ajax({
        method: 'POST',
        url: `/search/${artist}`,
    }).then(function (html) {
        $this.overlaySearchResults.html(html);
    });
};

// bandstalker.prototype.populateEvents = function (artist) {
//     let $this = this;
//     $.ajax({
//         method: 'POST',
//         url: `/events/${artist}`,
//     }).then(function (data) {
//         let image = {
//             url: '/images/placeholder.png',
//             size: new google.maps.Size(48, 48),
//             origin: new google.maps.Point(0, 0),
//             anchor: new google.maps.Point(24, 48)
//         }

//         for (let index = 0; index < data.length; index++) {
//             let element = data[index];

//             let latLng = new google.maps.LatLng(element.lat, element.lng);
//             let marker = new google.maps.Marker({
//                 map: map,
//                 position: latLng,
//                 icon: image,
//                 title: element.venue,
//                 eventContent: element.info
//             });

//             google.maps.event.addListener(marker, 'click', function () {
//                 console.log($this.infowindow.getPosition());
//                 map.setCenter(this.getPosition());
//                 $this.infowindow.setContent(this.eventContent);
//                 $this.infowindow.open(map, this);
//             })

//             $this.eventMarkers.push(marker);
//         }
//     });
// };

bandstalker.prototype.clearMarkers = function () {
    let $this = this;
    if ($this.eventMarkers.length > 0) {
        for (let index = 0; index < $this.eventMarkers.length; index++) {
            $this.eventMarkers[index].setMap(null);
        }
    }
    $this.eventMarkers = [];
};

$(document).ready(function () {
    window.bandstalker = new bandstalker();
    // window.bandstalker.populateEvents(window.bandstalker.artist);
});