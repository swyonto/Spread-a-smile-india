// dignitaries.js — Scroll reveal for recognition cards

(function () {
  'use strict';

  var cards = document.querySelectorAll('.dg-card');
  if (!cards.length) return;

  if (!('IntersectionObserver' in window)) {
    cards.forEach(function (c) { c.classList.add('dg-revealed'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('dg-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  cards.forEach(function (card) { observer.observe(card); });

  // Lightbox Modal for Dignitaries letters
  var lightbox = document.getElementById('timelineLightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  var lightboxCloseBackdrop = document.getElementById('lightboxCloseBackdrop');

  function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg || !lightboxCaption) return;
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImg) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.removeAttribute('src');
    document.body.style.overflow = '';
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxCloseBackdrop) lightboxCloseBackdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });

  var zoomables = document.querySelectorAll('.dg-letter-frame.zoomable');
  zoomables.forEach(function (el) {
    el.addEventListener('click', function () {
      openLightbox(el.getAttribute('data-lightbox-src'), el.getAttribute('data-lightbox-caption'));
    });
  });

}());
