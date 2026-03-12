// navbar.js — Mobile menu + dropdown toggle logic

(function () {
  const hamburger   = document.getElementById('hamburger');
  const hamburgerIcon = document.getElementById('hamburgerIcon');
  const navLinks    = document.getElementById('navbarLinks');
  const overlay     = document.getElementById('navOverlay');
  const dropdowns   = document.querySelectorAll('.nav-dropdown');

  // --- Active nav link indicator ---
  (function markActiveLink() {
    const path = window.location.pathname;
    // All plain <a> nav links
    document.querySelectorAll('.navbar-links .nav-link').forEach(function (link) {
      const href = link.getAttribute('href');
      if (!href) return;
      // Exact match for '/', prefix match for everything else
      const isActive = href === '/' ? path === '/' : path.startsWith(href);
      if (isActive) link.classList.add('active');
    });
  })();
  // --- Mobile menu open/close ---
  function openMenu() {
    navLinks.classList.add('open');
    overlay.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburgerIcon.classList.replace('fa-bars', 'fa-xmark');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    overlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburgerIcon.classList.replace('fa-xmark', 'fa-bars');
    document.body.style.overflow = '';
    // Close all dropdowns when menu closes
    dropdowns.forEach(d => d.classList.remove('open'));
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.contains('open') ? closeMenu() : openMenu();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // --- Dropdown toggles (desktop: hover via CSS, mobile: click) ---
  dropdowns.forEach(function (dropdown) {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', function (e) {
      // Only intercept clicks on mobile (hamburger menu is visible)
      if (window.innerWidth <= 900) {
        e.preventDefault();
        const isOpen = dropdown.classList.contains('open');
        // Close all others
        dropdowns.forEach(d => d.classList.remove('open'));
        if (!isOpen) dropdown.classList.add('open');
        toggle.setAttribute('aria-expanded', !isOpen);
      }
    });
  });

  // Close dropdowns when clicking outside on desktop
  document.addEventListener('click', function (e) {
    if (window.innerWidth > 900) {
      if (!e.target.closest('.nav-dropdown')) {
        dropdowns.forEach(d => d.classList.remove('open'));
      }
    }
  });

})();
