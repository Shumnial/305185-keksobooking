'use strict';
(function () {
  var keyCodes = {
    ESC: 27
  };
  window.utils = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === keyCodes.ESC) {
        action();
      }
    }
  };
})();
