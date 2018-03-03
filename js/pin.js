'use strict';
// Данный модуль служит для генерации пинов на карте
(function () {
  // Заполняет клонированную ноду шаблона с метками
  var mapPins = document.querySelector('.map__pins');
  var template = document.querySelector('#map-template');
  window.pin = {
    fillPinsTemplate: function (arr) {
      var button = template.content.querySelector('.map__pin').cloneNode(true);
      var img = button.querySelector('img');
      var fragment = document.createDocumentFragment();
      arr.forEach(function (element, i) {
        button.style.left = element.location.x + 'px';
        button.style.top = element.location.y + 'px';
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
