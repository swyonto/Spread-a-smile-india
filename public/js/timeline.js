(function () {
  'use strict';

  // State
  let currentYear = '';
  let isProgrammaticScroll = false;
  let scrollTimeout = null;

  // DOM Elements
  const nodes = document.querySelectorAll('.timeline-node');
  const sections = document.querySelectorAll('.timeline-year-section');
  const sidebar = document.querySelector('.timeline-sidebar');
  const track = document.getElementById('timelineNodes');

  // Lightbox DOM Elements
  const lightbox = document.getElementById('timelineLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxCloseBackdrop = document.getElementById('lightboxCloseBackdrop');

  /**
   * Activate a timeline year node and center it in the navigation view
   */
  function activateNode(year) {
    if (year === currentYear) return;
    currentYear = year;

    let activeNode = null;
    nodes.forEach((node) => {
      const match = node.getAttribute('data-year') === year;
      node.classList.toggle('is-active', match);
      if (match) activeNode = node;
    });

    sections.forEach((section) => {
      const isActive = section.getAttribute('data-year') === year;
      section.classList.toggle('is-active-section', isActive);
    });

    if (activeNode) {
      if (window.innerWidth > 900) {
        // Desktop: Center vertically in sidebar
        if (sidebar) {
          const sidebarRect = sidebar.getBoundingClientRect();
          const nodeRect = activeNode.getBoundingClientRect();
          const relativeTop = nodeRect.top - sidebarRect.top + sidebar.scrollTop;
          sidebar.scrollTo({
            top: relativeTop - (sidebarRect.height / 2) + (nodeRect.height / 2),
            behavior: 'smooth'
          });
        }
      } else {
        // Mobile: Center horizontally in track
        if (track) {
          const trackRect = track.getBoundingClientRect();
          const nodeRect = activeNode.getBoundingClientRect();
          const relativeLeft = nodeRect.left - trackRect.left + track.scrollLeft;
          track.scrollTo({
            left: relativeLeft - (trackRect.width / 2) + (nodeRect.width / 2),
            behavior: 'smooth'
          });
        }
      }
    }
  }

  /**
   * Handle scroll finish to re-enable scroll-spy
   */
  function markScrollFinished() {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isProgrammaticScroll = false;
    }, 150);
  }

  /**
   * Initialize nodes click handlers for smooth scrolling
   */
  function initYearSelector() {
    nodes.forEach((node) => {
      node.addEventListener('click', () => {
        const year = node.getAttribute('data-year');
        const targetSection = document.getElementById(`year-${year}`);
        
        if (targetSection) {
          isProgrammaticScroll = true;
          activateNode(year);
          
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Monitor window scroll to re-enable observer after smooth scroll ends
          window.addEventListener('scroll', markScrollFinished);
        }
      });
    });
  }

  /**
   * Setup IntersectionObserver for Scroll-Spy
   */
  function initScrollSpy() {
    if ('IntersectionObserver' in window) {
      // Monitor sections passing through the upper-middle of the screen
      const observerOptions = {
        root: null,
        threshold: [0.15, 0.35, 0.55],
        rootMargin: '-20% 0px -55% 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        if (isProgrammaticScroll) return; // Skip updating nodes if we are currently animating click-scroll

        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          const year = visibleEntry.target.getAttribute('data-year');
          activateNode(year);
        }
      }, observerOptions);

      sections.forEach((section) => observer.observe(section));
    }
  }

  /* ── Lightbox Controllers ── */

  function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg || !lightboxCaption) return;
    
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || '';
    
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Lock background scroll
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImg) return;
    
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.removeAttribute('src');
    document.body.style.overflow = ''; // Unlock scroll
  }

  function initLightbox() {
    // Bind click events to all static gallery items
    const galleryItems = document.querySelectorAll('.timeline-gallery-item');
    galleryItems.forEach((item) => {
      item.addEventListener('click', () => {
        const src = item.getAttribute('data-src');
        const caption = item.getAttribute('data-caption');
        openLightbox(src, caption);
      });
    });

    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
    if (lightboxCloseBackdrop) lightboxCloseBackdrop.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox && lightbox.classList.contains('is-open')) {
        closeLightbox();
      }
    });
  }

  /**
   * Lazy load images using IntersectionObserver
   */
  function initLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy-image');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-lazy');
            
            if (src) {
              img.src = src;
              img.onload = () => {
                const card = img.closest('.timeline-gallery-item');
                if (card) {
                  card.classList.add('is-image-loaded');
                }
              };
              img.removeAttribute('data-lazy');
            }
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '0px 0px 200px 0px'
      });
      
      lazyImages.forEach((img) => imageObserver.observe(img));
    } else {
      lazyImages.forEach((img) => {
        const src = img.getAttribute('data-lazy');
        if (src) {
          img.src = src;
          img.removeAttribute('data-lazy');
          const card = img.closest('.timeline-gallery-item');
          if (card) card.classList.add('is-image-loaded');
        }
      });
    }
  }

  /**
   * Appear and disappear reveal animations on scroll
   */
  function initScrollReveal() {
    const cards = document.querySelectorAll('.timeline-gallery-item');
    
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
      }, {
        root: null,
        threshold: 0.05,
        rootMargin: '-5% 0px -10% 0px'
      });
      
      cards.forEach((card) => revealObserver.observe(card));
    } else {
      cards.forEach((card) => card.classList.add('is-visible'));
    }
  }

  // Kickoff
  initYearSelector();
  initScrollSpy();
  initLazyLoading();
  initScrollReveal();
  initLightbox();

})();
