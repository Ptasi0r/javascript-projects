const audioEl = document.querySelector('.audio');

// Bottom and Pop-up title
const titles = document.querySelectorAll('.title-change');

// Song covers
const coverBottom = document.querySelector('.cover-change');
const coverRotate = document.querySelector('.cover-to-rotate');

//Progress bars
const progressContainer = document.querySelectorAll('.progress-bar');
const progressEL = document.querySelectorAll('.audio-progress');

//Buttons Bottom
const playBtnBottom = document.querySelector('.pause-bottom');
const nextBtnBottom = document.querySelector('.next-song-bottom');
const showPopup = document.querySelector('.expand-card');
const playImgBottom = playBtnBottom.querySelector('img');

//Button Pop-up
const popup = document.querySelector('.music-info-popup');
const hidePopup = document.querySelector('.hide-popup');
const prevBtnPopup = document.querySelector('.pre-song-popup');
const nextBtnPopup = document.querySelector('.next-song-popup');
const playBtnPopup = document.querySelector('.pause-popup');
const playImgPopup = playBtnPopup.querySelector('img');

//Volume contorl
const volumeContainer = document.querySelector('.volume-bar');
const volumeEl = document.querySelector('.volume-progress');
const volumeMuteBtn = document.querySelector('.volume-mute');

// Songs items
const playSongBtns = document.querySelectorAll('.play-song');
const likeSongBtns = document.querySelectorAll('.like-song');

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
let likedSongs = [];

// Update song details
const loadSong = (song) => {
  titles.forEach((el) => {
    el.innerHTML = `
    <h4 class="song-name">${song.name}</h4>
    <h5 class="song-artist">${song.artist}</h5>`;
  });
  coverBottom.src = `songs/covers/${song.songName}.jpg`;
  coverRotate.src = `songs/covers/${song.songName}.jpg`;

  audioEl.src = `songs/music/${song.songName}.mp3`;
};

const playSong = () => {
  coverRotate.classList.add('play');

  //Change icons
  playImgBottom.setAttribute('src', 'img/pause-small.svg');
  playImgPopup.setAttribute('src', 'img/pause-big.svg');

  audioEl.play();
  updateLocalStorage();
};

const pauseSong = () => {
  coverRotate.classList.remove('play');

  //Change icons
  playImgBottom.setAttribute('src', 'img/play-small.svg');
  playImgPopup.setAttribute('src', 'img/play-big.svg');
  audioEl.pause();
  updateLocalStorage();
};

const prevSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
};

const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
};

//Update progress bar

const updateProgress = (e) => {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  // console.log(progressPercent);
  progressEL.forEach((progress) => {
    progress.style.width = `${progressPercent}%`;
  });
};

//Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audioEl.duration;

  audioEl.currentTime = (clickX / width) * duration;
  updateLocalStorage();
}

// Set volume bar
function setVolume(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  volumeEl.style.width = `${(clickX / width) * 100}%`;
  audioEl.volume = clickX / width;
  updateLocalStorage();
}

// Update LocalStorage item
const updateLocalStorage = () => {
  const musicPlayer = {
    songIndex: songIndex,
    volume: audioEl.volume,
    lastKnownProgress: audioEl.currentTime,
    likedSongs: likedSongs,
  };
  localStorage.setItem('musicPlayer', JSON.stringify(musicPlayer));
};

// Get data from LocalStorage
const getDataFromLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem('musicPlayer'));
  // Set current song
  if (data.songIndex) {
    songIndex = data.songIndex;
  } else {
    songIndex = 1;
  }

  //Set volume
  if (data.volume) {
    audioEl.volume = +data.volume;
    volumeEl.style.width = `${+data.volume * 100}%`;
  } else {
    audioEl.volume = 0.2;
  }

  if (data.lastKnownProgress) {
    audioEl.currentTime = data.lastKnownProgress;
    progressEL.forEach((progress) => {
      progress.style.width = `${(data.lastKnownProgress / audioEl.duration) * 100}%`;
    });
  }

  if (data.likedSongs && data.likedSongs.length > 0) {
    likedSongs = data.likedSongs;
  }
};

const updateHearts = () => {
  likeSongBtns.forEach((el) => {
    if (likedSongs.includes(el.dataset.name)) {
      const svg = el.querySelector('svg path');
      svg.style.fill = 'cf1b1b';
    }
  });
};

//Initally load song details into DOM
getDataFromLocalStorage();
loadSong(songs[songIndex]);
updateHearts();
audioEl.volume = '0.2';

//Show and hide popup
showPopup.addEventListener('click', () => {
  popup.classList.add('show');
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
  // console.log(audioEl.paused);
  if (!isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

playBtnPopup.addEventListener('click', () => {
  const isPlaying = audioEl.paused;
  // console.log(audioEl.paused);
  if (!isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
nextBtnBottom.addEventListener('click', nextSong);
nextBtnPopup.addEventListener('click', nextSong);
prevBtnPopup.addEventListener('click', prevSong);

// Time/song update
audioEl.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.forEach((container) => {
  container.addEventListener('click', setProgress);
});

//Change volume
volumeContainer.addEventListener('click', setVolume);

// Song ends
audioEl.addEventListener('ended', nextSong);

//Play choosen song
playSongBtns.forEach((playSongBtn) => {
  playSongBtn.addEventListener('click', () => {
    const songToPlay = playSongBtn.dataset.name;

    const choosenSong = songs.find((el) => {
      if (el.songName == [songToPlay]) {
        return true;
      } else {
        return false;
      }
    });

    popup.classList.add('show');
    loadSong(choosenSong);
    songIndex = songs.findIndex((i) => i.songName === songToPlay);
    playSong();
  });
});

// Like songs
likeSongBtns.forEach((likeSongBtn) => {
  likeSongBtn.addEventListener('click', () => {
    const likedSong = likeSongBtn.dataset.name;
    // console.log(likedSongs.includes(likedSong), likedSong);
    if (likedSongs.includes(likedSong)) {
      likedSongs = likedSongs.filter((item) => item !== likedSong);
      const svg = likeSongBtn.querySelector('svg path');
      svg.style.fill = '#959595';
    } else {
      likedSongs.push(likedSong);
      const svg = likeSongBtn.querySelector('svg path');
      svg.style.fill = 'cf1b1b';
    }
    updateLocalStorage();
  });
});
