'use strict';

(function () {

  var PICTURES = 25;

  var picture = document.querySelector('#picture')
    .content.querySelector('.picture__link');

  var pictures = document.querySelector('.pictures');

  var getRandomNumber = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };

  var getRandomNumberRange = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  };

  var getRandomComments = function (arr) {
    var RandomComments = [];
    if (Math.random() < 0.5) {
      RandomComments.push(arr[getRandomNumber(arr)]);
    } else {
      RandomComments.push(arr[getRandomNumber(arr)]);
      RandomComments.push(arr[getRandomNumber(arr)]);
    }

    return RandomComments;
  };

  var renderPicture = function (array) {
    var pictureElement = picture.cloneNode(true);
    pictureElement.tabIndex = 0;
    pictureElement.querySelector('.picture__img').src = array.url;
    pictureElement.querySelector('.picture__stat--likes').textContent = array.likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = array.comments.length;

    pictureElement.addEventListener('click', function () {
      window.renderBigPicture.renderBigPicture(array);
      window.renderBigPicture.openBigPicture();
    });

    pictureElement.addEventListener('keydown', function () {
      // проверка на нажатие Enter
      window.renderBigPicture.renderBigPicture(array);
      window.renderBigPicture.openBigPicture();
    });

    return pictureElement;
  };

  var render = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < PICTURES; i++) {
      fragment.appendChild(renderPicture(array[i]));
    }
    pictures.appendChild(fragment);
  };

  var activeClassNameElement = 'img-filters__button--active';
  var filterFormElement = document.querySelector('.img-filters__form');
  var picturesLoad = [];

  var updatePictures = function (filterName) {
    switch (filterName) {
      case 'filter-new':
        picturesLoad = picturesLoad.sort(function (first, second) {
          if (first.likes < second.likes) {
            return 1;
          } else if (first.likes > second.likes) {
            return -1;
          } else {
            return 0;
          }
        });
        break;
      case 'filter-discussed':
        picturesLoad = picturesLoad.sort(function (first, second) {
          if (first.comments.length < second.comments.length) {
            return 1;
          } else if (first.comments.length > second.comments.length) {
            return -1;
          } else {
            return 0;
          }
        });
        break;
    }
    render(picturesLoad);
  };

  filterFormElement.addEventListener('click', function (evt) {
    var target = evt.target;

    if (target.tagName === 'BUTTON') {
      var selectedFilter = filterFormElement.querySelector('.' + activeClassNameElement);

      if (selectedFilter) {
        selectedFilter.classList.remove(activeClassNameElement);
      }

      target.classList.add(activeClassNameElement);

      updatePictures(target.id);
    }
  });

  var successHandler = function (array) {
    picturesLoad = array;

    var imgFilters = document.querySelector('.img-filters');

    imgFilters.classList.remove('img-filters--inactive');
    render(picturesLoad);

    return picturesLoad;
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
    getRandomComments: getRandomComments
  };
})();
