/* ============================================
   impact.js — Animated counters + story slider
   ============================================ */

/* ── 1. ANIMATED STAT COUNTERS ──────────────
   Uses IntersectionObserver so the count-up
   only fires when the stats row scrolls into view.
─────────────────────────────────────────────── */
(function initCounters() {
  const nums = document.querySelectorAll('.stat-num[data-target]');
  if (!nums.length) return;

  function countUp(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1800;            // ms
    const step     = 16;              // ~60fps frame
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(function () {
      current += increment;
      if (current >= target) {
        el.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current).toLocaleString();
      }
    }, step);
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          countUp(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  nums.forEach(function (el) { observer.observe(el); });
})();


/* ── 2. STORY AUTO-SWIPING SLIDER ───────────
   - Auto-advances every 5 s
   - Pauses on hover / focus
   - Prev/next arrows + dot indicators
   - Progress bar fills over the 5 s interval
─────────────────────────────────────────────── */
(function initStorySlider() {
  const wrap     = document.getElementById('storySliderWrap');
  const track    = document.getElementById('storyTrack');
  const prevBtn  = document.getElementById('storyPrev');
  const nextBtn  = document.getElementById('storyNext');
  const progress = document.getElementById('storyProgress');
  const dots     = document.querySelectorAll('.story-dot');

  if (!track) return;

  const slides    = track.querySelectorAll('.story-slide');
  const total     = slides.length;
  const INTERVAL  = 5000;   // ms between auto-advances
  const TICK      = 50;     // ms between progress-bar ticks

  let current  = 0;
  let timer    = null;
  let ticker   = null;
  let elapsed  = 0;
  let paused   = false;

  /* ── go to a specific slide ── */
  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';

    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === current);
    });

    resetProgress();
  }

  /* ── progress bar helpers ── */
  function resetProgress() {
    elapsed = 0;
    if (progress) progress.style.width = '0%';
  }

  function startTicker() {
    clearInterval(ticker);
    ticker = setInterval(function () {
      if (paused) return;
      elapsed += TICK;
      const pct = Math.min((elapsed / INTERVAL) * 100, 100);
      if (progress) progress.style.width = pct + '%';
    }, TICK);
  }

  /* ── auto-advance timer ── */
  function startTimer() {
    clearInterval(timer);
    timer = setInterval(function () {
      if (!paused) goTo(current + 1);
    }, INTERVAL);
  }

  function stopTimer() {
    clearInterval(timer);
    clearInterval(ticker);
  }

  /* ── pause / resume on pointer enter/leave ── */
  if (wrap) {
    wrap.addEventListener('mouseenter', function () { paused = true; });
    wrap.addEventListener('mouseleave', function () {
      paused = false;
      elapsed = 0;
      if (progress) progress.style.width = '0%';
    });
    wrap.addEventListener('focusin',  function () { paused = true; });
    wrap.addEventListener('focusout', function () { paused = false; });
  }

  /* ── arrow buttons ── */
  if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });

  /* ── dot clicks ── */
  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      goTo(parseInt(dot.dataset.index, 10));
    });
  });

  /* ── touch / swipe support ── */
  let touchStartX = 0;
  track.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', function (e) {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) goTo(dx < 0 ? current + 1 : current - 1);
  }, { passive: true });

  /* ── kick off ── */
  goTo(0);
  startTimer();
  startTicker();
})();
