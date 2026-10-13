/* ==========================================================================
   MARIS & CATCH — SHARED UI INTERACTIONS
   Reveal animations, FAQ accordion, filters, pricing toggle, countdown,
   counters and generic tabs. Works on any page.
   ========================================================================== */

window.MARIS = window.MARIS || {};

(function () {
  'use strict';

  /* ---------------- Reveal on scroll ---------------- */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in-view'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- FAQ accordion ---------------- */
  function initFaq() {
    document.querySelectorAll('.faq-item').forEach(function (item) {
      var q = item.querySelector('.faq-q');
      var a = item.querySelector('.faq-a');
      if (!q || !a) return;
      q.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        var group = item.closest('.faq-accordion');
        if (group && !group.dataset.multi) {
          group.querySelectorAll('.faq-item.open').forEach(function (other) {
            if (other !== item) {
              other.classList.remove('open');
              var oa = other.querySelector('.faq-a');
              if (oa) oa.style.maxHeight = null;
              var oq = other.querySelector('.faq-q');
              if (oq) oq.setAttribute('aria-expanded', 'false');
            }
          });
        }
        if (isOpen) {
          item.classList.remove('open');
          a.style.maxHeight = null;
          q.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('open');
          a.style.maxHeight = a.scrollHeight + 'px';
          q.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ---------------- FAQ category filter ---------------- */
  function initFaqFilter() {
    var tabs = document.querySelectorAll('[data-faq-cat]');
    if (!tabs.length) return;
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        var cat = tab.getAttribute('data-faq-cat');
        document.querySelectorAll('.faq-item').forEach(function (item) {
          var show = cat === 'All' || item.getAttribute('data-cat') === cat;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---------------- Pricing billing toggle ---------------- */
  function initPricing() {
    var buttons = document.querySelectorAll('[data-billing]');
    if (!buttons.length) return;
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var mode = btn.getAttribute('data-billing');
        document.querySelectorAll('[data-price-monthly]').forEach(function (el) {
          var val = el.getAttribute(mode === 'annual' ? 'data-price-annual' : 'data-price-monthly');
          if (val !== null) el.textContent = val;
        });
        document.querySelectorAll('[data-period-monthly]').forEach(function (el) {
          var val = el.getAttribute(mode === 'annual' ? 'data-period-annual' : 'data-period-monthly');
          if (val !== null) el.textContent = val;
        });
      });
    });
  }

  /* ---------------- Countdown ---------------- */
  function initCountdown() {
    var el = document.querySelector('[data-countdown]');
    if (!el) return;
    var target = new Date(el.getAttribute('data-countdown')).getTime();
    function tick() {
      var diff = target - Date.now();
      if (diff < 0) diff = 0;
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      function set(sel, val) {
        var node = el.querySelector(sel);
        if (node) node.textContent = String(val).padStart(2, '0');
      }
      set('[data-cd-days]', d);
      set('[data-cd-hours]', h);
      set('[data-cd-mins]', m);
      set('[data-cd-secs]', s);
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------------- Animated counters ---------------- */
  function initCounters() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length) return;
    function animate(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 1400;
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (Math.round(target * eased)).toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    if (!('IntersectionObserver' in window)) { els.forEach(animate); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animate(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- Generic tabs ---------------- */
  function initTabs() {
    document.querySelectorAll('[data-tabs]').forEach(function (group) {
      var buttons = group.querySelectorAll('[data-tab]');
      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          buttons.forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          var target = btn.getAttribute('data-tab');
          document.querySelectorAll('[data-tab-panel]').forEach(function (panel) {
            panel.style.display = panel.getAttribute('data-tab-panel') === target ? '' : 'none';
          });
        });
      });
    });
  }

  function init() {
    initReveal();
    initFaq();
    initFaqFilter();
    initPricing();
    initCountdown();
    initCounters();
    initTabs();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* Expose some helpers for dynamic pages that inject content later */
  window.MARIS.initFaq = initFaq;
  window.MARIS.initReveal = initReveal;
})();
