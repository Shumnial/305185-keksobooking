'use strict';
// Данный модуль предназначен для работы с формой
(function () {
  var guestsCapacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');
  var apartmentsType = document.querySelector('#type');
  var apartmentsPrice = document.querySelector('#price');
  var checkinTime = document.querySelector('#timein');
  var checkoutTime = document.querySelector('#timeout');
  var noticeForm = document.querySelector('.notice__form');

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

  var onInvalidValue = function (evt) {
    evt.target.style.border = !evt.target.validity.valid ? '2px solid red' : 'none';
  };
  noticeForm.addEventListener('invalid', onInvalidValue, true);
  checkinTime.addEventListener('change', checkinTimeSync);
  checkoutTime.addEventListener('change', checkoutTimeSync);
  apartmentsType.addEventListener('change', onTypeChange);
  apartmentsPrice.addEventListener('change', onTypeChange);
  roomNumber.addEventListener('change', onRoomsChange);
  guestsCapacity.addEventListener('change', onRoomsChange);
})();
