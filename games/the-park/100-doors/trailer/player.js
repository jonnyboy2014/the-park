const trailer = document.querySelector('#release-trailer');
const playButton = document.querySelector('#trailer-play');
const playTitle = playButton.querySelector('strong');
const playHint = playButton.querySelector('small');

function showPlayButton(title, hint, label) {
  playTitle.textContent = title;
  playHint.textContent = hint;
  playButton.setAttribute('aria-label', label);
  playButton.classList.remove('hidden');
}

playButton.addEventListener('click', async () => {
  if (trailer.ended) trailer.currentTime = 0;
  try {
    await trailer.play();
  } catch {
    showPlayButton('PRESS PLAY BELOW', 'Your browser blocked the play button', 'Use the video controls to play');
  }
});

trailer.addEventListener('play', () => {
  playButton.classList.add('hidden');
});

trailer.addEventListener('pause', () => {
  if (trailer.ended) return;
  if (trailer.currentTime === 0) {
    showPlayButton('PLAY TRAILER', 'Sound on • 87 seconds', 'Play the release trailer');
  } else {
    showPlayButton('RESUME TRAILER', 'Continue your escape', 'Resume the release trailer');
  }
});

trailer.addEventListener('ended', () => {
  showPlayButton('WATCH AGAIN', 'Replay the 87-second trailer', 'Replay the release trailer');
});
