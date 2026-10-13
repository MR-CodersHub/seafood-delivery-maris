/* ==========================================================================
   MARIS & CATCH — NAVBAR BEHAVIOUR
   Dropdowns, mobile menu, sticky header, cart fallback, back-to-top.
   ========================================================================== */

window.MARIS = window.MARIS || {};

(function () {
  'use strict';

  var initialized = false;

  function closeAllDropdowns(except) {
    document.querySelectorAll('.nav-dropdown.open, .profile-wrapper.open').forEach(function (el) {
      if (el !== except) {
        el.classList.remove('open');
        var btn = el.querySelector('[aria-expanded]');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function init() {
    if (initialized) return;
    var header = document.getElementById('siteHeader');
    var profileBtn = document.getElementById('profileBtn');
    var profileWrapper = document.getElementById('profileWrapper');
    var mobileToggle = document.getElementById('mobileToggle');
    var mobilePanel = document.getElementById('mobileNavPanel');
    var cartBtn = document.getElementById('cartBtn');
    var backToTop = document.getElementById('backToTop');

    if (!profileBtn && !header) return;
    initialized = true;

    /* ---- Profile dropdown ---- */
    if (profileBtn && profileWrapper) {
      profileBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = profileWrapper.classList.toggle('open');
        profileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        closeAllDropdowns(profileWrapper);
      });
    }

    /* ---- Pages dropdown ---- */
    document.querySelectorAll('.nav-drop-toggle').forEach(function (toggle) {
      toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        var parent = toggle.closest('.nav-dropdown');
        var isOpen = parent.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        closeAllDropdowns(parent);
      });
    });

    /* ---- Outside click / Escape ---- */
    document.addEventListener('click', function () { closeAllDropdowns(null); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeAllDropdowns(null);
        if (mobilePanel && mobilePanel.classList.contains('open')) {
          mobilePanel.classList.remove('open');
          document.body.classList.remove('nav-open');
          if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });

    /* ---- Mobile menu ---- */
    if (mobileToggle && mobilePanel) {
      mobileToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = mobilePanel.classList.toggle('open');
        document.body.classList.toggle('nav-open', isOpen);
        mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }

    /* ---- Cart fallback (when no cart drawer is on the page) ---- */
    if (cartBtn && !document.getElementById('cartDrawer')) {
      cartBtn.addEventListener('click', function () {
        if (window.MARIS.toast) {
          window.MARIS.toast('Your catch basket lives on the shop page — opening it now.');
        }
        var base = window.MARIS.basePath || './';
        setTimeout(function () { window.location.href = base + 'index.html#catch'; }, 700);
      });
    }

    /* ---- Sticky header ---- */
    if (header) {
      var onScroll = function () {
        if (window.scrollY > 40) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
        if (backToTop) backToTop.classList.toggle('show', window.scrollY > 500);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    /* ---- Back to top ---- */
    if (backToTop) {
      backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  document.addEventListener('maris:layout-ready', init);
  if (document.readyState !== 'loading') {
    /* In case layout already injected before this script ran */
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
