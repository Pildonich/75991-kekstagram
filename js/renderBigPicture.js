'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var Avatar = {
    MIN: 1,
    MAX: 6
  };

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

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

    commentImg.src = 'img/avatar-' + window.gallery.getRandomNumberRange(Avatar.MIN, Avatar.MAX) + '.svg';
    commentText.textContent = textMessage;

    comment.appendChild(commentImg);
    comment.appendChild(commentText);

    return comment;
  };

  addVisuallyHidden('.social__comment-count');
  addVisuallyHidden('.social__loadmore');

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

  window.renderBigPicture = {
    renderBigPicture: renderBigPicture,
    openBigPicture: openBigPicture,
    onPopupEscPress: onPopupEscPress
  };
})();
