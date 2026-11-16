const audio = document.getElementById('audio-track');
const playBtn = document.getElementById('play-btn');
const playIcon = playBtn.querySelector('.fa-icon');
const waveformGifs = document.querySelectorAll('.audio-waveform');

function setPlaybackState(isPlaying) {
  playIcon.classList.toggle('fa-play', !isPlaying);
  playIcon.classList.toggle('fa-pause', isPlaying);
  playBtn.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
}

function setWaveformPlaying(isPlaying) {
  waveformGifs.forEach((gif) => {
    gif.src = isPlaying ? gif.dataset.animatedSrc : gif.dataset.staticSrc;
  });
}

setWaveformPlaying(false);

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().catch((error) => {
      console.error('Audio playback failed:', error);
    });
  } else {
    audio.pause();
  }
});

audio.addEventListener('playing', () => {
  setPlaybackState(true);
  setWaveformPlaying(true);
});

audio.addEventListener('pause', () => {
  setPlaybackState(false);
  setWaveformPlaying(false);
});

audio.addEventListener('waiting', () => setWaveformPlaying(false));
audio.addEventListener('ended', () => {
  setPlaybackState(false);
  setWaveformPlaying(false);
});

const modalBindings = [
  ['idea-btn', 'idea-modal'],
  ['gameplay-btn', 'gameplay-modal'],
  ['journey-btn', 'journey-modal'],
  ['interaction-btn', 'interaction-modal'],
  ['engineering-btn', 'engineering-modal'],
  ['mobile-btn', 'mobile-modal'],
  ['sound-btn', 'sound-modal'],
  ['complete-btn', 'complete-modal'],
  ['ack-btn', 'ack-modal']
];

function closeModal(modal) {
  modal.classList.remove('modal-anim-transition');
  setTimeout(() => {
    modal.style.visibility = 'hidden';
  }, 500);
}

modalBindings.forEach(([buttonId, modalId]) => {
  const button = document.getElementById(buttonId);
  const modal = document.getElementById(modalId);
  const closeButton = modal.querySelector('.modal-close');

  button.addEventListener('click', () => {
    modal.style.visibility = 'visible';
    modal.classList.add('modal-anim-transition');
  });

  closeButton.addEventListener('click', () => closeModal(modal));
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});