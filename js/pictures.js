'use strict';
// Общее

var ESC_KEYCODE = 27;

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && textHashtags !== document.activeElement && textDescription !== document.activeElement) {
    closePopup();
  }
};

// Работа с фотографиями (картинками)

var PICTURES = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var AVATAR_MIN = 1;
var AVATAR_MAX = 6;

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
      likes: getRandomNumberRange(LIKES_MIN, LIKES_MAX),
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

  commentImg.src = 'img/avatar-' + getRandomNumberRange(AVATAR_MIN, AVATAR_MAX) + '.svg';
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

// Открытие и закрытие формы

var imageUpload = document.querySelector('.img-upload');
var imageUploadPopup = imageUpload.querySelector('.img-upload__overlay');
var imageUploadCancel = imageUpload.querySelector('.img-upload__cancel');
var imageUploadForm = imageUpload.querySelector('.img-upload__form');

var openPopup = function () {
  imageUploadPopup.classList.remove('hidden');
  // imageUploadScale.classList.add('hidden'); // срабатывает каждый раз и не дают addEffect вернуть Scale
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  imageUploadPopup.classList.add('hidden');
  imageUploadForm.reset();// не работает почему ? Хочу сбросить форму

  document.removeEventListener('keydown', onPopupEscPress);
};

imageUpload.addEventListener('change', function () {
  openPopup();
  applyPictureScale(pictureScale); // НЕ ЗАБУДЬ, ВЫЗОВ ДОЛЖЕН БЫТЬ НИЖЕ ОБЪЯВЛЕНИЯ
});

imageUploadCancel.addEventListener('click', function () {
  closePopup();
});

// Открытие и закрытие большой картинки

var bigPicture = document.querySelector('.big-picture');
var picturesLinksOpen = document.querySelectorAll('.picture__link');
var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

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

// Работа с эффектами

var MAX_FILTER_VALUE = 100;

// imageUpload будет в другом месте, не забудь.
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

var addFilter = function (filterName, filterValue) {
  imageUploadScale.classList.remove('hidden');
  imageUploadPreview.style.filter = filterName + '(' + filterValue + ')';
  scalePin.style.left = MAX_FILTER_VALUE + '%';
  scaleLevel.style.width = MAX_FILTER_VALUE + '%';
};

var addEffect = function (effectName) {
  imageUploadPreview.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
  imageUploadPreview.classList.add('effects__preview--' + effectName);
};

var getFilterValue = function (minValue, maxValue) {
  return scaleValue.value * maxValue / 100 + minValue;
};

var removeFilter = function () {
  imageUploadPreview.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
  imageUploadPreview.style.filter = 'none';
  imageUploadScale.classList.add('hidden');
};

effectNone.addEventListener('click', function () {
  removeFilter();
});

effectChrome.addEventListener('click', function () {
  addFilter('grayscale', getFilterValue(0, 1));
  addEffect('chrome');
});

effectSepia.addEventListener('click', function () {
  addFilter('sepia', getFilterValue(0, 1));
  addEffect('sepia');
});

effectMarvin.addEventListener('click', function () {
  addFilter('invert', getFilterValue(0, 100) + '%');
  addEffect('marvin');
});

effectPhobos.addEventListener('click', function () {
  addFilter('blur', getFilterValue(0, 3) + 'px');
  addEffect('phobos');
});

effectHeat.addEventListener('click', function () {
  addFilter('brightness', getFilterValue(1, 3));
  addEffect('heat');
});

// Изменение масштаба

var MAX_SCALE_VALUE = 100;
var MIN_SCALE = 25;
var MAX_SCALE = 100;
var SCALE_STEP = 25;

var pictureScale = MAX_SCALE_VALUE;

var resizeControlValue = document.querySelector('.resize__control--value');

var resizeControlMinus = document.querySelector('.resize__control--minus');
var resizeControlPlus = document.querySelector('.resize__control--plus');

var applyPictureScale = function (controlValue) {
  resizeControlValue.value = controlValue + '%';
  imageUploadPreview.style.transform = 'scale(' + (controlValue / 100) + ')';
};

var onMinusClick = function () {
  if (pictureScale > MIN_SCALE) {
    pictureScale -= SCALE_STEP;
  }

  applyPictureScale(pictureScale);
};

var onPlusClick = function () {
  if (pictureScale < MAX_SCALE) {
    pictureScale += SCALE_STEP;
  }

  applyPictureScale(pictureScale);
};

resizeControlMinus.addEventListener('click', onMinusClick);
resizeControlPlus.addEventListener('click', onPlusClick);

// Валидация формы загрузки фото

var HASHTAGS_COUNT_MAX = 5;
var HASHTAG_LENGTH_MIN = 2;
var HASHTAG_LENGTH_MAX = 20;

var textHashtags = imageUpload.querySelector('.text__hashtags');
var textDescription = imageUpload.querySelector('.text__description');

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

  if (hashtags.length > HASHTAGS_COUNT_MAX) {
    target.setCustomValidity('Не больше 5 хэш-тегов');
  } else {
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i][0] !== '#') {
        target.setCustomValidity('Все хэш-теги должны начинаться с символа # (решётка), между хэш-тегами один пробел');
        break;
      } else if (hashtags[i].length > HASHTAG_LENGTH_MAX) {
        target.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
        break;
      } else if (hashtags[i].length < HASHTAG_LENGTH_MIN) {
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
