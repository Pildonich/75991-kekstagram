'use strict';

var PICTURES = 25;
var ESC_KEYCODE = 27;

var addVisuallyHidden = function (querySelector) {
  document.querySelector(querySelector).classList.add('visually-hidden');
};

var createArray = function (array, min, max) {
  for (var i = 0; i < max; i++) {
    array.push('photos/' + (min + i) + '.jpg');
  }
  return array;
};

var getRandomNumberRange = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var getRandomNumber = function (arr) {
  return Math.floor(Math.random() * arr.length);
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

var createPicturesArray = function (array, url, comments) {
  for (var i = 0; i < url.length; i++) {
    array[i] = {
      src: url[i],
      likes: getRandomNumberRange(15, 200),
      comments: getRandomComments(comments),
      description: descriptionArray[getRandomNumber(descriptionArray)]
    };
    array.push(array[i]);
  }
  return array;
};

var renderPicture = function (array) {
  var pictureElement = picture.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = array.src;
  pictureElement.querySelector('.picture__stat--likes').textContent = array.likes;
  pictureElement.querySelector('.picture__stat--comments').textContent = array.comments.length;

  return pictureElement;
};

var pictureList = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < PICTURES; i++) {
    fragment.appendChild(renderPicture(picturesArray[i]));
  }

  return fragment;
};

var renderBigPicture = function (array) {
  bigPicture.querySelector('.big-picture__img img').src = array.src;
  bigPicture.querySelector('.likes-count').textContent = array.likes;
  bigPicture.querySelector('.comments-count').textContent = array.comments.length;
  bigPicture.querySelector('.social__comments').appendChild(createCommentTemplate(array.comments));
  bigPicture.querySelector('.social__caption').textContent = array.description;
};

var createCommentTemplate = function (textMessage) {
  var comment = document.createElement('li');
  var commentImg = document.createElement('img');
  var commentText = document.createElement('p');

  comment.classList.add('social__comment');
  commentImg.classList.add('social__picture');
  commentText.classList.add('social__text');

  commentImg.src = 'img/avatar-' + getRandomNumberRange(1, 6) + '.svg';
  commentText.textContent = textMessage;

  comment.appendChild(commentImg);
  comment.appendChild(commentText);

  return comment;
};

var picturesArray = [];
var url = [];

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

createArray(url, 1, PICTURES);

createPicturesArray(picturesArray, url, commentsArray);

var picture = document.querySelector('#picture')
  .content.querySelector('.picture__link');

var pictures = document.querySelector('.pictures');
pictures.appendChild(pictureList());

addVisuallyHidden('.social__comment-count');
addVisuallyHidden('.social__loadmore');

var bigPicture = document.querySelector('.big-picture');
var picturesLinksOpen = document.querySelectorAll('.picture__link');
var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

var imageUpload = document.querySelector('.img-upload');
var imageUploadPopup = imageUpload.querySelector('.img-upload__overlay');
var imageUploadCancel = imageUpload.querySelector('.img-upload__cancel');

var imageUploadPreview = imageUpload.querySelector('.img-upload__preview img');
var imageUploadScale = imageUpload.querySelector('.img-upload__scale');
var scalePin = imageUpload.querySelector('.scale__pin');
var scaleLevel = imageUpload.querySelector('.scale__level');
var scaleValue = imageUpload.querySelector('.scale__value');
var effectsList = imageUpload.querySelector('.effects__list');
var effectNone = effectsList.querySelector('#effect-none');
var effectChrome = effectsList.querySelector('#effect-chrome');
var effectSepia = effectsList.querySelector('#effect-sepia');
var effectMarvin = effectsList.querySelector('#effect-marvin');
var effectPhobos = effectsList.querySelector('#effect-phobos');
var effectHeat = effectsList.querySelector('#effect-heat');


var addEventListenerToPicturesLinksOpen = function (array) {
  for (var i = 0; i < array.length; i++) {
    array[i].dataset.id = i;
    array[i].addEventListener('click', function (evt) {
      renderBigPicture(picturesArray[evt.target.parentElement.dataset.id]);
      openBigPicture();
    });
  }
};

addEventListenerToPicturesLinksOpen(picturesLinksOpen);

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openBigPicture = function () {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var openPopup = function () {
  imageUploadPopup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  imageUploadPopup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var addFilter = function (filterName, filterValue) {
  imageUploadPreview.style.filter = filterName + '(' + filterValue + ')';
  imageUploadScale.classList.remove('hidden');
  scaleValue.value = 100;
  scalePin.style.left = '100%';
  scaleLevel.style.width = '100%';
};

var addEffect = function (effectName) {
  imageUploadPreview.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
  imageUploadPreview.classList.add('effects__preview--' + effectName);
  imageUploadScale.classList.remove('hidden');
};

var getFilterValue = function (minValue, maxValue) {
  return scaleValue.value * maxValue / 100 + minValue;
};

var removeFilter = function () {
  imageUploadPreview.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
  imageUploadPreview.style.filter = 'none';
  imageUploadScale.classList.add('hidden');
};

bigPictureClose.addEventListener('click', function () {
  closeBigPicture();
});

imageUpload.addEventListener('change', function () {
  openPopup();
});

imageUploadCancel.addEventListener('click', function () {
  closePopup();
});

effectNone.addEventListener('click', function () {
  removeFilter();
});

effectChrome.addEventListener('click', function () {
  addEffect('chrome');
  addFilter('grayscale', getFilterValue(0, 1));
});

effectSepia.addEventListener('click', function () {
  addEffect('sepia');
  addFilter('sepia', getFilterValue(0, 1));
});

effectMarvin.addEventListener('click', function () {
  addEffect('marvin');
  addFilter('invert', getFilterValue(0, 100) + '%');
});

effectPhobos.addEventListener('click', function () {
  addEffect('phobos');
  addFilter('blur', getFilterValue(0, 3) + 'px');
});

effectHeat.addEventListener('click', function () {
  addEffect('heat');
  addFilter('brightness', getFilterValue(1, 3));
});
