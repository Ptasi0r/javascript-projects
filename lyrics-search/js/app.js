const form = document.querySelector('.form');
const search = document.querySelector('.search');
const result = document.querySelector('.result');
const more = document.querySelector('.more');

const API_URL = 'https://api.lyrics.ovh';

// Search by a song or artist
const searchSongs = async (searchTerm) => {
  const respond = await fetch(`${API_URL}/suggest/${searchTerm}`);
  const data = await respond.json();
  console.log(data);
  showData(data);
};

// Show song and artist in DOM
const showData = (data) => {
  // let output = '';
  // data.data.forEach((song) => {
  //   output += `
  //     <li>
  //       <span><strong>${song.artist.name}</strong> - ${song.title}</span>
  //       <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
  //     </li>
  //   `;
  // });

  // result.innerHTML = `
  //   <ul class="songs">
  //     ${output}
  //   </ul>
  // `;

  result.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(
          (song) => ` 
          <li>
            <img src="${song.album.cover_small.replace('http://e-cdn-images.deezer.com/', 'https://cdns-images.dzcdn.net')}">
            <span><strong>${song.artist.name}</strong> - ${song.title}</span>
            <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}" data-songid="${song.id}">Get Lyrics</button>
          </li>`
        )
        .join('')}

    </ul>
  `;

  if (data.prev || data.next) {
    more.innerHTML = `
      ${data.prev ? `<button class="btn" onclick="getMoreSong('${data.prev}')">Prev</button>` : ''}
      ${data.next ? `<button class="btn" onclick="getMoreSong('${data.next}')">Next</button>` : ''}
    `;
  } else {
    more.innerHTML = '';
  }
};

// Get prev and next songs
const getMoreSong = async (url) => {
  const respond = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await respond.json();
  console.log(data);
  showData(data);
};

// Get lyrics for song
const getLyrics = async (artist, songTitle, songID) => {
  const lyricsRespond = await fetch(`${API_URL}/v1/${artist}/${songTitle}`);
  const lyricsData = await lyricsRespond.json();
  let lyrics = '';
  // Check if lyrics was found
  if (lyricsData.error) {
    lyrics = "<p style='color: red; text-align: center'> Unfortunately, we didn't found lyrics for this song </p>";
  } else {
    lyrics = lyricsData.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
  }
  // Get more info from Deezer API
  const songRespond = await fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/${songID}`);
  const songData = await songRespond.json();
  console.log(songData);

  result.innerHTML = `
      <div class="lyrics-header">
        <img src="${songData.album.cover_big}">
        <div class="lyrics-info">
          <h2><strong>${songTitle}</strong><br>${artist}</h2> 
          <hr>

          <a href="${songData.link}" target="_block"><img src="img/deezer-logo.png">Listen on Deezer</a>
          <div class="audio-player">
            <button class="pause-bottom">
              <img src="img/play-small.svg" alt="Play icon" />
            </button>
            <div class="song-progress">
              <span class="base progress-bar"><span class="progress audio-progress"></span></span>
            </div>
            <span class="song-time">0:30</span>
            <audio src="${songData.preview}" class="audio"></audio>
          </div>
          
        </div>
      </div>
      <span>
        <h3 class="lyrics-h3">Lyrics</h3>
        ${lyrics}
      </span>
    `;
  more.innerHTML = '';
  setupMusicPlayer();
};

// Gets elements and eventListeners to play music

const setupMusicPlayer = () => {
  const audioEl = document.querySelector('.audio');
  const progressContainer = document.querySelector('.progress-bar');
  const progressEL = document.querySelector('.audio-progress');
  const playBtnBottom = document.querySelector('.pause-bottom');
  const playImgBottom = playBtnBottom.querySelector('img');

  const playSong = () => {
    playImgBottom.setAttribute('src', `img/pause-small.svg`);
    audioEl.volume = 0.2;
    audioEl.play();
  };

  const pauseSong = () => {
    playImgBottom.setAttribute('src', `img/play-small.svg`);
    audioEl.pause();
  };

  const updateProgress = (e) => {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressEL.style.width = `${progressPercent}%`;
    const time = Math.floor(duration - currentTime);
    document.querySelector('.song-time').innerHTML = '0:' + `${time < 10 ? `0${time}` : `${time}`}`;
  };

  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioEl.duration;

    audioEl.currentTime = (clickX / width) * duration;
  }

  playBtnBottom.addEventListener('click', () => {
    const isPlaying = audioEl.paused;
    if (!isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  });

  audioEl.addEventListener('timeupdate', updateProgress);
  progressContainer.addEventListener('click', setProgress);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert('Please type in a search term');
  } else {
    searchSongs(searchTerm);
  }
});

result.addEventListener('click', (e) => {
  const clickedEl = e.target;
  if (clickedEl.tagName === 'BUTTON') {
    const artist = clickedEl.dataset.artist;
    const songTitle = clickedEl.dataset.songtitle;
    const songID = clickedEl.dataset.songid;

    getLyrics(artist, songTitle, songID);
  }
});
