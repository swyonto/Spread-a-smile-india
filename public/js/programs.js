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

  // Health Full Screen Details Panel
  const healthPanel = document.getElementById('programHealthPanel');
  const healthPanelHeaderTitle = document.getElementById('healthPanelHeaderTitle');
  const healthPanelGrid = document.getElementById('healthPanelGrid');
  const healthTriggers = Array.from(document.querySelectorAll('[data-health-trigger]'));
  const healthCloseTargets = Array.from(document.querySelectorAll('[data-health-panel-close]'));

  function closeHealthPanel() {
    if (!healthPanel) return;
    healthPanel.classList.remove('is-open');
    healthPanel.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('program-video-open');
  }

  function openHealthPanel(title, subCards) {
    if (!healthPanel || !healthPanelHeaderTitle || !healthPanelGrid) return;
    healthPanelHeaderTitle.textContent = title || 'Health Program Details';
    healthPanelGrid.innerHTML = '';

    subCards.forEach((sub) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'health-sub-card';
      
      let mediaHtml = '';
      if (sub.videoSrc) {
        const thumbnailUrl = sub.image || (sub.videoSrc.split('?')[0] + '/ik-thumbnail.jpg');
        mediaHtml = `
          <img class="health-video-thumbnail" src="${thumbnailUrl}" alt="${sub.title}" loading="lazy" />
          <div class="health-video-controls">
            <button class="health-video-btn health-video-play-btn" type="button" aria-label="Play">
              <i class="fa-solid fa-play"></i>
            </button>
            <button class="health-video-btn health-video-mute-btn" type="button" aria-label="Unmute" style="display: none;">
              <i class="fa-solid fa-volume-xmark"></i>
            </button>
          </div>
        `;
      } else {
        mediaHtml = `<img src="${sub.image}" alt="${sub.title}" loading="lazy" />`;
      }
      
      cardEl.innerHTML = `
        <div class="health-sub-card__media">
          ${mediaHtml}
        </div>
        <div class="health-sub-card__content">
          <h3>${sub.title}</h3>
          <p>${sub.desc}</p>
        </div>
      `;

      if (sub.videoSrc) {
        const mediaContainer = cardEl.querySelector('.health-sub-card__media');
        const thumbnail = cardEl.querySelector('.health-video-thumbnail');
        const playBtn = cardEl.querySelector('.health-video-play-btn');
        const muteBtn = cardEl.querySelector('.health-video-mute-btn');
        let video = null;

        function loadAndPlayVideo() {
          if (!video) {
            video = document.createElement('video');
            video.src = sub.videoSrc;
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            video.setAttribute('autoplay', 'true');
            video.setAttribute('playsinline', 'true');
            
            // Position the video absolutely under controls
            video.style.position = 'absolute';
            video.style.inset = '0';
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'cover';

            // Insert video tag before thumbnail
            mediaContainer.insertBefore(video, mediaContainer.firstChild);
            
            thumbnail.style.transition = 'opacity 0.3s ease';
            video.addEventListener('playing', () => {
              thumbnail.style.opacity = '0';
              setTimeout(() => {
                thumbnail.style.display = 'none';
              }, 300);
            });
            
            muteBtn.style.display = 'grid';
          }

          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.then(() => {
              playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
              playBtn.setAttribute('aria-label', 'Pause');
            }).catch(() => {});
          }
        }

        function pauseVideo() {
          if (video && !video.paused) {
            video.pause();
            playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            playBtn.setAttribute('aria-label', 'Play');
          }
        }

        playBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!video || video.paused) {
            loadAndPlayVideo();
          } else {
            pauseVideo();
          }
        });

        // Trigger load/play on hover
        cardEl.addEventListener('mouseenter', () => {
          loadAndPlayVideo();
        });

        // Pause on mouseleave
        cardEl.addEventListener('mouseleave', () => {
          pauseVideo();
        });

        muteBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (video) {
            video.muted = !video.muted;
            if (video.muted) {
              muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
              muteBtn.setAttribute('aria-label', 'Unmute');
            } else {
              muteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
              muteBtn.setAttribute('aria-label', 'Mute');
            }
          }
        });
      }

      healthPanelGrid.appendChild(cardEl);
    });

    healthPanel.classList.add('is-open');
    healthPanel.setAttribute('aria-hidden', 'false');
    document.body.classList.add('program-video-open');
  }

  healthTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const title = trigger.getAttribute('data-health-title');
      const subCards = JSON.parse(trigger.getAttribute('data-health-subcards') || '[]');
      openHealthPanel(title, subCards);
    });
  });

  healthCloseTargets.forEach((target) => {
    target.addEventListener('click', closeHealthPanel);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
      closeHealthPanel();
    }
  });
})();