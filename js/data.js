'use strict';
(function () {
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
    MIN_Y: 150,
    MAX_Y: 500,
    TITLES: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    TYPES: ['flat', 'house', 'bungalo'],
    CLOCKS: ['12:00', '13:00', '14:00'],
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    APARTMENTS_TYPE: {
      'flat': 'Квартира',
      'house': 'Дом',
      'bungalo': 'Бунгало'
    },
    AVATARS: ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png']
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
    return arr.slice(getRandomNumber(0, arr.length), getRandomNumber(1, arr.length));
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
  shuffleArray(adConstants.AVATARS);
  // Генерирует рандомные объявления
  var generateRandomAds = function () {
    for (var i = 0; i < adConstants.OBJECTS_COUNT; i++) {
      var locationCoords = [getRandomNumber(adConstants.MIN_X, adConstants.MAX_X), getRandomNumber(adConstants.MIN_Y, adConstants.MAX_Y)];
      var ads = {
        'author': {
          'avatar': adConstants.AVATARS[i]
        },
        'offer': {
          'title': getRandomElement(adConstants.TITLES),
          'address': locationCoords[0] + ', ' + locationCoords[1],
          'price': getRandomNumber(adConstants.MIN_PRICE, adConstants.MAX_PRICE),
          'type': getRandomElement(adConstants.TYPES),
          'rooms': getRandomNumber(adConstants.MIN_ROOMS, adConstants.MAX_ROOMS),
          'guests': getRandomNumber(adConstants.MIN_GUESTS, adConstants.MAX_GUESTS),
          'checkin': getRandomElement(adConstants.CLOCKS),
          'checkout': getRandomElement(adConstants.CLOCKS),
          'features': getRandomLength(adConstants.FEATURES),
          'description': '',
          'photos': shuffleArray(adConstants.PHOTOS)
        },
        'location': {
          'x': locationCoords[0],
          'y': locationCoords[1]
        }
      };
      window.data.generatedAds[i] = ads;
    }
  };
  window.data = {
    generatedAds: []
  };
  generateRandomAds();
})();
