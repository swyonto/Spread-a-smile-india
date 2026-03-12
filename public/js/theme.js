// theme.js — Light / Dark theme toggle

(function () {
  const html      = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');
  const icon      = document.getElementById('themeIcon');

  const DARK  = 'dark';
  const LIGHT = 'light';

  // Apply theme and update icon
  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    if (icon) {
      icon.classList.toggle('fa-sun',  theme === LIGHT);
      icon.classList.toggle('fa-moon', theme === DARK);
    }
    localStorage.setItem('theme', theme);
  }

  // Load saved theme or default to light
  const saved = localStorage.getItem('theme');
  applyTheme(saved === DARK ? DARK : LIGHT);

  // Toggle on button click
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      const current = html.getAttribute('data-theme');
      applyTheme(current === DARK ? LIGHT : DARK);
    });
  }
})();

