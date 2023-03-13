import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// Пошук плеєра в DOM
const iframe = document.querySelector('#vimeo-player');

// Ініціалізація бібліотеки
const player = new Player(iframe);

// Запис ключа до сховища у КОНСТАНТУ для уникнення антипатерну
const CURRENT_TIME_KEY = 'videoplayer-current-time';

// Функція для запису поточного часу відтворення у локальне сховище
const onPlay = function (data) {
  localStorage.setItem(CURRENT_TIME_KEY, data.seconds);
};

// Відстеження події оновлення часу відтворення
player.on('timeupdate', throttle(onPlay, 1000));

//  Отримання поточного часу відтворення зі сховища
const currentPlayTime = Number(localStorage.getItem(CURRENT_TIME_KEY));

player
  .setCurrentTime(currentPlayTime)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
