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

}());
