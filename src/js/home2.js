/* ==========================================================================
   MARIS & CATCH — HOME 2 (NICHE) INTERACTIONS
   Interactive box builder for the subscription-focused landing page.
   ========================================================================== */

window.MARIS = window.MARIS || {};

(function () {
  'use strict';

  var PRICES = {
    'solo-weekly': { label: 'Solo Box · Weekly', price: 39 },
    'solo-biweekly': { label: 'Solo Box · Bi-weekly', price: 35 },
    'couple-weekly': { label: 'Couple Box · Weekly', price: 69 },
    'couple-biweekly': { label: 'Couple Box · Bi-weekly', price: 62 },
    'family-weekly': { label: 'Family Feast · Weekly', price: 129 },
    'family-biweekly': { label: 'Family Feast · Bi-weekly', price: 116 }
  };

  function initBuilder() {
    var builder = document.getElementById('boxBuilder');
    if (!builder) return;

    var size = builder.querySelector('[data-size].active') || builder.querySelector('[data-size]');
    var freq = builder.querySelector('[data-freq].active') || builder.querySelector('[data-freq]');
    var valueEl = document.getElementById('builderValue');
    var labelEl = document.getElementById('builderLabel');
    var perEl = document.getElementById('builderPer');

    function update() {
      var s = (size && size.getAttribute('data-size')) || 'solo';
      var f = (freq && freq.getAttribute('data-freq')) || 'weekly';
      var key = s + '-' + f;
      var data = PRICES[key] || PRICES['solo-weekly'];
      if (valueEl) valueEl.textContent = '$' + data.price;
      if (labelEl) labelEl.textContent = data.label;
      if (perEl) perEl.textContent = f === 'weekly' ? '/ box, every week' : '/ box, every 2 weeks';
    }

    builder.querySelectorAll('[data-size]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        builder.querySelectorAll('[data-size]').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        size = btn;
        update();
      });
    });

    builder.querySelectorAll('[data-freq]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        builder.querySelectorAll('[data-freq]').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        freq = btn;
        update();
      });
    });

    update();
  }

  function init() {
    initBuilder();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
