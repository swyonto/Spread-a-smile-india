(function () {
  const grid = document.querySelector('.skills-overview__grid');
  
  // 1. Clone the cards to support seamless horizontal infinite loop
  if (grid) {
    const originalCards = Array.from(grid.children);
    originalCards.forEach((card) => {
      const clone = card.cloneNode(true);
      grid.appendChild(clone);
    });
  }

  // 2. Query all elements (including clones)
  const overviewCards = Array.from(document.querySelectorAll('[data-scroll-target]'));
  const sections = Array.from(document.querySelectorAll('[data-program-section]'));
  const revealItems = Array.from(document.querySelectorAll('.program-reveal'));
  const videoTriggers = Array.from(document.querySelectorAll('[data-video-trigger]'));
  
  const modal = document.getElementById('programVideoModal');
  const modalTitle = document.getElementById('programVideoTitle');
  const modalPlayer = document.getElementById('programVideoPlayer');
  const closeTargets = Array.from(document.querySelectorAll('[data-video-close]'));

  // Auto scroll state variables
  let isHovered = false;
  let isInteracting = false;
  let tempPause = false;
  let tempPauseTimeout = null;
  const autoScrollSpeed = 0.5; // slow, smooth pixel scroll per frame
  let animationId = null;

  function pauseTemporarily() {
    tempPause = true;
    if (tempPauseTimeout) clearTimeout(tempPauseTimeout);
    tempPauseTimeout = setTimeout(() => {
      tempPause = false;
    }, 2500); // pause for 2.5s on interaction
  }

  function activateOverview(sectionId) {
    // Set active class on all matching cards (including clones)
    overviewCards.forEach((card) => {
      const match = card.getAttribute('data-scroll-target') === sectionId;
      card.classList.toggle('is-active', match);
    });

    if (grid) {
      const gridRect = grid.getBoundingClientRect();
      const gridCenter = gridRect.left + gridRect.width / 2;
      
      const matchingCards = overviewCards.filter(card => card.getAttribute('data-scroll-target') === sectionId);
      
      let closestCard = null;
      let minDistance = Infinity;
      
      matchingCards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(cardCenter - gridCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestCard = card;
        }
      });
      
      if (closestCard) {
        const closestCardRect = closestCard.getBoundingClientRect();
        const relativeLeft = closestCardRect.left - gridRect.left + grid.scrollLeft;
        const scrollLeftTarget = relativeLeft - (gridRect.width / 2) + (closestCardRect.width / 2);
        
        pauseTemporarily();
        
        grid.scrollTo({
          left: scrollLeftTarget,
          behavior: 'smooth'
        });
      }
    }
  }

  // Bind click event to all cards (detecting click vs drag)
  overviewCards.forEach((card) => {
    let clickStartX = 0;
    let clickStartY = 0;

    card.addEventListener('mousedown', (e) => {
      clickStartX = e.pageX;
      clickStartY = e.pageY;
    });

    card.addEventListener('click', (e) => {
      // If mouse dragged more than 6px, ignore click (it was a scroll drag)
      const diffX = Math.abs(e.pageX - clickStartX);
      const diffY = Math.abs(e.pageY - clickStartY);
      if (diffX > 6 || diffY > 6) {
        e.preventDefault();
        return;
      }

      const targetId = card.getAttribute('data-scroll-target');
      const target = document.getElementById(targetId);
      if (!target) {
        return;
      }

      pauseTemporarily();
      activateOverview(targetId);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Setup infinite scroll boundary wrapping
  if (grid) {
    grid.addEventListener('scroll', () => {
      const loopWidth = grid.scrollWidth / 2;
      if (loopWidth <= 0) return;
      
      const maxScroll = grid.scrollWidth - grid.clientWidth;
      // Safety: Only wrap if the carousel content overflows the viewport
      if (loopWidth <= grid.clientWidth + 10 || maxScroll <= 0) return;
      
      // Right edge wrap -> jump to first set
      if (grid.scrollLeft >= maxScroll - 5) {
        grid.scrollLeft -= loopWidth;
      }
      // Left edge wrap -> jump to second set
      else if (grid.scrollLeft <= 5) {
        grid.scrollLeft += loopWidth;
      }
    });

    // Auto-scroll interaction & drag-to-scroll tracking
    let isDown = false;
    let dragStartX;
    let scrollLeftState;

    grid.addEventListener('mouseenter', () => isHovered = true);
    grid.addEventListener('mouseleave', () => {
      isHovered = false;
      isDown = false;
      grid.classList.remove('grabbing');
      isInteracting = false;
    });

    grid.addEventListener('touchstart', () => isInteracting = true, { passive: true });
    grid.addEventListener('touchend', () => isInteracting = false);

    grid.addEventListener('mousedown', (e) => {
      isDown = true;
      grid.classList.add('grabbing');
      dragStartX = e.pageX - grid.offsetLeft;
      scrollLeftState = grid.scrollLeft;
      isInteracting = true;
      pauseTemporarily();
    });

    grid.addEventListener('mouseup', () => {
      isDown = false;
      grid.classList.remove('grabbing');
      isInteracting = false;
    });

    grid.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - grid.offsetLeft;
      const walk = (x - dragStartX) * 1.5; // drag speed multiplier
      grid.scrollLeft = scrollLeftState - walk;
      isInteracting = true;
      pauseTemporarily();
    });

    // Auto-scroll loop
    function autoScrollStep() {
      const loopWidth = grid.scrollWidth / 2;
      const canScroll = loopWidth > grid.clientWidth + 10;
      const shouldScroll = !isHovered && !isInteracting && !tempPause && canScroll;

      if (shouldScroll) {
        grid.classList.remove('enable-snap');
        grid.scrollLeft += autoScrollSpeed;
      } else {
        grid.classList.add('enable-snap');
      }
      animationId = requestAnimationFrame(autoScrollStep);
    }
    
    // Start auto scroll
    animationId = requestAnimationFrame(autoScrollStep);
  }

  // Reveal animations & Section observers
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

  // Video Modal handling
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

    modalTitle.textContent = title || 'Skill Moment';
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
