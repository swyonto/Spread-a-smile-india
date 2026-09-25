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
      if (!target) return;
      activateOverview(targetId);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
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
      if (visibleEntry) activateOverview(visibleEntry.target.id);
    }, {
      threshold: [0.2, 0.45, 0.7],
      rootMargin: '-18% 0px -45% 0px'
    });

    sections.forEach((section) => sectionObserver.observe(section));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  function closeModal() {
    if (!modal || !modalPlayer) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    modalPlayer.pause();
    modalPlayer.removeAttribute('src');
    modalPlayer.load();
    document.body.classList.remove('program-video-open');
  }

  function getSafeVideoUrl(src) {
    if (!src) return '';
    if (src.includes('ik.imagekit.io') && !src.includes('orig-true')) {
      return src.includes('?') ? `${src}&tr=orig-true` : `${src}?tr=orig-true`;
    }
    return src;
  }

  function openModal(src, title) {
    if (!modal || !modalPlayer || !modalTitle) return;
    modalTitle.textContent = title || 'Program Story';
    const safeSrc = getSafeVideoUrl(src);
    modalPlayer.src = safeSrc;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('program-video-open');
    modalPlayer.load();
    const playPromise = modalPlayer.play();
    if (playPromise && typeof playPromise.catch === 'function') playPromise.catch(() => {});
  }

  videoTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      openModal(trigger.getAttribute('data-video-src'), trigger.getAttribute('data-video-title'));
    });
  });

  closeTargets.forEach((target) => { target.addEventListener('click', closeModal); });

  // Health Full Screen Details Panel
  const healthPanel = document.getElementById('programHealthPanel');
  const healthPanelHeaderTitle = document.getElementById('healthPanelHeaderTitle');
  const healthPanelGrid = document.getElementById('healthPanelGrid');
  const healthTriggers = Array.from(document.querySelectorAll('[data-health-trigger]'));
  const healthCloseTargets = Array.from(document.querySelectorAll('[data-health-panel-close]'));

  // Back button injected once into the panel header
  let backBtn = null;
  function getOrCreateBackBtn() {
    if (backBtn) return backBtn;
    backBtn = document.createElement('button');
    backBtn.type = 'button';
    backBtn.className = 'health-panel-back-btn';
    backBtn.setAttribute('aria-label', 'Back to camps');
    backBtn.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Back';
    backBtn.style.display = 'none';
    const header = document.querySelector('.program-health-panel__header');
    if (header) header.insertBefore(backBtn, header.firstChild);
    return backBtn;
  }

  function closeHealthPanel() {
    if (!healthPanel) return;
    healthPanel.classList.remove('is-open');
    healthPanel.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('program-video-open');
    getOrCreateBackBtn().style.display = 'none';
  }

  function createSubCardElement(sub) {
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
      <div class="health-sub-card__media">${mediaHtml}</div>
      <div class="health-sub-card__content">
        <h3>${sub.title}</h3>
        <p>${sub.desc || ''}</p>
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
          video.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;';
          mediaContainer.insertBefore(video, mediaContainer.firstChild);
          thumbnail.style.transition = 'opacity 0.3s ease';
          video.addEventListener('playing', () => {
            thumbnail.style.opacity = '0';
            setTimeout(() => { thumbnail.style.display = 'none'; }, 300);
          });
          muteBtn.style.display = 'grid';
        }
        const pp = video.play();
        if (pp !== undefined) {
          pp.then(() => {
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
        e.preventDefault(); e.stopPropagation();
        if (!video || video.paused) loadAndPlayVideo(); else pauseVideo();
      });
      cardEl.addEventListener('mouseenter', loadAndPlayVideo);
      cardEl.addEventListener('mouseleave', pauseVideo);
      muteBtn.addEventListener('click', (e) => {
        e.preventDefault(); e.stopPropagation();
        if (video) {
          video.muted = !video.muted;
          muteBtn.innerHTML = video.muted
            ? '<i class="fa-solid fa-volume-xmark"></i>'
            : '<i class="fa-solid fa-volume-high"></i>';
          muteBtn.setAttribute('aria-label', video.muted ? 'Unmute' : 'Mute');
        }
      });
    }

    return cardEl;
  }

  // Level 2: image-only grid (no heading/text on cards)
  function renderSubCards(topicTitle, cards) {
    if (!healthPanelHeaderTitle || !healthPanelGrid) return;
    healthPanelHeaderTitle.textContent = topicTitle;
    healthPanelGrid.innerHTML = '';
    healthPanelGrid.classList.remove('program-health-panel__grid--grouped', 'health-camp-panel-grid');
    healthPanelGrid.classList.add('health-camp-img-grid');

    cards.forEach((sub) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'health-camp-img-card';

      const isVideo = !!sub.videoSrc;

      if (isVideo) {
        const safeSrc = getSafeVideoUrl(sub.videoSrc);
        cardEl.innerHTML = `
          <video src="${safeSrc}#t=0.001" preload="auto" loop muted playsinline webkit-playsinline></video>
          <div class="health-camp-img-play"><i class="fa-solid fa-play"></i></div>
        `;

        const video = cardEl.querySelector('video');
        const playIcon = cardEl.querySelector('.health-camp-img-play');

        if (video) {
          video.addEventListener('loadeddata', () => {
            if (video.currentTime === 0) {
              video.currentTime = 0.1;
            }
          }, { once: true });
        }

        cardEl.addEventListener('mouseenter', () => {
          if (video) {
            video.muted = true;
            const p = video.play();
            if (p) p.catch(() => {});
          }
          if (playIcon) playIcon.style.opacity = '0';
        });

        cardEl.addEventListener('mouseleave', () => {
          if (video) video.pause();
          if (playIcon) playIcon.style.opacity = '1';
        });

        // Click to open full-screen video player modal with sound & controls
        cardEl.addEventListener('click', (e) => {
          e.preventDefault();
          openModal(safeSrc, sub.title || topicTitle);
        });
      } else {
        const thumbSrc = sub.image || '';
        if (thumbSrc) {
          cardEl.innerHTML = `
            <img src="${thumbSrc}" alt="${sub.title || ''}" loading="lazy" />
          `;
        }
      }

      healthPanelGrid.appendChild(cardEl);
    });

    healthPanelGrid.scrollTop = 0;
  }

  // Level 1: vertical camp cards

  function renderCampCards(panelTitle, subCards) {

    if (!healthPanelHeaderTitle || !healthPanelGrid) return;
    healthPanelHeaderTitle.textContent = panelTitle;
    healthPanelGrid.innerHTML = '';
    healthPanelGrid.classList.remove('program-health-panel__grid--grouped', 'health-camp-img-grid');
    healthPanelGrid.classList.add('health-camp-panel-grid');

    subCards.forEach((topic) => {
      const coverImg = topic.coverImage || (topic.cards && topic.cards[0] && topic.cards[0].image) || '';
      const cardEl = document.createElement('article');
      cardEl.className = 'health-camp-panel-card';
      cardEl.innerHTML = `
        <div class="health-camp-panel-card__media">
          <img src="${coverImg}" alt="${topic.topic}" loading="lazy" />
          <div class="health-camp-panel-card__overlay">
            <span class="health-camp-panel-card__view-btn">
              <i class="fa-solid fa-arrow-right"></i> View Details
            </span>
          </div>
        </div>
        <div class="health-camp-panel-card__content">
          <h4 class="health-camp-panel-card__title">${topic.topic}</h4>
          ${topic.desc ? `<p class="health-camp-panel-card__desc">${topic.desc}</p>` : ''}
        </div>
      `;
      cardEl.addEventListener('click', () => {
        getOrCreateBackBtn().style.display = 'inline-flex';
        renderSubCards(topic.topic, topic.cards || []);
      });
      healthPanelGrid.appendChild(cardEl);
    });

    healthPanelGrid.scrollTop = 0;
  }

  function openHealthPanel(title, subCards, mode) {
    if (!healthPanel || !healthPanelHeaderTitle || !healthPanelGrid) return;

    if (mode === 'camp-cards') {
      getOrCreateBackBtn().style.display = 'none';
      renderCampCards(title, subCards);
    } else {
      getOrCreateBackBtn().style.display = 'none';
      healthPanelGrid.classList.remove('health-camp-panel-grid');
      healthPanelHeaderTitle.textContent = title || 'Health Program Details';
      healthPanelGrid.innerHTML = '';
      const isGrouped = Array.isArray(subCards) && subCards.length > 0 && (subCards[0].cards || subCards[0].items);

      if (isGrouped) {
        healthPanelGrid.classList.add('program-health-panel__grid--grouped');
        subCards.forEach((group) => {
          const topicTitle = group.topic || group.title || group.heading || 'Camp Topic';
          const cards = group.cards || group.items || [];
          const sectionEl = document.createElement('div');
          sectionEl.className = 'health-topic-group';
          const headerEl = document.createElement('div');
          headerEl.className = 'health-topic-header';
          headerEl.innerHTML = `<h3 class="health-topic-title">${topicTitle}</h3><div class="health-topic-divider"></div>`;
          sectionEl.appendChild(headerEl);
          const gridEl = document.createElement('div');
          gridEl.className = 'health-topic-subgrid';
          cards.forEach((sub) => { gridEl.appendChild(createSubCardElement(sub)); });
          sectionEl.appendChild(gridEl);
          healthPanelGrid.appendChild(sectionEl);
        });
      } else {
        healthPanelGrid.classList.remove('program-health-panel__grid--grouped');
        (subCards || []).forEach((sub) => { healthPanelGrid.appendChild(createSubCardElement(sub)); });
      }
    }

    healthPanel.classList.add('is-open');
    healthPanel.setAttribute('aria-hidden', 'false');
    document.body.classList.add('program-video-open');
  }

  // Back button: return from sub-cards to camp cards
  getOrCreateBackBtn().addEventListener('click', () => {
    const campTrigger = document.querySelector('[data-health-mode="camp-cards"]');
    if (campTrigger) {
      const title = campTrigger.getAttribute('data-health-title');
      const subCards = JSON.parse(campTrigger.getAttribute('data-health-subcards') || '[]');
      getOrCreateBackBtn().style.display = 'none';
      renderCampCards(title, subCards);
    }
  });

  healthTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const title = trigger.getAttribute('data-health-title');
      const subCards = JSON.parse(trigger.getAttribute('data-health-subcards') || '[]');
      const mode = trigger.getAttribute('data-health-mode') || '';
      openHealthPanel(title, subCards, mode);
    });
  });

  healthCloseTargets.forEach((target) => { target.addEventListener('click', closeHealthPanel); });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { closeModal(); closeHealthPanel(); }
  });
})();
