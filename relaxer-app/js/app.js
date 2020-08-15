const container = document.querySelector('.container');
const text = document.querySelector('.text');
const audioEl = document.querySelector('.audio');
const playBtnBottom = document.querySelector('.pause-bottom');
const playImgBottom = playBtnBottom.querySelector('img');
//Volume contorl
const volumeContainer = document.querySelector('.volume-bar');
const volumeEl = document.querySelector('.volume-progress');
const volumeMuteBtn = document.querySelector('.volume-mute');
const reloadBtn = document.querySelector('.reload-bottom');

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

const places = ['water', 'forest', 'sea', 'rain'];
let path = '';

breathAnimation();

const playSong = () => {
  playImgBottom.setAttribute('src', `${path}img/pause-small.svg`);
  audioEl.play();
};

const pauseSong = () => {
  playImgBottom.setAttribute('src', `${path}img/play-small.svg`);

  audioEl.pause();
};

// Init App
const place = places[Math.floor(Math.random() * places.length)];
document.body.style.backgroundImage = `url('img/${place}.jpg')`;
//Initally load song details into DOM
try {
  audioEl.src = `${path}music/${place}.mp3`;
} catch {
  audioEl.src = `https://raw.githubusercontent.com/Ptasi0r/javascript-projects/master/relaxer-app/music/${place}.mp3`;
  path = 'https://raw.githubusercontent.com/Ptasi0r/javascript-projects/master/relaxer-app/';
}

audioEl.volume = 0.2;
playSong();

function breathAnimation() {
  text.innerText = 'Breathe In!';
  container.className = 'container grow';
  setTimeout(() => {
    text.innerText = 'Hold';
    setTimeout(() => {
      text.innerText = 'Breathe Out!';
      container.className = 'container shrink';
    }, holdTime);
  }, breatheTime);
}

setInterval(breathAnimation, totalTime);

// Set volume bar
function setVolume(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  volumeEl.style.width = `${(clickX / width) * 100}%`;
  audioEl.volume = clickX / width;
}

playBtnBottom.addEventListener('click', () => {
  const isPlaying = audioEl.paused;
  // console.log(audioEl.paused);
  if (!isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

volumeContainer.addEventListener('click', setVolume);

reloadBtn.addEventListener('click', () => {
  window.location.reload();
});

audioEl.addEventListener('ended', () => {
  audioEl.src = `${path}music/${place}.mp3`;
});
