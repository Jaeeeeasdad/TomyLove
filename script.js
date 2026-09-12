// ---------------------------------------------------
// drifting petals ambience
// ---------------------------------------------------
function createPetals() {
  const field = document.getElementById('petalField');
  const count = window.innerWidth < 600 ? 10 : 16;
  const colors = ['#E8B8E0', '#C68FE6', '#F0C9E0', '#D9AEE9'];

  for (let i = 0; i < count; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';

    const size = 10 + Math.random() * 14;
    const left = Math.random() * 100;
    const duration = 14 + Math.random() * 16;
    const delay = Math.random() * -20;
    const driftX = (Math.random() * 120 - 60) + 'px';
    const color = colors[Math.floor(Math.random() * colors.length)];

    petal.style.left = left + 'vw';
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    petal.style.animationDuration = duration + 's';
    petal.style.animationDelay = delay + 's';
    petal.style.setProperty('--drift-x', driftX);

    petal.innerHTML = `
      <svg viewBox="0 0 24 24" width="100%" height="100%">
        <path d="M12 2c3 3 3 7 0 10-3-3-3-7 0-10z" fill="${color}"/>
        <path d="M12 22c-3-3-3-7 0-10 3 3 3 7 0 10z" fill="${color}"/>
        <path d="M2 12c3-3 7-3 10 0-3 3-7 3-10 0z" fill="${color}"/>
        <path d="M22 12c-3 3-7 3-10 0 3-3 7-3 10 0z" fill="${color}"/>
      </svg>`;

    field.appendChild(petal);
  }
}
createPetals();

// ---------------------------------------------------
// envelope open -> reveal letter
// ---------------------------------------------------
const envelopeButton = document.getElementById('envelopeButton');
const envelopeScene = document.getElementById('envelopeScene');
const letterScene = document.getElementById('letterScene');
const letterCard = document.getElementById('letterCard');
const bgSong = document.getElementById('bgSong');
const musicToggle = document.getElementById('musicToggle');

let opened = false;

envelopeButton.addEventListener('click', () => {
  if (opened) return;
  opened = true;

  envelopeButton.classList.add('is-open');

  // try to start the song the moment the person interacts with the page
  attemptPlay();

  setTimeout(() => {
    envelopeScene.classList.add('is-leaving');
  }, 450);

  setTimeout(() => {
    envelopeScene.style.display = 'none';
    letterScene.classList.add('is-visible');
    requestAnimationFrame(() => {
      letterCard.classList.add('is-revealed');
    });
  }, 950);
});

// ---------------------------------------------------
// music toggle
// ---------------------------------------------------
function setPlayingUI(isPlaying) {
  musicToggle.classList.toggle('playing', isPlaying);
  musicToggle.setAttribute('aria-pressed', String(isPlaying));
  musicToggle.setAttribute('aria-label', isPlaying ? 'Pause background song' : 'Play background song');
}

function attemptPlay() {
  const playPromise = bgSong.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => setPlayingUI(true))
      .catch(() => setPlayingUI(false)); // autoplay blocked or file missing — wait for manual tap
  }
}

musicToggle.addEventListener('click', () => {
  if (bgSong.paused) {
    attemptPlay();
  } else {
    bgSong.pause();
    setPlayingUI(false);
  }
});

bgSong.addEventListener('error', () => {
  musicToggle.title = 'Add a song.mp3 file next to index.html to enable music';
});
