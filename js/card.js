'use strict';
(function () {
  var adConstants = {
    APARTMENTS_TYPE: {
      'flat': 'Квартира',
      'house': 'Дом',
      'bungalo': 'Бунгало'
    }
  };
  var template = document.querySelector('#map-template');
  var mapCard = template.content.querySelector('.map__card').cloneNode(true);
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
  // Заполняет клонированную ноду шаблона с объявлением
  window.card = {
    fillAdsTemplate: function (arr) {
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
      window.map.insertAdCard(mapCard);
    }};
  window.card.fillAdsTemplate(window.data.generatedAds[0]);
})();
