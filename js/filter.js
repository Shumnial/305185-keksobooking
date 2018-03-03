'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelectorAll('.features');

  var sortByType = function (element) {
    return housingType.value === element.offer.type;
  };

  var sortByPrice = function (element) {
    var priceLevel;
    if (element.offer.price <= 10000) {
      priceLevel = 'low';
    } else if (element.offer.price >= 10000 && element.offer.price <= 50000) {
      priceLevel = 'middle';
    } else {
      priceLevel = 'high';
    }
    return housingPrice.value === priceLevel;
  };

  var sortByRooms = function (element) {
    return housingRooms.value === element.offer.rooms;
  };

  var sortByGuests = function (element) {
    return housingGuests === element.offer.guests;
  };

  var sortByFeatures = function (element) {
    var featureIncluded = true;
    housingFeatures.forEach(function (feature) {
      if (feature.checked) {
        if (!element.offer.features.indexOf(feature.value) !== -1) {
          featureIncluded = false;
        }
      }
    });
    return featureIncluded;
  };

  window.filter = {
    filterAds: function (cardsArray) {
      if (housingType.value !== 'any') {
        cardsArray = cardsArray.filter(sortByType);
      }
      if (housingPrice.value !== 'any') {
        cardsArray = cardsArray.filter(sortByPrice);
      }
      if (housingRooms.value !== 'any') {
        cardsArray = cardsArray.filter(sortByRooms);
      }
      if (housingGuests.value !== 'any') {
        cardsArray = cardsArray.filter(sortByGuests);
      }
      if (housingFeatures.value !== 'any') {
        cardsArray = cardsArray.filter(sortByFeatures);
      }
      return cardsArray;
    }
  };
})();
