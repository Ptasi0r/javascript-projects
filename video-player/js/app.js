const video = document.querySelector('.video');
const play = document.querySelector('.play-btn');
const stop = document.querySelector('.stop-btn');
const progress = document.querySelector('.progress');
const timestamp = document.querySelector('.video-time');
const volumeSlider = document.querySelector('.volume');
const volumeMute = document.querySelector('.volume-mute');
let previousVolume = 0;

// Play & pause video
const toggleVideoStatus = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

// update play/pause icon
const updatePlayIcon = () => {
  if (video.paused) {
    play.innerHTML = '<i class="fas fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fas fa-pause fa-2x"></i>';
  }
};

// Update progress & timestamp
const updateProgress = () => {
  progress.value = (video.currentTime / video.duration) * 100;
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = '0' + String(mins);
  }

  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = '0' + String(secs);
  }

  timestamp.innerHTML = `${mins}:${secs}`;
};

// Stop video
const stopVideo = () => {
  video.currentTime = 0;
  video.pause();
};

// Set video time to progress
const setVideoProgress = () => {
  video.currentTime = (+progress.value * video.duration) / 100;
};

// Set video volume to value
const setVideoVolume = () => {
  let volumeValue = volumeSlider.value;
  video.volume = volumeValue / 100;
  localStorage.setItem('videoVolume', volumeValue);
};

// Mute/Unmute video
const changeMuteVideo = () => {
  if (video.volume == 0) {
    video.volume = previousVolume;
    volumeMute.innerHTML = '<i class="fas fa-volume-down fa-2x">';
    volumeSlider.value = previousVolume * 100;
  } else {
    previousVolume = video.volume;
    video.volume = 0;
    volumeMute.innerHTML = '<i class="fas fa-volume-mute fa-2x">';
    volumeSlider.value = 0;
  }
};

video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

progress.addEventListener('input', setVideoProgress);

volumeSlider.addEventListener('input', setVideoVolume);

volumeMute.addEventListener('click', changeMuteVideo);

// Get data from LocalStorage
const videoVolumeLS = localStorage.getItem('videoVolume');
console.log(videoVolumeLS);
if (videoVolumeLS) {
  video.volume = +videoVolumeLS / 100;
  volumeSlider.value = videoVolumeLS;
} else {
  video.volume = 0.5;
}
