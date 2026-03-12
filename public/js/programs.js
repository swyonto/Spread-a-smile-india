(function () {
  const overviewCards = Array.from(document.querySelectorAll('[data-scroll-target]'));
  const sections = Array.from(document.querySelectorAll('[data-program-section]'));
  const revealItems = Array.from(document.querySelectorAll('.program-reveal'));
  const videoTriggers = Array.from(document.querySelectorAll('[data-video-trigger]'));
  const modal = document.getElementById('programVideoModal');
  const modalTitle = document.getElementById('programVideoTitle');
  const modalPlayer = document.getElementById('programVideoPlayer');
  const closeTargets = Array.from(document.querySelectorAll('[data-video-close]'));

  function activateOverview(sectionId) {
    overviewCards.forEach((card) => {
      card.classList.toggle('is-active', card.getAttribute('data-scroll-target') === sectionId);
    });
  }

  overviewCards.forEach((card) => {
    card.addEventListener('click', () => {
      const targetId = card.getAttribute('data-scroll-target');
      const target = document.getElementById(targetId);
      if (!target) {
        return;
      }

      activateOverview(targetId);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.14 });

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 4, 3) * 90}ms`;
      revealObserver.observe(item);
    });

    const sectionObserver = new IntersectionObserver((entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visibleEntry) {
        activateOverview(visibleEntry.target.id);
      }
    }, {
      threshold: [0.2, 0.45, 0.7],
      rootMargin: '-18% 0px -45% 0px'
    });

    sections.forEach((section) => sectionObserver.observe(section));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  function closeModal() {
    if (!modal || !modalPlayer) {
      return;
    }

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    modalPlayer.pause();
    modalPlayer.removeAttribute('src');
    modalPlayer.load();
    document.body.classList.remove('program-video-open');
  }

  function openModal(src, title) {
    if (!modal || !modalPlayer || !modalTitle) {
      return;
    }

    modalTitle.textContent = title || 'Program Story';
    modalPlayer.src = src;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('program-video-open');

    const playPromise = modalPlayer.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  }

  videoTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      openModal(trigger.getAttribute('data-video-src'), trigger.getAttribute('data-video-title'));
    });
  });

  closeTargets.forEach((target) => {
    target.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
})();