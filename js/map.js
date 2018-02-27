'use strict';
var map = document.querySelector('.map');
var template = document.querySelector('#map-template');
var mapCard = template.content.querySelector('.map__card').cloneNode(true);
var mainPin = document.querySelector('.map__pin--main');
var noticeForm = document.querySelector('.notice__form');
var mapPins = map.querySelector('.map__pins');
var popupClose = mapCard.querySelector('.popup__close');
var guestsCapacity = document.querySelector('#capacity');
var roomNumber = document.querySelector('#room_number');
var apartmentsType = document.querySelector('#type');
var apartmentsPrice = document.querySelector('#price');
var checkinTime = document.querySelector('#timein');
var checkoutTime = document.querySelector('#timeout');
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
// При клике на главный пин убирает оверлей, снимает блокировку с формы и запускает функцию отрисовки пинов
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
  window.card.fillAdsTemplate(window.data.generatedAds[i]);
  openPopup();
};
var onPopupEscPress = function (evt) {
  window.utils.isEscEvent(evt, closePopup);
};
var openPopup = function () {
  mapCard.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};
var closePopup = function () {
  mapCard.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var roomsAndGuestsList = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

var typeAndPrice = {
  'bungalo': ['0'],
  'flat': ['1000'],
  'house': ['5000'],
  'palace': ['10000']
};
var onRoomsChange = function () {
  guestsCapacity.setCustomValidity('');
  if (roomsAndGuestsList[roomNumber.value].indexOf(guestsCapacity.value) === -1) {
    guestsCapacity.setCustomValidity('Количество гостей не может быть больше количества комнат, либо данное жилье не предназначено для гостей (100 комнат)');
  }
};
var onTypeChange = function () {
  apartmentsPrice.setCustomValidity('');
  apartmentsPrice.setAttribute('placeholder', 'мин. ' + typeAndPrice[apartmentsType.value]);
  if (+apartmentsPrice.value < +typeAndPrice[apartmentsType.value]) {
    apartmentsPrice.setCustomValidity('Минимальная стоимость не может быть меньше ' + typeAndPrice[apartmentsType.value]);
  }
};
var onCheckinChange = function () {
  if (checkinTime.value !== checkoutTime.value) {
    checkoutTime.value = checkinTime.value;
  }
};
var onCheckoutChange = function () {
  if (checkinTime.value !== checkoutTime.value) {
    checkinTime.value = checkoutTime.value;
  }
};
// Запускает проверку полей на старте во избежание отправки формы с невалидными значе
var checkValidityOnStart = function () {
  onRoomsChange();
  onTypeChange();
  onCheckinChange();
  onCheckoutChange();
};
checkValidityOnStart();
checkinTime.addEventListener('change', onCheckinChange);
checkoutTime.addEventListener('change', onCheckoutChange);
apartmentsType.addEventListener('change', onTypeChange);
apartmentsPrice.addEventListener('change', onTypeChange);
roomNumber.addEventListener('change', onRoomsChange);
guestsCapacity.addEventListener('change', onRoomsChange);
mainPin.addEventListener('mouseup', onMainPinClick);
popupClose.addEventListener('click', closePopup);
