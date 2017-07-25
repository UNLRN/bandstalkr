"use strict";

function bandstalker() {
    this.document = $(document);

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

$(document).ready(function () {
    window.bandstalker = new bandstalker();
    window.bandstalker.showSearch();
    // window.bandstalker.populateEvents(eventData.eventsArray);
});