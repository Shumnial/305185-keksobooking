'use strict';
// Данный модуль заключает в себе результат модулей card и pin, отрисовывая пины и карточку объявления
(function () {
  var pinValues = {
    MAIN_PIN_HEIGHT: 84,
    MAIN_PIN_WIDTH: 65,
    MIN_Y: 150 - 84,
    MAX_Y: 500 - 84,
    MIN_X: 0 + 65 / 2,
    MAX_X: 1200 - 65 / 2,
  };
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var addressField = document.querySelector('#address');
  var onMainPinClick = function () {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    var fieldset = noticeForm.querySelectorAll('fieldset');
    for (var i = 0; i < fieldset.length; i++) {
      fieldset[i].removeAttribute('disabled');
    }
    noticeForm.querySelector('.form__submit').removeAttribute('disabled');
    noticeForm.querySelector('.form__reset').removeAttribute('disabled');
    window.pin.fillPinsTemplate();
  };
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (map.classList.contains('map--faded')) {
      onMainPinClick();
    }
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var offsetY = mainPin.offsetTop - shift.y;
      var offsetX = mainPin.offsetLeft - shift.x;
      addressField.setAttribute('value', (mainPin.offsetLeft) + ' ' + (mainPin.offsetTop + pinValues.MAIN_PIN_HEIGHT));
      if (offsetY <= pinValues.MIN_Y) {
        mainPin.style.top = pinValues.MIN_Y + 'px';

      } else if (offsetY >= pinValues.MAX_Y) {
        mainPin.style.top = pinValues.MAX_Y + 'px';

      } else {
        mainPin.style.top = offsetY + 'px';
      }
      if (offsetX <= pinValues.MIN_X) {
        mainPin.style.left = pinValues.MIN_X;

      } else if (offsetX >= pinValues.MAX_X) {
        mainPin.style.left = pinValues.MAX_X;

      } else {
        mainPin.style.left = offsetX + 'px';
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  window.map = {
    insertAdCard: function (adElement) {
      map.insertBefore(adElement, document.querySelector('.map__filters-container'));
    },
    onPinClick: function (i) {
      window.card.openPopup(i);
    }};
})();
