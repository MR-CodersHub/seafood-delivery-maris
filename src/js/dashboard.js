/* ==========================================================================
   MARIS & CATCH — DASHBOARD CONTROLLER
   Powers both the admin and user dashboards: section switching, animated
   charts, counters and demo actions.
   ========================================================================== */

window.MARIS = window.MARIS || {};

(function () {
  'use strict';

  function initSections() {
    var links = document.querySelectorAll('.dash-nav a[data-dash-target]');
    if (!links.length) return;
    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        links.forEach(function (l) { l.classList.remove('active'); });
        link.classList.add('active');
        var target = link.getAttribute('data-dash-target');
        document.querySelectorAll('.dash-panel').forEach(function (panel) {
          panel.style.display = panel.getAttribute('data-dash-panel') === target ? '' : 'none';
        });
        var title = document.querySelector('.dash-panel[data-dash-panel="' + target + '"] [data-panel-title]');
        if (title) {
          var heading = document.getElementById('dashPageTitle');
          if (heading) heading.textContent = title.getAttribute('data-panel-title');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  function initCharts() {
    document.querySelectorAll('.chart-col .bar[data-value]').forEach(function (bar) {
      var value = parseFloat(bar.getAttribute('data-value')) || 0;
      var max = parseFloat(bar.getAttribute('data-max')) || 100;
      var pct = Math.max(6, Math.min(100, (value / max) * 100));
      bar.style.height = '0%';
      setTimeout(function () { bar.style.height = pct + '%'; }, 120);
      if (!bar.getAttribute('title')) bar.setAttribute('title', value.toLocaleString());
    });
  }

  function initDemoActions() {
    document.querySelectorAll('[data-demo-action]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var msg = btn.getAttribute('data-demo-action') || 'Action completed (demo).';
        if (window.MARIS.toast) window.MARIS.toast(msg);
      });
    });
  }

  function init() {
    initSections();
    initCharts();
    initDemoActions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
