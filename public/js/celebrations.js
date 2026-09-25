// celebrations.js — Card-based Interactive Festival & Events Gallery
(function () {
  'use strict';

  // State
  let currentFestivalId = null;
  let currentYearFilter = 'all';
  let activeGalleryPhotos = [];
  let currentLightboxIndex = 0;

  // Cache DOM
  const hubView             = document.getElementById('celebHubView');
  const detailView          = document.getElementById('celebDetailView');
  const backToHubBtn        = document.getElementById('celebBackBtn');
  const crumbHub            = document.getElementById('crumbHub');
  const crumbFestivalTitle  = document.getElementById('crumbFestivalTitle');
  const crumbYearWrap       = document.getElementById('crumbYearWrap');
  const crumbYearTitle      = document.getElementById('crumbYearTitle');

  const detailHeader        = document.getElementById('celebDetailHeader');
  const detailEyebrow       = document.getElementById('celebDetailEyebrow');
  const detailTitle         = document.getElementById('celebDetailTitle');
  const detailDesc          = document.getElementById('celebDetailDesc');
  const yearTabsContainer   = document.getElementById('celebYearTabs');
  const drilldownContent    = document.getElementById('celebDrilldownContent');

  // Lightbox DOM
  const lightbox            = document.getElementById('celebLightbox');
  const lightboxImg         = document.getElementById('celebLightboxImg');
  const lightboxCaption     = document.getElementById('celebLightboxCaption');
  const lightboxCounter     = document.getElementById('celebLightboxCounter');
  const lightboxCloseBtn    = document.getElementById('celebLightboxClose');
  const lightboxBackdrop    = document.getElementById('celebLightboxBackdrop');
  const lightboxPrevBtn     = document.getElementById('celebLightboxPrev');
  const lightboxNextBtn     = document.getElementById('celebLightboxNext');

  const festivals = window.CELEBRATIONS_DATA || [];

  function getFestivalById(id) {
    if (!id) return null;
    return festivals.find(f => f.id === id || f.id.replace('fest-', '') === id.replace('fest-', '')) || null;
  }

  function getOptimizedImgUrl(src, tr) {
    if (!src) return '';
    if (!src.includes('ik.imagekit.io')) return src;
    const sep = src.includes('?') ? '&' : '?';
    return `${src}${sep}tr=${tr}`;
  }

  function getSafeVideoUrl(src) {
    if (!src) return '';
    if (src.includes('tr=orig-true')) return src;
    const sep = src.includes('?') ? '&' : '?';
    return `${src}${sep}tr=orig-true`;
  }

  function isVideoUrl(src) {
    return /\.(mp4|webm|mov)(\?.*)?$/i.test(src);
  }

  // ═════════════════════════════════════════════════════════════════
  // LEVEL 1: HUB VIEW
  // ═════════════════════════════════════════════════════════════════
  function showHubView(pushHash = true) {
    currentFestivalId = null;
    currentYearFilter = 'all';

    if (detailView) detailView.style.display = 'none';
    if (hubView) {
      hubView.style.display = 'block';
      hubView.classList.add('celeb-view-fade');
    }

    if (pushHash && window.location.hash) {
      history.pushState(null, '', window.location.pathname);
    }

    const hubSection = document.getElementById('celebrationsHub');
    if (hubSection && window.scrollY > hubSection.offsetTop + 100) {
      hubSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // ═════════════════════════════════════════════════════════════════
  // LEVEL 2: FESTIVAL VIEW (DRILLDOWN)
  // ═════════════════════════════════════════════════════════════════
  function openFestival(festId, yearFilter = 'all', pushHash = true) {
    const festival = getFestivalById(festId);
    if (!festival) return;

    currentFestivalId = festival.id;
    currentYearFilter = yearFilter;

    if (hubView) hubView.style.display = 'none';
    if (detailView) {
      detailView.style.display = 'block';
      detailView.style.setProperty('--accent-color', festival.color || '#f5c842');
      detailView.classList.add('celeb-view-fade');
    }

    // Update Header
    if (detailEyebrow) {
      detailEyebrow.innerHTML = `<i class="${festival.icon || 'fa-solid fa-sparkles'}"></i> ${festival.eyebrow || 'Celebration'}`;
      detailEyebrow.style.color = festival.color || '#f5c842';
    }
    if (detailTitle) detailTitle.textContent = festival.title;
    if (detailDesc) detailDesc.textContent = festival.desc;
    if (crumbFestivalTitle) crumbFestivalTitle.textContent = festival.title;

    // Render Year Tabs
    renderYearTabs(festival);

    // Render Drilldown Content
    renderDrilldownContent(festival, currentYearFilter);

    if (pushHash) {
      const cleanId = festival.id.replace('fest-', '');
      history.pushState(null, '', `#${cleanId}`);
    }

    // Smooth scroll to top of celebrations section
    const hubSection = document.getElementById('celebrationsHub');
    if (hubSection) {
      hubSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function renderYearTabs(festival) {
    if (!yearTabsContainer) return;
    yearTabsContainer.innerHTML = '';

    const totalPhotos = festival.years.reduce((acc, y) => acc + (y.photos ? y.photos.length : 0), 0);

    // "All Editions" tab
    const allTab = document.createElement('button');
    allTab.type = 'button';
    allTab.className = `celeb-year-tab ${currentYearFilter === 'all' ? 'is-active' : ''}`;
    allTab.innerHTML = `All Editions <span class="celeb-tab-count">${totalPhotos}</span>`;
    allTab.addEventListener('click', () => {
      currentYearFilter = 'all';
      updateActiveYearTab();
      renderDrilldownContent(festival, 'all');
    });
    yearTabsContainer.appendChild(allTab);

    // Individual Year tabs
    festival.years.forEach((y) => {
      const tab = document.createElement('button');
      tab.type = 'button';
      tab.className = `celeb-year-tab ${currentYearFilter === y.year ? 'is-active' : ''}`;
      tab.setAttribute('data-year', y.year);
      tab.innerHTML = `${y.year} <span class="celeb-tab-count">${y.photos.length}</span>`;
      tab.addEventListener('click', () => {
        currentYearFilter = y.year;
        updateActiveYearTab();
        renderDrilldownContent(festival, y.year);
      });
      yearTabsContainer.appendChild(tab);
    });
  }

  function updateActiveYearTab() {
    if (!yearTabsContainer) return;
    const tabs = yearTabsContainer.querySelectorAll('.celeb-year-tab');
    tabs.forEach(tab => {
      const year = tab.getAttribute('data-year');
      if (currentYearFilter === 'all') {
        tab.classList.toggle('is-active', !year);
      } else {
        tab.classList.toggle('is-active', year === currentYearFilter);
      }
    });

    if (crumbYearWrap && crumbYearTitle) {
      if (currentYearFilter === 'all') {
        crumbYearWrap.style.display = 'none';
      } else {
        crumbYearWrap.style.display = 'inline-flex';
        crumbYearTitle.textContent = currentYearFilter;
      }
    }
  }

  // ═════════════════════════════════════════════════════════════════
  // RENDER CONTENT (YEAR CARDS vs SPECIFIC YEAR GALLERY)
  // ═════════════════════════════════════════════════════════════════
  function renderDrilldownContent(festival, filter) {
    if (!drilldownContent) return;
    drilldownContent.innerHTML = '';

    if (filter === 'all') {
      // Show Year Cards Grid (The vertical cards requested by user)
      const yearGrid = document.createElement('div');
      yearGrid.className = 'celeb-years-grid';

      festival.years.forEach((y) => {
        const yearCard = document.createElement('article');
        yearCard.className = 'celeb-year-card';
        yearCard.style.setProperty('--accent-color', festival.color || '#f5c842');

        const coverSrc = getOptimizedImgUrl(y.coverImage, 'w-500,h-380,fo-auto,q-80');
        const countText = y.photos.length === 1 ? '1 Photo' : `${y.photos.length} Photos`;

        yearCard.innerHTML = `
          <div class="celeb-year-card__media">
            <img src="${coverSrc}" alt="${y.title}" loading="lazy" />
          </div>
          <div class="celeb-year-card__body">
            <div class="celeb-year-card__info">
              <h4 class="celeb-year-card__title">${y.title}</h4>
              <span class="celeb-year-card__count"><i class="fa-regular fa-images"></i> ${countText}</span>
            </div>
            <button class="celeb-year-card__btn" type="button" aria-label="Explore ${y.title}">
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        `;

        yearCard.addEventListener('click', () => {
          if (y.photos.length === 1) {
            // If only 1 photo, open directly in lightbox
            activeGalleryPhotos = y.photos.map(p => ({
              ...p,
              festivalTitle: festival.title,
              accentColor: festival.color
            }));
            openLightbox(0);
          } else {
            // Switch to that specific year's gallery
            currentYearFilter = y.year;
            updateActiveYearTab();
            renderDrilldownContent(festival, y.year);
          }
        });

        yearGrid.appendChild(yearCard);
      });

      drilldownContent.appendChild(yearGrid);

    } else {
      // Specific Year selected: Show photos gallery for that year
      const yearData = festival.years.find(y => y.year === filter);
      if (!yearData) return;

      activeGalleryPhotos = yearData.photos.map(p => ({
        ...p,
        festivalTitle: festival.title,
        accentColor: festival.color
      }));

      // Year Gallery Header with quick back to years button
      const galleryHeader = document.createElement('div');
      galleryHeader.className = 'celeb-year-gallery-head';
      galleryHeader.innerHTML = `
        <div class="celeb-year-gallery-head__left">
          <button class="celeb-year-back-btn" type="button">
            <i class="fa-solid fa-arrow-left"></i> All ${festival.title.replace('Celebrations', '').trim()} Years
          </button>
          <h3>${yearData.title}</h3>
        </div>
        <span class="celeb-year-gallery-count"><i class="fa-regular fa-image"></i> ${yearData.photos.length} Photos</span>
      `;
      galleryHeader.querySelector('.celeb-year-back-btn').addEventListener('click', () => {
        currentYearFilter = 'all';
        updateActiveYearTab();
        renderDrilldownContent(festival, 'all');
      });

      drilldownContent.appendChild(galleryHeader);

      // Photos Grid
      const photoGrid = document.createElement('div');
      photoGrid.className = 'celeb-photos-grid';

      yearData.photos.forEach((photo, idx) => {
        const item = document.createElement('div');
        item.className = 'celeb-photo-card';

        const thumbSrc = getOptimizedImgUrl(photo.src, 'w-500,h-500,fo-auto,q-80');
        const isVid = isVideoUrl(photo.src);

        if (isVid) {
          const safeVid = getSafeVideoUrl(photo.src);
          item.innerHTML = `
            <video src="${safeVid}#t=0.001" preload="metadata" muted playsinline></video>
            <span class="celeb-photo-card__play"><i class="fa-solid fa-play"></i></span>
            <div class="celeb-photo-card__overlay">
              <span class="celeb-photo-card__year">${photo.year}</span>
              <span class="celeb-photo-card__zoom"><i class="fa-solid fa-play"></i> Play</span>
            </div>
          `;
        } else {
          item.innerHTML = `
            <img src="${thumbSrc}" alt="${photo.alt || yearData.title}" loading="lazy" />
            <div class="celeb-photo-card__overlay">
              <span class="celeb-photo-card__year">${photo.year}</span>
              <span class="celeb-photo-card__zoom"><i class="fa-solid fa-magnifying-glass-plus"></i></span>
            </div>
          `;
        }

        item.addEventListener('click', () => {
          openLightbox(idx);
        });

        photoGrid.appendChild(item);
      });

      drilldownContent.appendChild(photoGrid);
    }
  }

  // ═════════════════════════════════════════════════════════════════
  // LIGHTBOX
  // ═════════════════════════════════════════════════════════════════
  function openLightbox(index) {
    if (!activeGalleryPhotos || activeGalleryPhotos.length === 0) return;
    if (index < 0) index = 0;
    if (index >= activeGalleryPhotos.length) index = activeGalleryPhotos.length - 1;

    currentLightboxIndex = index;
    updateLightboxContent();

    if (lightbox) {
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  }

  function updateLightboxContent() {
    const photo = activeGalleryPhotos[currentLightboxIndex];
    if (!photo) return;

    const highres = photo.highres || photo.src;
    const isVid = isVideoUrl(highres);

    const mediaWrap = document.querySelector('.celeb-lightbox__media-wrap');
    if (mediaWrap) {
      // Remove any previous video element if there was one
      const prevVideo = mediaWrap.querySelector('video');
      if (prevVideo) prevVideo.remove();

      if (isVid) {
        if (lightboxImg) lightboxImg.style.display = 'none';
        const vidEl = document.createElement('video');
        vidEl.src = getSafeVideoUrl(highres);
        vidEl.controls = true;
        vidEl.autoplay = true;
        vidEl.playsInline = true;
        vidEl.style.maxWidth = '100%';
        vidEl.style.maxHeight = '78vh';
        mediaWrap.appendChild(vidEl);
      } else {
        if (lightboxImg) {
          lightboxImg.style.display = 'block';
          lightboxImg.src = getOptimizedImgUrl(highres, 'w-1400,q-85');
          lightboxImg.alt = photo.alt || 'Celebration Photo';
        }
      }
    }

    if (lightboxCaption) {
      const title = photo.festivalTitle ? `${photo.festivalTitle} • ${photo.year}` : (photo.alt || '');
      lightboxCaption.innerHTML = `<strong>${title}</strong>${photo.alt && photo.alt !== title ? ` — <span>${photo.alt}</span>` : ''}`;
    }

    if (lightboxCounter) {
      lightboxCounter.textContent = `Photo ${currentLightboxIndex + 1} of ${activeGalleryPhotos.length}`;
    }

    if (lightboxPrevBtn) {
      lightboxPrevBtn.style.display = activeGalleryPhotos.length > 1 ? 'grid' : 'none';
    }
    if (lightboxNextBtn) {
      lightboxNextBtn.style.display = activeGalleryPhotos.length > 1 ? 'grid' : 'none';
    }
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    if (lightboxImg) lightboxImg.removeAttribute('src');
    const mediaWrap = document.querySelector('.celeb-lightbox__media-wrap');
    if (mediaWrap) {
      const vid = mediaWrap.querySelector('video');
      if (vid) { vid.pause(); vid.remove(); }
    }
    document.body.style.overflow = '';
  }

  function lightboxPrev() {
    if (activeGalleryPhotos.length <= 1) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + activeGalleryPhotos.length) % activeGalleryPhotos.length;
    updateLightboxContent();
  }

  function lightboxNext() {
    if (activeGalleryPhotos.length <= 1) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % activeGalleryPhotos.length;
    updateLightboxContent();
  }

  // ═════════════════════════════════════════════════════════════════
  // EVENT LISTENERS & INITIALIZATION
  // ═════════════════════════════════════════════════════════════════
  function init() {
    // Top-level Festival Cards click
    document.querySelectorAll('.celeb-fest-card').forEach((card) => {
      card.addEventListener('click', () => {
        const festId = card.getAttribute('data-fest-id');
        openFestival(festId, 'all', true);
      });
    });

    // Back to All Celebrations button
    if (backToHubBtn) {
      backToHubBtn.addEventListener('click', () => showHubView(true));
    }
    if (crumbHub) {
      crumbHub.addEventListener('click', () => showHubView(true));
    }

    // Lightbox Controls
    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
    if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', lightboxPrev);
    if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', lightboxNext);

    document.addEventListener('keydown', (e) => {
      if (!lightbox || !lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxPrev();
      if (e.key === 'ArrowRight') lightboxNext();
    });

    // Check URL Hash for deep linking (e.g., #diwali or #fest-diwali)
    const initialHash = window.location.hash.replace('#', '').toLowerCase();
    if (initialHash) {
      const matched = festivals.find(f => 
        f.id.toLowerCase() === initialHash || 
        f.id.replace('fest-', '').toLowerCase() === initialHash
      );
      if (matched) {
        openFestival(matched.id, 'all', false);
      }
    }

    // Popstate support
    window.addEventListener('popstate', () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (!hash) {
        showHubView(false);
      } else {
        const matched = festivals.find(f => 
          f.id.toLowerCase() === hash || 
          f.id.replace('fest-', '').toLowerCase() === hash
        );
        if (matched) {
          openFestival(matched.id, 'all', false);
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
