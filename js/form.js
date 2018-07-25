'use strict';
// Общее

(function () {

  var Scale = {
    MAX: 100,
    MIN: 25,
    STEP: 25
  };
  var pictureScale = Scale.MAX;

  var Hashtags = {
    COUNT_MAX: 5,
    LENGTH_MIN: 2,
    LENGTH_MAX: 20
  };

  var SLIDER_WIDTH = 450;
  var MAX_PERCENT = 100;

  var imageUpload = document.querySelector('.img-upload');
  var uploadForm = imageUpload.querySelector('.img-upload__form');
  var textHashtags = imageUpload.querySelector('.text__hashtags');
  var textDescription = imageUpload.querySelector('.text__description');
  var imageUploadPopup = imageUpload.querySelector('.img-upload__overlay');
  var imageUploadCancel = imageUpload.querySelector('.img-upload__cancel');
  var imageUploadPreview = imageUpload.querySelector('.img-upload__preview');
  var imageUploadPreviewImg = imageUpload.querySelector('.img-upload__preview img');
  var imageUploadScale = imageUpload.querySelector('.img-upload__scale');

  var resizeControlValue = imageUpload.querySelector('.resize__control--value');
  var resizeControlMinus = imageUpload.querySelector('.resize__control--minus');
  var resizeControlPlus = imageUpload.querySelector('.resize__control--plus');

  var effectsList = imageUpload.querySelector('.effects__list');
  var lastFilter = 'none';
  var filterName = 'none';

  var positionPinValue = imageUpload.querySelector('.scale__value');

  var scalePinElement = imageUpload.querySelector('.scale__pin');
  var scaleLevelElement = imageUpload.querySelector('.scale__level');


  var openPopup = function () {
    imageUploadPopup.classList.remove('hidden');
    document.addEventListener('keydown', window.bigPicture.onPopupEscPress);
  };

  var applyPictureScale = function (controlValue) {
    resizeControlValue.value = controlValue + '%';
    imageUploadPreview.style.transform = 'scale(' + (controlValue / 100) + ')';
    pictureScale = controlValue;
  };

  var resetImgForm = function () {
    uploadForm.reset();
    applyPictureScale(Scale.MAX);
    imageUploadPreviewImg.setAttribute('class', '');
    imageUploadPreviewImg.style.filter = 'none';
    imageUploadScale.classList.add('hidden');
  };

  var closePopup = function () {
    resetImgForm();
    imageUploadPopup.classList.add('hidden');
    document.removeEventListener('keydown', window.bigPicture.onPopupEscPress);
  };

  imageUpload.addEventListener('change', function () {
    openPopup();
  });

  imageUploadCancel.addEventListener('click', function () {
    closePopup();
  });

  effectsList.addEventListener('click', function (evt) {
    var target = evt.target;

    if (target.classList.contains('effects__radio')) {
      filterName = target.id.replace('effect-', '');

      imageUploadPreviewImg.classList.remove('effects__preview--' + lastFilter);
      imageUploadPreviewImg.style.filter = 'none';

      setDefaultPosition();
      addEffect(filterName);
      getFilters(positionPinValue.value);

      if (filterName === 'none') {
        imageUploadScale.classList.add('hidden');
      } else {
        imageUploadScale.classList.remove('hidden');
      }

      lastFilter = filterName;
    }
  });

  var getFilters = function (sliderValue) {
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
          target.setCustomValidity('Все хэш-теги должны начинаться с символа # (решётка)');
          break;
        } else if (hashtags[i].length > Hashtags.LENGTH_MAX) {
          target.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
          break;
        } else if (hashtags[i].length < Hashtags.LENGTH_MIN) {
          target.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
          break;
        } else if (hashtags[i].indexOf('#', 1) > 0) {
          target.setCustomValidity('Хэш-теги разделяются пробелами');
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


  var setDefaultPosition = function () {
    scalePinElement.style.left = '100%';
    scaleLevelElement.style.width = '100%';
    positionPinValue.value = MAX_PERCENT;
  };

  scalePinElement.addEventListener('mouseup', function () {
    getFilters(parseInt(positionPinValue.value, 10));
  });

  scalePinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var leftOffsetPin = scalePinElement.offsetLeft - shift.x;

      if (leftOffsetPin >= 0 && SLIDER_WIDTH >= leftOffsetPin) {
        scalePinElement.style.left = leftOffsetPin + 'px';
        scaleLevelElement.style.width = positionPinValue.value + '%';
        positionPinValue.value = Math.floor((leftOffsetPin * MAX_PERCENT) / SLIDER_WIDTH);
        getFilters(parseInt(positionPinValue.value, 10));
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  uploadForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(uploadForm), function () {
    });
    closePopup();
    resetImgForm();
    uploadForm.reset();
    evt.preventDefault();
  });

  window.form = {
    textHashtags: textHashtags,
    textDescription: textDescription,
    closePopup: closePopup
  };
})();
