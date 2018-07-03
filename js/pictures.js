'use strict';

var createArray = function (array, min, max) {
  for (var i = 0; i < max; i++) {
    array.push(min + i);
  }
  return array;
};

var getRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var getRandomComments = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var url = [];

createArray(url, 1, 25);

var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

//  var description = [
//  'Тестим новую камеру!',
//  'Затусили с друзьями на море',
//  'Как же круто тут кормят',
//  'Отдыхаем...',
//  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
//  'Вот это тачка!'
//  ];

var renderPicture = function (i) {
  var pictureElement = picture.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = 'photos/' + url[i] + '.jpg';
  pictureElement.querySelector('.picture__stat--likes').textContent = getRandomNumber(15, 200);
  if (Math.random() > 0.5) {
    pictureElement.querySelector('.picture__stat--comments').textContent = comments[getRandomComments(comments)];
  } else {
    pictureElement.querySelector('.picture__stat--comments').textContent = comments[getRandomComments(comments)] + ' ' + comments[getRandomComments(comments)];
  }

  return pictureElement;
};

var picture = document.querySelector('#picture')
  .content.querySelector('.picture__link');

var pictureList = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 25; i++) {
    fragment.appendChild(renderPicture(i));
  }

  return fragment;
};

var pictures = document.querySelector('.pictures');
pictures.appendChild(pictureList());
