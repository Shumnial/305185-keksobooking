'use strict';
var mapFilters = document.querySelector('.map__filters');
var housingType = document.querySelector('#housing-type');
var housingPrice = document.querySelector('#housing-price');
var housingRooms = document.querySelector('#housing-rooms');
var housingGuests = document.querySelector('#housing-guests');
var housingFeatures = mapFilters.querySelector('.features');

var sortByType = function (element) {
  return housingType.value === element.offer.type;
};

var sortByPrice = function (element) {
  var priceLevel;
  if (element.offer.price < 10000) {
    priceLevel = 'low';
  } else if (element.offer.price >= 10000 && element.offer.price < 50000) {
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
  var featureIncluded = false;
  housingFeatures.forEach(function (feature) {
    if (feature.checked) {
      if (element.offer.features.indexOf(feature.value) !== -1) {
        featureIncluded = true;
      }
    }
  });
  return featureIncluded;
};

sortByType();
sortByGuests();
sortByRooms();
sortByFeatures();
sortByPrice();
