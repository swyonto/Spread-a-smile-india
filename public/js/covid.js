const initHoverPlay = () => {
  const videoCards = document.querySelectorAll('.covid-video-card');
  console.log('covid.js initialized. Found video cards:', videoCards.length);

  videoCards.forEach((card, index) => {
    const video = card.querySelector('video');
    const playOverlay = card.querySelector('.covid-video-play-overlay');
    const soundBtn = card.querySelector('.covid-video-sound-btn');
    const soundIcon = soundBtn ? soundBtn.querySelector('i') : null;

    if (!video) {
      console.warn(`No video element found in card index ${index}`);
      return;
    }

    // Explicitly set muted, loop, and playsinline attributes programmatically
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    // Play video on hover
    card.addEventListener('mouseenter', () => {
      // Force muted state again on hover to comply with browser autoplay requirements
      video.muted = true;
      
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log(`Video ${index} started playing successfully on hover.`);
          // Fade out play icon overlay when video plays successfully
          if (playOverlay) {
            playOverlay.style.opacity = '0';
            playOverlay.style.transform = 'translate(-50%, -50%) scale(0.8)';
          }
        }).catch(error => {
          console.warn(`Video ${index} play attempt failed:`, error);
        });
      }
    });

    // Pause video when mouse leaves
    card.addEventListener('mouseleave', () => {
      video.pause();
      console.log(`Video ${index} paused.`);
      // Show the play icon overlay again
      if (playOverlay) {
        playOverlay.style.opacity = '1';
        playOverlay.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    });

    // Toggle mute/unmute on button click
    if (soundBtn && soundIcon) {
      soundBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Stop click from propagating

        // Toggle state
        video.muted = !video.muted;
        console.log(`Video ${index} volume toggled. Muted state:`, video.muted);

        if (video.muted) {
          soundIcon.className = 'fa-solid fa-volume-xmark';
          soundBtn.setAttribute('aria-label', 'Unmute sound');
        } else {
          soundIcon.className = 'fa-solid fa-volume-high';
          soundBtn.setAttribute('aria-label', 'Mute sound');
        }
      });
    }
  });
};

// Handle cases where DOMContentLoaded may have already fired
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHoverPlay);
} else {
  initHoverPlay();
}
