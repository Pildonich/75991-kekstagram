'use strict';

(function () {

  var PICTURES = 25;

  var Likes = {
    MIN: 15,
    MAX: 200
  };

  var commentsArray = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var descriptionArray = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  var picture = document.querySelector('#picture')
    .content.querySelector('.picture__link');

  var pictures = document.querySelector('.pictures');


  var picturesArray = [];
  var url = [];

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

  var createArray = function (array, min, max) {
    for (var i = 0; i < max; i++) {
      array.push('photos/' + (min + i) + '.jpg');
    }
    return array;
  };

  createArray(url, 1, PICTURES);

  var createPicturesArray = function (array, address, comments) {
    for (var i = 0; i < address.length; i++) {
      array[i] = {
        src: address[i],
        likes: getRandomNumberRange(Likes.MIN, Likes.MAX),
        comments: getRandomComments(comments),
        description: descriptionArray[getRandomNumber(descriptionArray)]
      };
      array.push(array[i]);
    }
    return array;
  };

  createPicturesArray(picturesArray, url, commentsArray);

  var renderPicture = function (array) {
    var pictureElement = picture.cloneNode(true);
    pictureElement.tabIndex = 0;
    pictureElement.querySelector('.picture__img').src = array.src;
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

  var pictureList = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < PICTURES; i++) {
      fragment.appendChild(renderPicture(picturesArray[i]));
    }

    return fragment;
  };

  pictures.appendChild(pictureList());

  window.gallery = {
    getRandomNumberRange: getRandomNumberRange
  };
})();
