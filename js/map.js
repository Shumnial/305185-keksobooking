'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapCard = document.querySelector('.map__card');
  var mainPin = document.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var popupClose = mapCard.querySelector('.popup__close');
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
  // Заполняет поля карточки в соответствии с тем, на каком пине было произведено нажатие
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
  window.map = {
    insertAdCard: function (adElement) {
      return map.insertBefore(adElement, document.querySelector('.map__filters-container'));
    },
    onPinClick: function (i) {
      window.card.fillAdsTemplate(window.data.generatedAds[i]);
      openPopup();
    }};
})();
