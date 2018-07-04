'use strict';

var removeHidden = function (querySelector) {
  document.querySelector(querySelector).classList.remove('hidden');
};

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
}

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

var renderPicture = function (i) {
  var pictureElement = picture.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = pictureArray[i].src;
  pictureElement.querySelector('.picture__stat--likes').textContent = pictureArray[i].likes;
  pictureElement.querySelector('.picture__stat--comments').textContent = pictureArray[i].comments.length;

  return pictureElement;
};

var pictureList = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 25; i++) {
    fragment.appendChild(renderPicture(i));
  }

  return fragment;
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

var pictureArray = [];
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

createArray(url, 1, 25);

createPicturesArray(pictureArray, url, commentsArray);

var picture = document.querySelector('#picture')
  .content.querySelector('.picture__link');

var pictures = document.querySelector('.pictures');
pictures.appendChild(pictureList());

removeHidden('.big-picture');
var bigPicture = document.querySelector('.big-picture');
bigPicture.querySelector('.big-picture__img img').src = pictureArray[0].src;
bigPicture.querySelector('.likes-count').textContent = pictureArray[0].likes;
bigPicture.querySelector('.comments-count').textContent = pictureArray[0].comments.length;
bigPicture.querySelector('.social__comments').appendChild(createCommentTemplate(pictureArray[0].comments));
bigPicture.querySelector('.social__caption').textContent = pictureArray[0].description;

addVisuallyHidden('.social__comment-count');
addVisuallyHidden('.social__loadmore');
