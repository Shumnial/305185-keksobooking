'use strict';
// Данный модуль предназначен для работы с формой
(function () {
  var MAIN_PIN_HEIGHT = 84;
  var map = document.querySelector('.map');
  var guestsCapacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');
  var apartmentsType = document.querySelector('#type');
  var apartmentsPrice = document.querySelector('#price');
  var checkinTime = document.querySelector('#timein');
  var checkoutTime = document.querySelector('#timeout');
  var noticeForm = document.querySelector('.notice__form');
  var resetButton = document.querySelector('.form__reset');
  var mainPin = document.querySelector('.map__pin--main');
  var addressField = document.querySelector('#address');

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
      guestsCapacity.setCustomValidity('Количество гостей не может превышать количество комнат, либо данное жилье не предназначено для гостей (100 комнат)');
    }
  };
  var onTypeChange = function () {
    apartmentsPrice.setCustomValidity('');
    apartmentsPrice.setAttribute('placeholder', 'мин. ' + typeAndPrice[apartmentsType.value]);
    if (+apartmentsPrice.value < +typeAndPrice[apartmentsType.value]) {
      apartmentsPrice.setCustomValidity('Минимальная стоимость не может быть меньше ' + typeAndPrice[apartmentsType.value]);
    }
  };
  var checkinTimeSync = function () {
    if (checkinTime.value !== checkoutTime.value) {
      checkoutTime.value = checkinTime.value;
    }
  };
  var checkoutTimeSync = function () {
    if (checkinTime.value !== checkoutTime.value) {
      checkinTime.value = checkoutTime.value;
    }
  };
  // Запускает проверку полей на старте во избежание отправки формы с невалидными значе
  var checkValidityOnStart = function () {
    onRoomsChange();
    onTypeChange();
    checkinTimeSync();
    checkoutTimeSync();
  };
  checkValidityOnStart();

  var closeAndResetForm = function () {
    noticeForm.reset();
    map.classList.add('map--faded');
    noticeForm.classList.add('notice__form--disabled');
    mainPin.style.left = 50 + '%';
    mainPin.style.top = 375 + 'px';
    var pins = document.querySelectorAll('.map__pin');
    addressField.setAttribute('value', (mainPin.offsetLeft) + ' ' + (mainPin.offsetTop + MAIN_PIN_HEIGHT));
    var fieldset = noticeForm.querySelectorAll('fieldset');
    for (var i = 0; i < fieldset.length; i++) {
      fieldset[i].setAttribute('disabled', 'disabled');
    }
    for (i = 1; i < pins.length; i++) {
      pins[i].remove();
    }
  };

  var onInvalidValue = function (evt) {
    evt.target.style.border = !evt.target.validity.valid ? '2px solid red' : 'none';
  };
  resetButton.addEventListener('click', closeAndResetForm);
  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(noticeForm), closeAndResetForm, window.error.show);
  });
  noticeForm.addEventListener('invalid', onInvalidValue, true);
  checkinTime.addEventListener('change', checkinTimeSync);
  checkoutTime.addEventListener('change', checkoutTimeSync);
  apartmentsType.addEventListener('change', onTypeChange);
  apartmentsPrice.addEventListener('change', onTypeChange);
  roomNumber.addEventListener('change', onRoomsChange);
  guestsCapacity.addEventListener('change', onRoomsChange);
})();
