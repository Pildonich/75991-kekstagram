'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var Avatar = {
    MIN: 1,
    MAX: 6
  };

  var MAX_COMMENTS = 5;

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  var body = document.querySelector('body');

  var addVisuallyHidden = function (querySelector) {
    document.querySelector(querySelector).classList.add('visually-hidden');
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && window.form.textHashtags !== evt.target && window.form.textDescription !== evt.target) {
      window.form.closePopup();
      closeBigPicture();
    }
  };

  var renderBigPicture = function (array) {
    bigPicture.querySelector('.big-picture__img img').src = array.url;
    bigPicture.querySelector('.likes-count').textContent = array.likes;
    bigPicture.querySelector('.comments-count').textContent = array.comments.length;
    bigPicture.querySelector('.social__comments').innerHTML = '';
    bigPicture.querySelector('.social__comments').appendChild(createCommentTemplate(array.comments));
    bigPicture.querySelector('.social__caption').textContent = array.description;
  };

  var createCommentTemplate = function (array) {
    var fragmentComments = document.createDocumentFragment();
    var countComments = array.length > MAX_COMMENTS ? MAX_COMMENTS : array.length;

    for (var i = 0; i < countComments; i++) {
      var comment = document.createElement('li');
      var commentImg = document.createElement('img');
      var commentText = document.createElement('p');

      comment.classList.add('social__comment');
      commentImg.classList.add('social__picture');
      commentText.classList.add('social__text');

      commentImg.src = 'img/avatar-' + window.gallery.getRandomNumberRange(Avatar.MIN, Avatar.MAX) + '.svg';
      commentText.textContent = array[i];

      comment.appendChild(commentImg);
      comment.appendChild(commentText);
      fragmentComments.appendChild(comment);
    }

    return fragmentComments;
  };

  addVisuallyHidden('.social__comment-count');
  addVisuallyHidden('.social__loadmore');

  var openBigPicture = function () {
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  bigPictureClose.addEventListener('click', function () {
    closeBigPicture();
  });

  window.renderBigPicture = {
    renderBigPicture: renderBigPicture,
    openBigPicture: openBigPicture,
    onPopupEscPress: onPopupEscPress
  };
})();
