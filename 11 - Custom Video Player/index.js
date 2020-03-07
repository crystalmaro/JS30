// get elemenet
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.player__fullScreen');

// build functions
function togglePlay() {
  // paused is a property for video (but no playing property)
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  // const method = video.paused ? 'play' : 'pause';
  // video[method]();
  // video[video.paused ? 'play' : 'pause']();
}

function updateButton() {
  // this is bind to the video element
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  const skip = Number(this.dataset.skip);
  video.currentTime += skip
}

function handleRangeUpdate() {
  video[this.name] = this.value;
  console.log(video.duration)
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  console.log(progress.offsetWidth)
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubTime;
}

function openFullscreen() {
  if (player.requestFullscreen) {
    player.requestFullscreen();
  } else if (player.mozRequestFullScreen) { /* Firefox */
    player.mozRequestFullScreen();
  } else if (player.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    player.webkitRequestFullscreen();
  } else if (player.msRequestFullscreen) { /* IE/Edge */
    player.msRequestFullscreen();
  }
}

// hook up event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('click', handleRangeUpdate))
// ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousedown', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mouseup', handleRangeUpdate))

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullScreen.addEventListener('click', openFullscreen)
