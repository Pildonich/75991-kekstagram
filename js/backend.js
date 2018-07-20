'use strict';
// работа с сетью
(function () {
  var POST = 'https://js.dump.academy/kekstagram';
  var GET = 'https://js.dump.academy/kekstagram/data';
  var STATUS_CODE_OK = 200;
  var TIMEOUT = 10000;

  var getJSON = function (onLoad, onError, method, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE_OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    if (method === 'GET') {
      xhr.open('GET', GET);
      xhr.send();
    } else if (method === 'POST') {
      xhr.open('POST', POST);
      xhr.send(data);
    }
  };

  window.backend = {
    load: function (onLoad, onError) {
      getJSON(onLoad, onError, 'GET');
    },
    save: function (data, onLoad, onError) {
      getJSON(onLoad, onError, 'POST', data);
    }
  };
})();
