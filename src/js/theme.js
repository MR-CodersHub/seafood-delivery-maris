/* ==========================================================================
   MARIS & CATCH — THEME & DIRECTION CONTROLLER
   Dark/Light mode with system preference detection + RTL toggle.
   ========================================================================== */

window.MARIS = window.MARIS || {};

(function () {
  'use strict';

  var root = document.documentElement;
  var THEME_KEY = 'maris-theme';
  var DIR_KEY = 'maris-dir';
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function systemTheme() {
    return media && media.matches ? 'dark' : 'light';
  }

  function stored(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  function store(key, val) {
    try { localStorage.setItem(key, val); } catch (e) { /* ignore */ }
  }

  function systemDir() {
    var lang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    return /^(ar|he|fa|ur|ps|sd)/.test(lang) ? 'rtl' : 'ltr';
  }

  /* -------- APPLY -------- */
  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    updateThemeIcon(theme);
  }

  function applyDir(dir) {
    if (dir === 'rtl') {
      root.setAttribute('dir', 'rtl');
    } else {
      root.setAttribute('dir', 'ltr');
    }
    updateRtlIcon(dir);
  }

  function updateThemeIcon(theme) {
    var btn = document.getElementById('themeToggle');
    var dashBtn = document.getElementById('dashThemeToggle');
    var sun = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"></path></svg>';
    var moon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    if (btn) {
      btn.innerHTML = theme === 'dark' ? sun : moon;
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
    if (dashBtn) {
      dashBtn.innerHTML = theme === 'dark' ? sun : moon;
      dashBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  function updateRtlIcon(dir) {
    var btn = document.getElementById('rtlToggle');
    if (!btn) return;
    btn.classList.toggle('is-active', dir === 'rtl');
    btn.setAttribute('title', dir === 'rtl' ? 'Switch to LTR layout' : 'Switch to RTL layout');
  }

  /* -------- INITIAL -------- */
  function currentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }
  function currentDir() {
    return root.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';
  }

  function init() {
    /* Theme: use already-applied attribute (set by head bootstrap) else resolve */
    var theme = root.getAttribute('data-theme') === 'dark' ? 'dark'
      : (stored(THEME_KEY) || systemTheme());
    applyTheme(theme);

    var dir = root.getAttribute('dir') === 'rtl' ? 'rtl'
      : (stored(DIR_KEY) || systemDir());
    applyDir(dir);

    function toggleTheme() {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      store(THEME_KEY, next);
    }

    var themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }

    var dashThemeBtn = document.getElementById('dashThemeToggle');
    if (dashThemeBtn) {
      dashThemeBtn.addEventListener('click', toggleTheme);
    }

    var rtlBtn = document.getElementById('rtlToggle');
    if (rtlBtn) {
      rtlBtn.addEventListener('click', function () {
        var next = currentDir() === 'rtl' ? 'ltr' : 'rtl';
        applyDir(next);
        store(DIR_KEY, next);
      });
    }

    /* Follow system changes only when the user has no explicit preference */
    if (media) {
      var onChange = function () {
        if (!stored(THEME_KEY)) applyTheme(systemTheme());
      };
      if (media.addEventListener) media.addEventListener('change', onChange);
      else if (media.addListener) media.addListener(onChange);
    }
  }

  /* Layout is injected on DOMContentLoaded; toggle buttons appear then. */
  document.addEventListener('maris:layout-ready', function () {
    updateThemeIcon(currentTheme());
    updateRtlIcon(currentDir());
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
