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
var map = document.querySelector('.map');
var template = document.querySelector('#map-template');
var mapCard = template.content.querySelector('.map__card');
var title = mapCard.querySelector('h3');
var address = mapCard.querySelector('p > small');
var price = mapCard.querySelector('.popup__price');
var roomsAndGuests = mapCard.querySelectorAll('p')[2];
var checkinAndCheckout = mapCard.querySelectorAll('p')[3];
var description = mapCard.querySelectorAll('p')[4];
var popupPictures = mapCard.querySelector('.popup__pictures');
var photo = mapCard.querySelector('.popup__pictures').children[0].children[0].cloneNode();
var popupFeatures = mapCard.querySelector('.popup__features');
var type = mapCard.querySelector('h4');
var mainPin = document.querySelector('.map__pin--main');
var noticeForm = document.querySelector('.notice__form');
var mapPins = map.querySelector('.map__pins');
var popupClose = mapCard.querySelector('.popup__close');
// Заполняет клонированную ноду шаблона с метками
var fillPinsTemplate = function () {
  var button = template.content.querySelector('.map__pin').cloneNode(true);
  var img = button.querySelector('img');
  var fragment = document.createDocumentFragment();
  window.data.generatedAds.forEach(function (element, i) {
    button.style.left = element.location.x - 25 + 'px';
    button.style.top = element.location.y + 70 + 'px';
    img.setAttribute('src', element.author.avatar);
    var pinNode = button.cloneNode(true);
    pinNode.addEventListener('click', function () {
      onPinClick(i);
    });
    fragment.appendChild(pinNode);
  });
  mapPins.appendChild(fragment);
};
// Заполняет клонированную ноду шаблона с объявлением
var fillAdsTemplate = function (arr) {
  title.textContent = arr.offer.title;
  address.textContent = arr.offer.address;
  price.textContent = arr.offer.price + ' \u20bd' + '/ночь';
  roomsAndGuests.textContent = arr.offer.rooms + ' комнаты для ' + arr.offer.guests + ' гостей';
  checkinAndCheckout.textContent = 'Заезд после ' + arr.offer.checkin + ' выезд до ' + arr.offer.checkout;
  description.textContent = arr.offer.description;
  type.textContent = adConstants.APARTMENTS_TYPE[arr.offer.type];
  // Заполняет клонированную ноду шаблона с преимуществами
  popupFeatures.textContent = null;
  arr.offer.features.forEach(function (element) {
    var newElement = document.createElement('li');
    newElement.classList.add('feature');
    newElement.classList.add('feature--' + element);
    popupFeatures.appendChild(newElement);
  });
  // Заполняет клонированную ноду шаблона с фотографиями
  popupPictures.children[0].textContent = null;
  for (var i = 0; i < arr.offer.photos.length; i++) {
    photo.setAttribute('src', arr.offer.photos[i]);
    photo.setAttribute('width', 40);
    photo.setAttribute('height', 40);
    popupPictures.children[0].appendChild(photo.cloneNode());
  }
  mapCard.querySelector('img').setAttribute('src', arr.author.avatar);
  map.insertBefore(mapCard, document.querySelector('.map__filters-container'));
};

var onMainPinClick = function () {
  map.classList.remove('map--faded');
  noticeForm.classList.remove('notice__form--disabled');
  var fieldset = noticeForm.querySelectorAll('fieldset');
  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].removeAttribute('disabled');
  }
  noticeForm.querySelector('.form__submit').removeAttribute('disabled');
  noticeForm.querySelector('.form__reset').removeAttribute('disabled');
  fillPinsTemplate();
};
// Заполняет поля карточки в соответствии с тем, на каком пине было произведено нажатие
var onPinClick = function (i) {
  fillAdsTemplate(window.data.generatedAds[i]);
  openPopup();
};
var openPopup = function () {
  mapCard.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};
var closePopup = function () {
  mapCard.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};
var onPopupEscPress = function (evt) {
  window.utils.isEscEvent(evt, closePopup);
};
mainPin.addEventListener('mouseup', onMainPinClick);
popupClose.addEventListener('click', closePopup);
