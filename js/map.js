'use strict';
(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
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
  mainPin.addEventListener('mouseup', onMainPinClick);
  window.map = {
    insertAdCard: function (adElement) {
      map.insertBefore(adElement, document.querySelector('.map__filters-container'));
    },
    onPinClick: function () {
      window.card.openPopup();
    }};
})();
