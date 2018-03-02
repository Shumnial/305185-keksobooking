'use strict';

(function () {
  var SERVER_URL = 'https://js.dump.academy/keksobooking';

  var setupRequest = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });
    return xhr;
  };

  window.backend = {
    upload: function (data, onSuccess) {
      var xhr = setupRequest(onSuccess);
      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },
    download: function (onSuccess) {
      var xhr = setupRequest(onSuccess);
      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    }
  };
})();
