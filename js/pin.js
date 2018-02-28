'use strict';
// Данный модуль служит для генерации пинов на карте
(function () {
  // Заполняет клонированную ноду шаблона с метками
  var mapPins = document.querySelector('.map__pins');
  var template = document.querySelector('#map-template');
  window.pin = {
    fillPinsTemplate: function () {
      var button = template.content.querySelector('.map__pin').cloneNode(true);
      var img = button.querySelector('img');
      var fragment = document.createDocumentFragment();
      window.data.generatedAds.forEach(function (element, i) {
        button.style.left = element.location.x - 25 + 'px';
        button.style.top = element.location.y + 70 + 'px';
        button.classList.add('hidden');
        img.setAttribute('src', element.author.avatar);
        var pinNode = button.cloneNode(true);
        pinNode.addEventListener('click', function () {
          window.map.onPinClick(i);
        });
        fragment.appendChild(pinNode);
      });
      mapPins.appendChild(fragment);
    }
  };
})();
