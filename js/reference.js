// файл, в котором хранятся более сложные решения задач

// 1. В файле main.js на основе написанных по заданию ранее вспомогательных функций напишите необходимые функции для создания массива из 25 сгенерированных объектов.
//Каждый объект массива — описание фотографии, опубликованной пользователем.

/*

function getRandomPositiveInteger(a, b) {
  // Если переданы отрицительные числа, возвращаем NaN
  if (a < 0 || b < 0) {
      return NaN;
  }

  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function isAllowedLength(string, maxValue) {
  return String(string).length <= maxValue;
}
isAllowedLength('keks', 9);

const DESCRIPTIONS = [
  'Кот',
  'Собака',
  'Пират',
  'Дельфин',
  'Ящерица',
  'Слон',
  'Торт',
  'Сигарета',
  'Тело',
  'Бумага',
  'Ручка',
  'Карандаш',
  'Монитор',
  'Клавиатура',
  'Мышь',
  'Геральт',
  'Цири',
  'Очки',
  'Шарф',
  'Куртка',
  'Перчатки',
  'Башня',
  'Работа',
  'Ozon',
  'Аналитик',
];

const ANY_COUNTS = {
  MIN_LIKES: 15,
  MAX_LIKES: 200,
  MIN_COMMENTS_COOUNT: 0,
  MAX_COMMENTS_COOUNT: 200
};

const SIMILAR_DESCRIPTION_COUNT = 25;

const getRandomElement = (elements) => {
  if (elements.length === 0) {
      return 'Длина массива = 0';
  }
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

const createMessage = () => {
  Array.from({ length: getRandomPositiveInteger(1,2) }, () => getRandomElement(DESCRIPTIONS)).join(' ');
}

const createComments = (index) => ({
  id: index,
  avatar: `img/avatar-${getRandomPositiveInteger(1,6)}.svg`,
  message: createMessage(),
  name: getRandomElement(DESCRIPTIONS)
});

const createObj = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomElement(DESCRIPTIONS),
  likese: getRandomPositiveInteger(ANY_COUNTS.MIN_LIKES, ANY_COUNTS.MAX_LIKES),
  comments: Array.from({ length: getRandomPositiveInteger(0, 20) }, (_, commentIndex) => createComments(commentIndex + 1)),
});

const arrayOfObjects = () => Array.from({length: SIMILAR_DESCRIPTION_COUNT}, (_, currentIndex) => createObj(currentIndex + 1));

arrayOfObjects();

*/

// 2. Нужно запрограммировать мессенджер. Отправка сообщения, удаление сообщения.

// Разметка

/*
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <title>Чат</title>
    <link href="style.css" rel="stylesheet">
  </head>
  <body>
    <section class="chat">
      <h1 class="visually-hidden">Чат</h1>

      <div class="chat-content">

      </div>

      <form class="chat-form" action="https://echo.htmlacademy.ru/courses" method="post">
        <input class="chat-form-input" type="text" aria-label="Ваше сообщение" placeholder="Напишите что-нибудь" required>
        <button class="chat-form-button" type="submit">Отправить</button>
      </form>
    </section>

    <template id="message-template">
      <div class="chat-message" tabindex="0">
        <span class="chat-message-name">Неопознанный енот</span>
        <p class="chat-message-text"></p>
        <button class="chat-message-button" type="button">Удалить</button>
      </div>
    </template>

    <script src="script.js"></script>
  </body>
</html>
*/

// Код

/*
var form = document.querySelector('.chat-form');
var inputText = form.querySelector('.chat-form-input');
var chat = document.querySelector('.chat-content');
var message = chat.children;
var temp = document.querySelector('#message-template').content;
var wrapper = temp.querySelector('.chat-message');
var parag = temp.querySelector('.chat-message-text');


var deleteMessage = function (mess) {
  var deleButton = mess.querySelector('.chat-message-button');
  deleButton.addEventListener('click', function () {
    mess.remove();
  });
};

for (var i = 0; i < message.length; i++) {
  deleteMessage(message[i]);
}

form.addEventListener('submit', function(evt) {
  evt.preventDefault();
  var messText = inputText.value;
  var wrapClone = wrapper.cloneNode(true);
  var description = wrapClone.querySelector('.chat-message-text');
  description.textContent = messText;
  chat.appendChild(wrapClone);
  inputText.value = '';

  deleteMessage(wrapClone);
  })
*/

// Обработчики событий
/*
const isEscapeKey = (evt) => evt.key === 'Escape';

const isEnterKey = (evt) => evt.key === 'Enter';

export {getRandomArrayElement, isEscapeKey, isEnterKey};

---------------

import {isEscapeKey, isEnterKey} from './util.js';
import {renderSimilarList, clearSimilarList} from './similar-list.js';

const userModalElement = document.querySelector('.setup');
const userModalOpenElement = document.querySelector('.setup-open');
const userModalCloseElement = userModalElement.querySelector('.setup-close');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function openUserModal () {
  userModalElement.classList.remove('hidden');
  renderSimilarList();

  document.addEventListener('keydown', onPopupEscKeydown);
}

function closeUserModal () {
  userModalElement.classList.add('hidden');
  clearSimilarList();

  document.removeEventListener('keydown', onPopupEscKeydown);
}

userModalOpenElement.addEventListener('click', () => {
  openUserModal();
});

userModalOpenElement.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    openUserModal();
  }
});

userModalCloseElement.addEventListener('click', () => {
  closeUserModal();
});

userModalCloseElement.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeUserModal();
  }
});

------------

import {createWizards} from './data.js';

const similarElement = document.querySelector('.setup-similar');
similarElement.classList.remove('hidden');

const similarListElement = similarElement.querySelector('.setup-similar-list');
const similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

const similarWizards = createWizards();

const renderSimilarList = () => {
  const similarListFragment = document.createDocumentFragment();

  similarWizards.forEach(({name, coatColor, eyesColor}) => {
    const wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = name;
    wizardElement.querySelector('.wizard-coat').style.fill = coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = eyesColor;
    similarListFragment.appendChild(wizardElement);
  });

  similarListElement.appendChild(similarListFragment);
};

const clearSimilarList = () => {
  similarListElement.innerHTML = '';
};

export {renderSimilarList, clearSimilarList};


*/

