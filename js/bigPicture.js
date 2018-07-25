'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var Comments = {
    STEP: 5,
    START: 0
  };

  var Avatar = {
    MIN: 1,
    MAX: 6
  };

  var commentsBegin;
  var commentsCount;
  var commentsLoad = [];
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  var body = document.querySelector('body');
  var socialComments = bigPicture.querySelector('.social__comments');
  var socialLoadMore = bigPicture.querySelector('.social__loadmore');

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
    socialComments.innerHTML = '';
    socialComments.appendChild(createCommentTemplate(array.comments, commentsBegin, commentsCount));
    commentsLoad = array.comments;
    bigPicture.querySelector('.social__caption').textContent = array.description;
  };

  var createCommentTemplate = function (array, begin, count) {
    var fragmentComments = document.createDocumentFragment();
    var countComments = array.length > count ? count : array.length;
    if (array.length <= count) {
      socialLoadMore.classList.add('hidden');
    } else {
      socialLoadMore.classList.remove('hidden');
    }
    var text = bigPicture.querySelector('.social__comment-count').innerHTML;
    bigPicture.querySelector('.social__comment-count').innerHTML = text.replace(/\d+/, countComments);
    for (var i = begin; i < countComments; i++) {
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

  var onSocialLoadMoreClick = function () {
    socialComments.appendChild(createCommentTemplate(commentsLoad, commentsBegin += Comments.STEP, commentsCount += Comments.STEP));
  };

  var openBigPicture = function () {
    bigPicture.classList.remove('hidden');
    socialLoadMore.classList.remove('hidden');
    body.classList.add('modal-open');
    commentsBegin = Comments.START;
    commentsCount = Comments.STEP;
    socialLoadMore.addEventListener('click', onSocialLoadMoreClick);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    socialLoadMore.removeEventListener('click', onSocialLoadMoreClick);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  bigPictureClose.addEventListener('click', function () {
    closeBigPicture();
  });

  window.bigPicture = {
    renderBigPicture: renderBigPicture,
    openBigPicture: openBigPicture,
    onPopupEscPress: onPopupEscPress
  };
})();
