'use strict';
// Валидация, переменные в виде объектов.

// Общее

var ESC_KEYCODE = 27;
var PICTURES = 25;

var Likes = {
  MIN: 15,
  MAX: 200
};

var Avatar = {
  MIN: 1,
  MAX: 6
};

var Scale = {
  MAX: 100,
  MIN: 25,
  STEP: 25
};

var Hashtags = {
  COUNT_MAX: 5,
  LENGTH_MIN: 2,
  LENGTH_MAX: 20
};

var imageUpload = document.querySelector('.img-upload');
var textHashtags = imageUpload.querySelector('.text__hashtags');
var textDescription = imageUpload.querySelector('.text__description');

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
var imageUploadPopup = imageUpload.querySelector('.img-upload__overlay');
var imageUploadCancel = imageUpload.querySelector('.img-upload__cancel');


var pictureScale = Scale.MAX;

var resizeControlValue = document.querySelector('.resize__control--value');

var resizeControlMinus = document.querySelector('.resize__control--minus');
var resizeControlPlus = document.querySelector('.resize__control--plus');
var MAX_FILTER_VALUE = 100;
var imageUploadPreview = imageUpload.querySelector('.img-upload__preview');
var imageUploadPreviewImg = imageUpload.querySelector('.img-upload__preview img');
var imageUploadScale = imageUpload.querySelector('.img-upload__scale');
var scalePin = imageUpload.querySelector('.scale__pin');
var scaleLevel = imageUpload.querySelector('.scale__level');
var effectsList = imageUpload.querySelector('.effects__list');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && textHashtags !== evt.target && textDescription !== evt.target) {
    closePopup();
  }
};

// Работа с фотографиями (картинками)
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

var renderPicture = function (array) {
  var pictureElement = picture.cloneNode(true);
  pictureElement.tabIndex = 0;
  pictureElement.querySelector('.picture__img').src = array.src;
  pictureElement.querySelector('.picture__stat--likes').textContent = array.likes;
  pictureElement.querySelector('.picture__stat--comments').textContent = array.comments.length;

  pictureElement.addEventListener('click', function () {
    renderBigPicture(array);
    openBigPicture();
  });

  pictureElement.addEventListener('keydown', function () {
    // проверка на нажатие Enter
    renderBigPicture(array);
    openBigPicture();
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

  commentImg.src = 'img/avatar-' + getRandomNumberRange(Avatar.MIN, Avatar.MAX) + '.svg';
  commentText.textContent = textMessage;

  comment.appendChild(commentImg);
  comment.appendChild(commentText);

  return comment;
};

createArray(url, 1, PICTURES);

createPicturesArray(picturesArray, url, commentsArray);

var picture = document.querySelector('#picture')
  .content.querySelector('.picture__link');

var pictures = document.querySelector('.pictures');
pictures.appendChild(pictureList());

addVisuallyHidden('.social__comment-count');
addVisuallyHidden('.social__loadmore');

var openPopup = function () {
  imageUploadPopup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var applyPictureScale = function (controlValue) {
  resizeControlValue.value = controlValue + '%';
  imageUploadPreview.style.transform = 'scale(' + (controlValue / 100) + ')';
};

var lastFilter = 'none';

var resetImgForm = function () {
  applyPictureScale(100);
  imageUploadPreviewImg.setAttribute('class', '');
  imageUploadPreviewImg.style.filter = 'none';
  imageUploadScale.classList.add('hidden');
};

var closePopup = function () {
  imageUploadPopup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

imageUpload.addEventListener('change', function () {
  openPopup();
});

imageUploadCancel.addEventListener('click', function () {
  closePopup();
  resetImgForm();
});

var bigPicture = document.querySelector('.big-picture');
var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

var openBigPicture = function () {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

bigPictureClose.addEventListener('click', function () {
  closeBigPicture();
});

effectsList.addEventListener('click', function (evt) {
  var target = evt.target;

  if (target.classList.contains('effects__radio')) {
    var filterName = target.id.replace('effect-', '');

    imageUploadPreviewImg.classList.remove('effects__preview--' + lastFilter);
    imageUploadPreviewImg.style.filter = 'none';

    addEffect(filterName);
    getFilters(filterName, MAX_FILTER_VALUE);

    if (filterName === 'none') {
      imageUploadScale.classList.add('hidden');
    } else {
      imageUploadScale.classList.remove('hidden');
    }

    lastFilter = filterName;
  }
});

var getFilters = function (filterName, sliderValue) {
  var result;
  switch (filterName) {
    case 'chrome':
      result = 'grayscale(' + (sliderValue / 100) + ')';
      break;
    case 'sepia':
      result = 'sepia(' + (sliderValue / 100) + ')';
      break;
    case 'marvin':
      result = 'invert(' + sliderValue + '%)';
      break;
    case 'phobos':
      result = 'blur(' + (sliderValue * 3 / 100) + 'px)';
      break;
    case 'heat':
      result = 'brightness(' + ((sliderValue * 2 / 100) + 1) + ')';
      break;
    default: result = 'none';
      break;
  }
  scalePin.style.left = MAX_FILTER_VALUE + '%';
  scaleLevel.style.width = MAX_FILTER_VALUE + '%';
  imageUploadPreviewImg.style.filter = result;
};

var addEffect = function (effectName) {
  imageUploadPreviewImg.classList.add('effects__preview--' + effectName);
};

var onMinusClick = function () {
  if (pictureScale > Scale.MIN) {
    pictureScale -= Scale.STEP;
  }

  applyPictureScale(pictureScale);
};

var onPlusClick = function () {
  if (pictureScale < Scale.MAX) {
    pictureScale += Scale.STEP;
  }

  applyPictureScale(pictureScale);
};

resizeControlMinus.addEventListener('click', onMinusClick);
resizeControlPlus.addEventListener('click', onPlusClick);

var isDuplicateItemExist = function (item, array) {
  var currentItem = item;
  var isDuplicate = false;
  for (var j = array.indexOf(item) + 1; j < array.length; j++) {
    isDuplicate = array[j].toLowerCase() === currentItem.toLowerCase();
    if (isDuplicate) {
      break;
    }
  }
  return isDuplicate;
};

var onHashtagInput = function (evt) {
  evt.preventDefault();
  var target = evt.target;
  var hashtags = target.value.split(' ');

  if (hashtags.length > Hashtags.COUNT_MAX) {
    target.setCustomValidity('Не больше 5 хэш-тегов');
  } else {
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i][0] !== '#') {
        target.setCustomValidity('Все хэш-теги должны начинаться с символа # (решётка), между хэш-тегами один пробел');
        break;
      } else if (hashtags[i].length > Hashtags.LENGTH_MAX) {
        target.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
        break;
      } else if (hashtags[i].length < Hashtags.LENGTH_MIN) {
        target.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
        break;
      } else if (isDuplicateItemExist(hashtags[i], hashtags) === true) {
        target.setCustomValidity('Не должно быть одинаковых хэш-тегов');
        break;
      } else {
        target.setCustomValidity('');
      }
    }
  }
};

textHashtags.addEventListener('change', onHashtagInput);
