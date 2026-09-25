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

    // Ensure safe ImageKit delivery bypassing transformation limits
    if (video.src && video.src.includes('ik.imagekit.io') && !video.src.includes('orig-true')) {
      video.src = video.src.includes('?') ? `${video.src}&tr=orig-true` : `${video.src}?tr=orig-true`;
    }

    // Explicitly set muted, loop, and playsinline attributes programmatically
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');

    function playVideo() {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          if (playOverlay) {
            playOverlay.style.opacity = '0';
            playOverlay.style.transform = 'translate(-50%, -50%) scale(0.8)';
          }
        }).catch(() => {});
      }
    }

    function pauseVideo() {
      video.pause();
      if (playOverlay) {
        playOverlay.style.opacity = '1';
        playOverlay.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    }

    // Play video on hover
    card.addEventListener('mouseenter', playVideo);

    // Pause video when mouse leaves
    card.addEventListener('mouseleave', pauseVideo);

    // Toggle play/pause on card click
    card.addEventListener('click', (e) => {
      if (e.target.closest('.covid-video-sound-btn')) return;
      if (video.paused) playVideo(); else pauseVideo();
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
