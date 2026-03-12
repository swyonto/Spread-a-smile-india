// about.js — Timeline scroll-reveal using IntersectionObserver

(function () {
  'use strict';

  var items = document.querySelectorAll('.tl-item');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    // Fallback: reveal all immediately
    items.forEach(function (item) { item.classList.add('tl-reveal'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Stagger items that appear in the same batch
        var delay = entry.target.dataset.tlDelay || 0;
        setTimeout(function () {
          entry.target.classList.add('tl-reveal');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  // Assign staggered delay so left/right pairs don't pop at identical time
  items.forEach(function (item, i) {
    item.dataset.tlDelay = (i % 2 === 0) ? 0 : 120;
    observer.observe(item);
  });

}());
