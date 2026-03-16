// carousel.js — Carousel interaction logic
// Auto-initialises every [data-carousel] element on the page

(function () {
  'use strict';

  var AUTOPLAY_DELAY = 5000;

  document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
    initCarousel(carousel);
  });

  function initCarousel(carousel) {
    var track    = carousel.querySelector('.carousel-track');
    var slides   = carousel.querySelectorAll('.carousel-slide');
    var dots     = carousel.querySelectorAll('.carousel-dot');
    var prevBtn  = carousel.querySelector('.carousel-btn--prev');
    var nextBtn  = carousel.querySelector('.carousel-btn--next');
    var total    = slides.length;

    if (!track || total === 0) return;

    var current      = 0;
    var autoTimer    = null;
    var touchStartX  = 0;
    // Track which videos are actively playing (not paused by user)
    var videoPlaying = false;

    // --- Caption visibility helper ---
    function setCaptionVisible(slide, visible) {
      var caption = slide.querySelector('.carousel-caption');
      if (!caption) return;
      if (visible) {
        caption.classList.remove('caption-hidden');
      } else {
        caption.classList.add('caption-hidden');
      }
    }

    // --- Autoplay: only start if no video is currently playing ---
    function startAutoplay() {
      stopAutoplay();
      if (videoPlaying) return;          // blocked by active video
      autoTimer = setInterval(function () {
        goTo(current + 1);
      }, AUTOPLAY_DELAY);
    }

    function stopAutoplay() {
      if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    }

    // --- Navigate to slide ---
    function goTo(index) {
      if (index < 0)      index = total - 1;
      if (index >= total) index = 0;

      // Pause & reset state for the slide we're leaving
      var prevSlide = slides[current];
      var prevVideo = prevSlide.querySelector('video');
      if (prevVideo) {
        prevVideo.pause();
        prevVideo.currentTime = 0;
        videoPlaying = false;
        setCaptionVisible(prevSlide, true);
        // Reset pause button icon
        var prevPauseBtn = prevSlide.querySelector('.video-pause-btn i');
        if (prevPauseBtn) {
          prevPauseBtn.classList.replace('fa-play', 'fa-pause');
        }
      }

      current = index;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';

      // Start video on new slide automatically
      var nextSlide = slides[current];
      var nextVideo = nextSlide.querySelector('video');
      if (nextVideo) {
        nextVideo.play().then(function () {
          videoPlaying = true;
          stopAutoplay();               // halt autoplay while video plays
          setCaptionVisible(nextSlide, false); // hide caption during playback
        }).catch(function () {
          videoPlaying = false;
        });
      }

      // Update active dot
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === current);
      });
    }

    // --- Video pause/resume button ---
    carousel.querySelectorAll('.video-pause-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var slide = btn.closest('.carousel-slide');
        var video = slide.querySelector('video');
        if (!video) return;

        var icon  = btn.querySelector('i');

        if (!video.paused) {
          // User pauses the video
          video.pause();
          videoPlaying = false;
          if (icon) { icon.classList.replace('fa-pause', 'fa-play'); }
          setCaptionVisible(slide, true);  // bring caption back
          startAutoplay();                 // resume carousel
        } else {
          // User resumes the video
          video.play().catch(function () {});
          videoPlaying = true;
          if (icon) { icon.classList.replace('fa-play', 'fa-pause'); }
          setCaptionVisible(slide, false); // hide caption again
          stopAutoplay();                  // block carousel again
        }
      });
    });

    // --- Sound toggle ---
    carousel.querySelectorAll('.sound-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var video = btn.closest('.carousel-slide').querySelector('video');
        if (!video) return;
        video.muted = !video.muted;
        var icon = btn.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-volume-xmark', video.muted);
          icon.classList.toggle('fa-volume-high',  !video.muted);
        }
      });
    });

    // --- Button clicks ---
    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); startAutoplay(); });

    // --- Dot clicks ---
    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        goTo(parseInt(dot.dataset.index, 10));
        startAutoplay();
      });
    });

    // --- Pause autoplay on hover (only for non-video slides) ---
    carousel.addEventListener('mouseenter', function () {
      if (!videoPlaying) stopAutoplay();
    });
    carousel.addEventListener('mouseleave', function () {
      if (!videoPlaying) startAutoplay();
    });

    // --- Touch / swipe ---
    carousel.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
      if (!videoPlaying) stopAutoplay();
    }, { passive: true });

    carousel.addEventListener('touchend', function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
      if (!videoPlaying) startAutoplay();
    }, { passive: true });

    // --- Mouse drag ---
    var mouseStartX = 0;
    var isDragging  = false;

    carousel.addEventListener('mousedown', function (e) {
      mouseStartX = e.clientX;
      isDragging  = true;
      if (!videoPlaying) stopAutoplay();
    });

    // Prevent browser's native image-drag from interfering
    carousel.addEventListener('dragstart', function (e) { e.preventDefault(); });

    document.addEventListener('mouseup', function (e) {
      if (!isDragging) return;
      isDragging = false;
      var diff = mouseStartX - e.clientX;
      if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
      if (!videoPlaying) startAutoplay();
    });

    // --- Keyboard navigation ---
    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft')  { goTo(current - 1); if (!videoPlaying) startAutoplay(); }
      if (e.key === 'ArrowRight') { goTo(current + 1); if (!videoPlaying) startAutoplay(); }
    });

    // --- Init ---
    goTo(0);
    startAutoplay();
  }

})();

