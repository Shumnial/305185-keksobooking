'use strict';

(function () {
  var SERVER_URL = 'https://js.dump.academy/keksobooking';

  var setupRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Превышено время ожидания от сервера. Максимальное время: ' + xhr.timeout / 1000 + 'с');
    });
    xhr.timeout = 10000;
    return xhr;
  };

  window.backend = {
    upload: function (data, onSuccess, onError) {
      var xhr = setupRequest(onSuccess, onError);
      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },
    download: function (onSuccess, onError) {
      var xhr = setupRequest(onSuccess, onError);
      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    }
  };
})();
