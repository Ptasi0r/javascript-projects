const audioEl = document.querySelector('.audio');

// Bottom and Pop-up title
const titles = document.querySelectorAll('.title-change');

// Song covers
const coverBottom = document.querySelectorAll('.cover-change');
const coverRotate = document.querySelector('.cover-to-rotate');

//Progress bars
const progressContainer = document.querySelectorAll('.progress-bar');
const progressEL = document.querySelectorAll('.progress');

//Buttons Bottom
const playBtnBottom = document.querySelector('.pause-bottom');
const nextBtnBottom = document.querySelector('.next-song-bottom');
const showPopup = document.querySelector('.expand-card');
const playImgBottom = playBtnBottom.querySelector('img');

//Button Pop-up
const popup = document.querySelector('.music-info-popup');
const hidePopup = document.querySelector('.hide-popup');
const playBtnPopup = document.querySelector('.pause-popup');
const playImgPopup = playBtnPopup.querySelector('img');

//Songs titles
const songs = [
  {
    name: 'Let Me Down Slowly',
    artist: 'Alec Benjamin',
    songName: 'let-me-down-slowly',
  },
  {
    name: 'If I Killed Someone For You',
    artist: 'Alec Benjamin',
    songName: 'if-i-killed-someone-for-you',
  },
  {
    name: 'Mind In A Prison',
    artist: 'Alec Benjamin',
    songName: 'mind-in-a-prison',
  },
  {
    name: 'Demons',
    artist: 'Alec Benjamin',
    songName: 'demons',
  },
];

let songIndex = 1;

// Update song details
const loadSong = (song) => {
  titles.forEach((el) => {
    el.innerHTML = `
    <h4 class="song-name">${song.name}</h4>
    <h5 class="song-artist">${song.artist}</h5>`;
  });
  audioEl.src = `songs/music/${song.songName}.mp3`;
};

const playSong = () => {
  coverRotate.classList.add('play');

  //Change icons
  playImgBottom.setAttribute('src', 'img/pause-small.svg');
  playImgPopup.setAttribute('src', 'img/pause-big.svg');

  audioEl.play();
  audioEl.volume = '0.2';
};

const pauseSong = () => {
  coverRotate.classList.remove('play');

  //Change icons
  playImgBottom.setAttribute('src', 'img/play-small.svg');
  playImgPopup.setAttribute('src', 'img/play-big.svg');
  audioEl.pause();
};

//Initally load song details into DOM
loadSong(songs[songIndex]);

//Show and hide popup

showPopup.addEventListener('click', () => {
  popup.classList.add('show');
  console.log('aa');
});

hidePopup.addEventListener('click', () => {
  popup.animate([{ transform: 'translateY(0px)' }, { transform: 'translateY(100%)' }], {
    duration: 1000,
  });
  setTimeout(() => {
    popup.classList.remove('show');
  }, 900);
});

//Play or pause song

playBtnBottom.addEventListener('click', () => {
  const isPlaying = audioEl.paused;
  console.log(audioEl.paused);
  if (!isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

playBtnPopup.addEventListener('click', () => {
  const isPlaying = audioEl.paused;
  console.log(audioEl.paused);
  if (!isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
