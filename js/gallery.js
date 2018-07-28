'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var RANDOM_PICTURES = 10;


  var picture = document.querySelector('#picture')
    .content.querySelector('.picture__link');

  var pictures = document.querySelector('.pictures');

  var activeClassNameElement = 'img-filters__button--active';
  var filterFormElement = document.querySelector('.img-filters__form');
  var picturesLoad = [];
  var pictureFiltr = [];

  var getRandomNumberRange = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  };

  var renderPicture = function (array) {
    var pictureElement = picture.cloneNode(true);
    pictureElement.tabIndex = 0;
    pictureElement.querySelector('.picture__img').src = array.url;
    pictureElement.querySelector('.picture__stat--likes').textContent = array.likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = array.comments.length;

    pictureElement.addEventListener('click', function () {
      window.bigPicture.open();
      window.bigPicture.render(array);

    });

    pictureElement.addEventListener('keydown', function (evt) {
      // проверка на нажатие Enter
      if (evt.keyCode === ENTER_KEYCODE) {
        window.bigPicture.open();
        window.bigPicture.render(array);
      }
    });

    return pictureElement;
  };

  var removePhotos = function () {
    var collectionPhotos = pictures.querySelectorAll('.picture__link');
    if (collectionPhotos) {
      collectionPhotos.forEach(function (element) {
        pictures.removeChild(element);
      });
    }
  };

  var render = function (array) {
    removePhotos();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictureFiltr.length; i++) {
      fragment.appendChild(renderPicture(array[i]));
    }
    pictures.appendChild(fragment);
  };

  var updatePictures = function (filterName) {
    pictureFiltr = picturesLoad.slice();
    switch (filterName) {
      case 'filter-new':
        pictureFiltr = pictureFiltr.sort(function () {
          return Math.random() - 0.5;
        });
        pictureFiltr = pictureFiltr.slice(0, RANDOM_PICTURES);
        break;
      case 'filter-discussed':
        pictureFiltr = pictureFiltr.sort(function (first, second) {
          return second.comments.length - first.comments.length;
        });
        break;
    }
    render(pictureFiltr);
  };

  filterFormElement.addEventListener('click', function (evt) {
    var target = evt.target;

    if (target.tagName === 'BUTTON') {
      var selectedFilter = filterFormElement.querySelector('.' + activeClassNameElement);

      if (selectedFilter) {
        selectedFilter.classList.remove(activeClassNameElement);
      }

      target.classList.add(activeClassNameElement);

      window.debounce(function () {
        updatePictures(target.id);
      });
    }
  });

  var successHandler = function (array) {
    picturesLoad = array.slice();
    updatePictures();
    var imgFilters = document.querySelector('.img-filters');

    imgFilters.classList.remove('img-filters--inactive');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  window.gallery = {
    getRandomNumberRange: getRandomNumberRange,
    errorHandler: errorHandler
  };
})();
