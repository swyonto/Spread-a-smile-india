(function () {
  'use strict';

  /* ── State ── */
  let currentFestival = '';
  let isProgrammaticScroll = false;
  let scrollTimeout = null;

  /* ── DOM ── */
  const nodes    = document.querySelectorAll('.celeb-node');
  const sections = document.querySelectorAll('.celeb-festival-section');
  const sidebar  = document.querySelector('.celeb-sidebar');
  const track    = document.querySelector('.celeb-track-nodes');

  // Lightbox
  const lightbox          = document.getElementById('celebLightbox');
  const lightboxImg       = document.getElementById('celebLightboxImg');
  const lightboxCaption   = document.getElementById('celebLightboxCaption');
  const lightboxCloseBtn  = document.getElementById('celebLightboxClose');
  const lightboxBackdrop  = document.getElementById('celebLightboxBackdrop');

  /* ═══════════════════════════════════════════════════════
     SCROLL-SPY  — Activate sidebar node + highlight section
  ═══════════════════════════════════════════════════════ */
  function activateNode(festivalId) {
    if (festivalId === currentFestival) return;
    currentFestival = festivalId;

    let activeNode = null;
    nodes.forEach((node) => {
      const match = node.getAttribute('data-festival') === festivalId;
      node.classList.toggle('is-active', match);
      if (match) activeNode = node;
    });

    if (activeNode) {
      if (window.innerWidth > 900) {
        // Desktop: center vertically in sticky sidebar
        if (sidebar) {
          const sr = sidebar.getBoundingClientRect();
          const nr = activeNode.getBoundingClientRect();
          const relTop = nr.top - sr.top + sidebar.scrollTop;
          sidebar.scrollTo({
            top: relTop - (sr.height / 2) + (nr.height / 2),
            behavior: 'smooth'
          });
        }
      } else {
        // Mobile: center horizontally in track
        if (track) {
          const tr = track.getBoundingClientRect();
          const nr = activeNode.getBoundingClientRect();
          const relLeft = nr.left - tr.left + track.scrollLeft;
          track.scrollTo({
            left: relLeft - (tr.width / 2) + (nr.width / 2),
            behavior: 'smooth'
          });
        }
      }
    }
  }

  function markScrollFinished() {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => { isProgrammaticScroll = false; }, 150);
  }

  /* ═══════════════════════════════════════════════════════
     NODE CLICK → Smooth scroll to section
  ═══════════════════════════════════════════════════════ */
  function initNodeClicks() {
    nodes.forEach((node) => {
      node.addEventListener('click', () => {
        const id = node.getAttribute('data-festival');
        const target = document.getElementById(id);
        if (target) {
          isProgrammaticScroll = true;
          activateNode(id);
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.addEventListener('scroll', markScrollFinished);
        }
      });
    });
  }

  /* ═══════════════════════════════════════════════════════
     INTERSECTION OBSERVER → Scroll-spy
  ═══════════════════════════════════════════════════════ */
  function initScrollSpy() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      if (isProgrammaticScroll) return;

      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) {
        activateNode(visible.target.id);
      }
    }, {
      root: null,
      threshold: [0.1, 0.3, 0.5],
      rootMargin: '-18% 0px -55% 0px'
    });

    sections.forEach((s) => observer.observe(s));
  }

  /* ═══════════════════════════════════════════════════════
     IMAGE LAZY LOAD + REVEAL ANIMATIONS
  ═══════════════════════════════════════════════════════ */
  function initLazyReveal() {
    const items = document.querySelectorAll('.celeb-photo-item');

    if ('IntersectionObserver' in window) {
      const revealObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
      }, { threshold: 0.05, rootMargin: '-5% 0px -8% 0px' });

      items.forEach((item) => {
        revealObs.observe(item);

        // Handle image load state
        const img = item.querySelector('img');
        if (img) {
          if (img.complete && img.naturalHeight > 0) {
            item.classList.add('is-img-loaded');
          } else {
            img.addEventListener('load', () => item.classList.add('is-img-loaded'));
          }
        }
      });
    } else {
      items.forEach((item) => {
        item.classList.add('is-visible', 'is-img-loaded');
      });
    }
  }

  /* ═══════════════════════════════════════════════════════
     LIGHTBOX
  ═══════════════════════════════════════════════════════ */
  function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption || '';
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    if (lightboxImg) lightboxImg.removeAttribute('src');
    document.body.style.overflow = '';
  }

  function initLightbox() {
    document.querySelectorAll('.celeb-photo-item').forEach((item) => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          const highres = img.getAttribute('data-highres') || img.src;
          openLightbox(highres, img.alt);
        }
      });
    });

    if (lightboxCloseBtn)  lightboxCloseBtn.addEventListener('click', closeLightbox);
    if (lightboxBackdrop)  lightboxBackdrop.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox && lightbox.classList.contains('is-open')) closeLightbox();
    });
  }

  /* ═══════════════════════════════════════════════════════
     KICKOFF
  ═══════════════════════════════════════════════════════ */
  initNodeClicks();
  initScrollSpy();
  initLazyReveal();
  initLightbox();

})();
