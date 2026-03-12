// videoCarousel.js — Video-only carousel for About page
// Handles: mp4 autoplay (muted), sound toggle, YouTube iframe injection,
//          video-end auto-advance, prev/next, dots, swipe, keyboard.

(function () {
  'use strict';

  document.querySelectorAll('[data-vc]').forEach(initVC);

  function initVC(vc) {
    var track    = vc.querySelector('.vc-track');
    var slides   = Array.prototype.slice.call(vc.querySelectorAll('.vc-slide'));
    var dots     = vc.querySelectorAll('.vc-dot');
    var prevBtn  = vc.querySelector('.vc-nav--prev');
    var nextBtn  = vc.querySelector('.vc-nav--next');
    var soundBtn = vc.querySelector('.vc-sound-btn');
    var pauseBtn = vc.querySelector('.vc-pause-btn');
    var counter  = vc.querySelector('.vc-counter-current');
    var nudge    = vc.querySelector('.vc-unmute-nudge');
    var total    = slides.length;

    if (!track || total === 0) return;

    var current  = 0;
    var soundOn  = false; // muted by default (browser policy)

    // Auto-hide nudge after 3.2s
    var nudgeTimer = setTimeout(function () {
      hideNudge();
    }, 3200);

    function hideNudge() {
      if (nudge) nudge.classList.add('vc-nudge--hidden');
    }

    // --- Sound icon sync ---
    function syncSoundIcon() {
      var icon = soundBtn && soundBtn.querySelector('i');
      if (!icon) return;
      icon.className = soundOn ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
    }

    // --- Apply sound state to a video element ---
    function applySound(video) {
      if (!video) return;
      video.muted = !soundOn;
    }

    // --- Pause and teardown current slide ---
    function leaveSlide(idx) {
      var slide = slides[idx];
      var video = slide.querySelector('.vc-video');
      var iframe = slide.querySelector('.vc-yt');

      if (video) {
        video.pause();
        video.currentTime = 0;
      }

      if (iframe && iframe.src) {
        // Stop YouTube by clearing src; save embedId for re-use
        iframe.src = '';
      }

      // Remove yt-active attribute
      vc.removeAttribute('data-yt-active');
    }

    // --- Activate incoming slide ---
    function enterSlide(idx) {
      var slide = slides[idx];
      var video = slide.querySelector('.vc-video');
      var iframe = slide.querySelector('.vc-yt');

      if (video) {
        applySound(video);
        var playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(function () {
            // Blocked by browser — leave muted fallback
          });
        }
      }

      if (iframe) {
        var embedId = iframe.dataset.embedid;
        if (embedId) {
          // Inject src with autoplay=1 mute=1 (YouTube iframe — cannot unmute cross-origin)
          iframe.src =
            'https://www.youtube.com/embed/' + embedId +
            '?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1';
        }
        // Signal CSS to hide sound button & nudge on YT slides
        vc.setAttribute('data-yt-active', '');
      }
    }

    // --- Navigate to slide index ---
    function goTo(idx) {
      if (idx < 0)      idx = total - 1;
      if (idx >= total) idx = 0;

      leaveSlide(current);
      current = idx;

      track.style.transform = 'translateX(-' + (current * 100) + '%)';

      // Update counter
      if (counter) counter.textContent = current + 1;

      // Update dots
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === current);
      });

      enterSlide(current);
      syncPauseIcon();
    }

    // --- Sync pause button icon to video state ---
    function syncPauseIcon() {
      var icon = pauseBtn && pauseBtn.querySelector('i');
      if (!icon) return;
      var video = slides[current].querySelector('.vc-video');
      var isPaused = !video || video.paused;
      icon.className = isPaused ? 'fa-solid fa-play' : 'fa-solid fa-pause';
    }

    // --- Pause / Play toggle ---
    if (pauseBtn) {
      pauseBtn.addEventListener('click', function () {
        var slide = slides[current];
        var video = slide.querySelector('.vc-video');
        var iframe = slide.querySelector('.vc-yt');

        if (video) {
          if (video.paused) {
            video.play().catch(function () {});
          } else {
            video.pause();
          }
          syncPauseIcon();
        }

        // For YouTube: toggle visibility of a paused overlay (can't control iframe playback)
        if (iframe) {
          // Nothing meaningful we can do cross-origin; button is hidden for YT slides
        }
      });
    }

    // --- Sound toggle ---
    if (soundBtn) {
      soundBtn.addEventListener('click', function () {
        soundOn = !soundOn;
        syncSoundIcon();

        // Apply to currently playing video
        var activeVideo = slides[current].querySelector('.vc-video');
        applySound(activeVideo);

        // Hide nudge once user interacts with sound
        clearTimeout(nudgeTimer);
        hideNudge();
      });
    }

    // --- Video ended → advance to next slide ---
    slides.forEach(function (slide) {
      var video = slide.querySelector('.vc-video');
      if (video) {
        video.addEventListener('ended', function () {
          goTo(current + 1);
          syncPauseIcon();
        });
        // Keep pause icon in sync if video stalls or browser pauses it
        video.addEventListener('play',  function () { syncPauseIcon(); });
        video.addEventListener('pause', function () { syncPauseIcon(); });
      }
    });

    // --- Prev / Next ---
    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });

    // --- Dot clicks ---
    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        goTo(parseInt(dot.dataset.index, 10));
      });
    });

    // --- Touch swipe ---
    var touchX = 0;
    vc.addEventListener('touchstart', function (e) {
      touchX = e.touches[0].clientX;
    }, { passive: true });

    vc.addEventListener('touchend', function (e) {
      var diff = touchX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        goTo(diff > 0 ? current + 1 : current - 1);
      }
    }, { passive: true });

    // --- Keyboard navigation ---
    vc.setAttribute('tabindex', '0');
    vc.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft')  goTo(current - 1);
      if (e.key === 'ArrowRight') goTo(current + 1);
    });

    // --- Init: start first slide ---
    goTo(0);
    syncSoundIcon();
  }

})();
