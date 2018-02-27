'use strict';
var map = document.querySelector('.map');
var template = document.querySelector('#map-template');
var mapCard = document.querySelector('.map__card');
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
