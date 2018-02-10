'use strict';
// CONSTANTS
var adConstants = {
  OBJECTS_COUNT: 8,
  MIN_PRICE: 1000,
  MAX_PRICE: 1000000,
  MIN_ROOMS: 1,
  MAX_ROOMS: 5,
  MIN_GUESTS: 1,
  MAX_GUESTS: 3,
  MIN_X: 300,
  MAX_X: 900,
  MIN_Y: 300,
  MAX_Y: 900
};
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
// Убирает вспомогательный класс у блока map
document.querySelector('.map').classList.remove('map--faded');
// Генерирует рандомные объявления
var generatedAds = [];
var generateRandomAds = function () {
  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var types = ['flat', 'house', 'bungalo'];
  var clocks = ['12:00', '13:00', '14:00'];
  for (var i = 0; i < adConstants.OBJECTS_COUNT; i++) {
    var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
    var ads = {
      'author': {
        'avatar': 'img/avatars/user' + 0 + getRandomNumber(1, adConstants.OBJECTS_COUNT) + '.png'
      },
      'offer': {
        'title': getRandomElement(titles),
        'address': location.x + ', ' + location.y,
        'price': getRandomNumber(adConstants.MIN_PRICE, adConstants.MAX_PRICE),
        'type': getRandomElement(types),
        'rooms': getRandomNumber(adConstants.MIN_ROOMS, adConstants.MAX_ROOMS),
        'guests': getRandomNumber(adConstants.MIN_GUESTS, adConstants.MAX_GUESTS),
        'checkin': getRandomElement(clocks),
        'checkout': getRandomElement(clocks),
        'features': getRandomLength(features),
        'description': '',
        'photos': shuffleArray(photos)
      },
      'location': {
        'x': getRandomNumber(adConstants.MIN_X, adConstants.MAX_X),
        'y': getRandomNumber(adConstants.MIN_Y, adConstants.MAX_Y)
      }
    };
    generatedAds[i] = ads;
  }
};
generateRandomAds();
// Заполняет шаблон с метками
var fillPinsTemplate = function () {
  var template = document.querySelector('#map-template');
  var button = template.content.querySelector('.map__pin').cloneNode(true);
  var img = button.querySelector('img');
  var fragment = document.createDocumentFragment();
  var mapPins = document.querySelector('.map__pins');
  generatedAds.forEach(function (element) {
    button.style.left = element.location.x - 25 + 'px';
    button.style.top = element.location.y + 70 + 'px';
    img.setAttribute('src', element.author.avatar);
    fragment.appendChild(button.cloneNode(true));
  });
  mapPins.appendChild(fragment);
};
fillPinsTemplate();
// Заполняет клонированную ноду шаблона с объявлением
var fillAdsTemplate = function () {
  var map = document.querySelector('.map');
  var template = document.querySelector('#map-template');
  var mapCard = template.content.querySelector('.map__card').cloneNode(true);
  var title = mapCard.querySelector('h3');
  var address = mapCard.querySelector('p > small');
  var price = mapCard.querySelector('.popup__price');
  var roomsAndGuests = mapCard.querySelectorAll('p')[2];
  var checkinAndCheckout = mapCard.querySelectorAll('p')[3];
  var description = mapCard.querySelectorAll('p')[4];
  title.textContent = generatedAds[0].offer.title;
  address.textContent = generatedAds[0].offer.address;
  price.textContent = generatedAds[0].offer.price + ' \u20bd' + '/ночь';
  // Заполняет клонированную ноду шаблона с типами апартаментов
  var fillTypeTemplate = function () {
    var type = mapCard.querySelector('h4');
    var appartmentsType = {
      'flat': 'Квартира',
      'house': 'Дом',
      'bungalo': 'Бунгало'
    };
    type.textContent = appartmentsType[generatedAds[0].offer.type];
  };
  fillTypeTemplate();
  roomsAndGuests.textContent = generatedAds[0].offer.rooms + ' комнаты для ' + generatedAds[0].offer.guests + ' гостей';
  checkinAndCheckout.textContent = 'Заезд после ' + generatedAds[0].offer.checkin + ' выезд до ' + generatedAds[0].offer.checkout;
  // Заполняет клонированную ноду шаблона с преимуществами
  var fillFeatureTemplate = function () {
    var popupFeatures = mapCard.querySelector('.popup__features');
    generatedAds[0].offer.features.forEach(function (element) {
      var newElement = document.createElement('li');
      newElement.classList.add('feature');
      newElement.classList.add('feature--' + element);
      popupFeatures.appendChild(newElement);
    });
  };
  fillFeatureTemplate();
  description.textContent = generatedAds[0].offer.description;
  // Заполняет клонированную ноду шаблона с фотографиями
  var fillPhotosTemplate = function () {
    var popupPictures = mapCard.querySelector('.popup__pictures');
    var photo = mapCard.querySelector('.popup__pictures').children[0].children[0];
    for (var i = 0; i < generatedAds[0].offer.photos.length - 1; i++) {
      photo.setAttribute('src', generatedAds[0].offer.photos[i]);
      photo.setAttribute('width', 40);
      photo.setAttribute('height', 40);
      popupPictures.children[0].appendChild(photo.cloneNode());
    }
  };
  fillPhotosTemplate();
  mapCard.querySelector('img').setAttribute('src', generatedAds[0].author.avatar);
  map.appendChild(mapCard);
};
fillAdsTemplate();
