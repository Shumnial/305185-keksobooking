'use strict';
// Возвращает случайное число в указаном диапазоне
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
// Возвращает случайный элемент массива
var getRandomElement = function (arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
};
// Возвращает массив со случайной длиной
var getRandomLength = function (arr) {
  arr.length = getRandomNumber(1, arr.length);
  return arr;
};
// Перемешивает элементы массива
var shuffleArray = function (arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var num = getRandomNumber(0, i);
    var d = arr[num];
    arr[num] = arr[i];
    arr[i] = d;
  }
  return arr;
};
// Генерирует рандомные объявления
var generatedAds = [];
var generateRandomAds = function () {
  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var types = ['flat', 'house', 'bungalo'];
  var clocks = ['12:00', '13:00', '14:00'];
  for (var i = 0; i < 8; i++) {
    var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
    var ads = {
      'author': {
        'avatar': 'img/avatars/user' + 0 + getRandomNumber(1, 8) + '.png'
      },
      'offer': {
        'title': getRandomElement(titles),
        'address': location.x + ', ' + location.y,
        'price': getRandomNumber(1000, 1000000),
        'type': getRandomElement(types),
        'rooms': getRandomNumber(1, 5),
        'guests': getRandomNumber(1, 3),
        'checkin': getRandomElement(clocks),
        'checkout': getRandomElement(clocks),
        'features': getRandomLength(features),
        'description': '',
        'photos': shuffleArray(photos)
      },
      'location': {
        'x': getRandomNumber(300, 900),
        'y': getRandomNumber(150, 500)
      }
    };
    generatedAds[i] = ads;
  }
};
generateRandomAds();

var fillPinsTemplate = function () {
  var template = document.querySelector('#map-template');
  var button = template.content.querySelector('.map__pin');
  var img = button.querySelector('img');
  var fragment = document.createDocumentFragment();
  var mapPins = document.querySelector('.map__pins');
  generatedAds.forEach(function (element, i, arr) {
    button.style.left = arr[i].location.x - 25 + 'px';
    button.style.top = arr[i].location.y + 70 + 'px';
    img.setAttribute('src', arr[i].author.avatar);
    fragment.appendChild(button.cloneNode(true));
  });
  mapPins.appendChild(fragment);
};
fillPinsTemplate(generatedAds);
var fillFeatureField = function (arr) {
  var template = document.querySelector('#map-template');
  var popupFeatures = template.content.querySelector('.popup__features');
  for (var i = 0; i < arr[0].offer.features.length; i++) {
    var newElement = document.createElement('li');
    newElement.classList.add('feature');
    newElement.classList.add('feature--' + arr[0].offer.features[i]);
    popupFeatures.appendChild(newElement.cloneNode(true));
  }
};
var fillAdsTemplate = function () {
  var template = document.querySelector('#map-template');
  var mapCard = template.content.querySelector('.map__card');
  var map = document.querySelector('.map');
  var title = template.content.querySelector('h3');
  var address = template.content.querySelector('p > small');
  var price = template.content.querySelector('.popup__price');
  var type = template.content.querySelector('h4');
  var roomsAndGuests = template.content.querySelectorAll('p')[2];
  var checkinAndCheckout = template.content.querySelectorAll('p')[3];
  title.textContent = generatedAds[0].offer.title;
  address.textContent = generatedAds[0].offer.address;
  price.textContent = generatedAds[0].offer.price + ' \u20bd' + '/ночь';
  type.content = generatedAds[0].offer.type;
  roomsAndGuests.textContent = generatedAds[0].offer.rooms + ' комнаты для ' + generatedAds[0].offer.guests + ' гостей';
  checkinAndCheckout.textContent = 'Заезд после ' + generatedAds[0].offer.checkin + ' выезд до ' + generatedAds[0].offer.checkout;
  fillFeatureField(generatedAds);
  map.appendChild(mapCard);
};
fillAdsTemplate();