// Валидация в Pristine

/*
const orderForm = document.querySelector('.form');


const pristine = new Pristine(orderForm, {
  classTo: 'form__item',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'form__item',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
}, false);


function validateNickname (value) {
  return value.length >= 2 && value.length <= 50;
}

pristine.addValidator(
  orderForm.querySelector('#nickname'),
  validateNickname,
  'От 2 до 50 символов'
);


const amountField = orderForm.querySelector('#amount');
const maxAmount = {
  's': 10,
  'm': 5
};

function validateAmount (value) {
  const unit = orderForm.querySelector('[name="unit"]:checked');
  return value.length && parseInt(value) <= maxAmount[unit.value];
}

function getAmountErrorMessage () {
  const unit = orderForm.querySelector('[name="unit"]:checked');
  return `Не больше ${maxAmount[unit.value]} штук в одни руки`;
}

pristine.addValidator(amountField, validateAmount, getAmountErrorMessage);

function onUnitChange () {
  amountField.placeholder = maxAmount[this.value];
  pristine.validate(amountField);
}

orderForm
  .querySelectorAll('[name="unit"]')
  .forEach((item) => item.addEventListener('change', onUnitChange));


const deliveryField = orderForm.querySelector('[name="delivery"]');
const dateField = orderForm.querySelector('[name="date"]');
const deliveryOption = {
  'Доставка': ['Завтра', 'На выходных'],
  'Самовывоз': ['Сегодня', 'Завтра']
};

function validateDelivery () {
  return deliveryOption[deliveryField.value].includes(dateField.value);
}

function getDeliveryErrorMessage () {
  return `
    ${deliveryField.value}
    ${dateField.value.toLowerCase()}
    ${deliveryField.value === 'Доставка' ? 'невозможна' : 'невозможен'}
  `;
}

pristine.addValidator(deliveryField, validateDelivery, getDeliveryErrorMessage);
pristine.addValidator(dateField, validateDelivery, getDeliveryErrorMessage);


orderForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

*/

// Подключение карты с помощью библиотеки Leaflet

/*

const nextButton = document.querySelector('#next');

const map = L.map('map')
  .setView({
    lat: 59.95830,
    lng: 30.31748,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

const points = [
  {
    title: 'Футура',
    lat: 59.96925,
    lng: 30.31730,
  },
  {
    title: 'Шаверма',
    lat: 59.96783,
    lng: 30.31258,
  },
  {
    title: 'Франк',
    lat: 59.95958,
    lng: 30.30228,
  },
  {
    title: 'Ginza',
    lat: 59.97292,
    lng: 30.31982,
  },
];

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const createCustomPopup = (point) => {
  const balloonTemplate = document.querySelector('#balloon').content.querySelector('.balloon');
  const popupElement = balloonTemplate.cloneNode(true);

  popupElement.querySelector('.balloon__title').textContent = point.title;
  popupElement.querySelector('.balloon__lat-lng').textContent = `Координаты: ${point.lat}, ${point.lng}`;

  return popupElement;
};

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (point) => {
  const {lat, lng} = point;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(createCustomPopup(point));
};

points.slice(0, points.length / 2).forEach((point) => {
  createMarker(point);
});

nextButton.addEventListener('click', () => {
  markerGroup.clearLayers();
  points.slice(points.length / 2).forEach((point) => {
    createMarker(point);
  });
  nextButton.remove();
});


*/

// Пример использования async await вместо цепочек методов
/*

async function sendPosts () {
    let response;
    try {
        response = await fetch('jsonplaceholder.typicode.com', {
            method: 'POST',
            body: JSON.stringify({
                    title: 'Заголовок',
                    body: 'Тело',
                    userId: 31337
            }),
        },
    );
        if (!response.ok) {
            throw new Error(`${response.status} - ${response.statusText}`);
        }
    } catch (err) {
        return alert(err);
    }

    const post = await response.json();
    return post;
}

(async function() {
    const result =  await sendPosts();
    console.log(result);
})();

*/

// устранение дребезга с помощью функции debounce

/*

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


import {debounce} from './util.js';

const RERENDER_DELAY = 500;

getData((wizards) => {
  renderSimilarList(wizards);
  setEyesClick(debounce(
    () => renderSimilarList(wizards),
    RERENDER_DELAY,
  ));
  setCoatClick(debounce(
    () => renderSimilarList(wizards),
    RERENDER_DELAY,
  ));
});

*/
