/* ==========================================================================
   MARIS & CATCH — SERVICES ENGINE
   Handles: (1) services listing grid rendered from shared data
            (2) service details rendered dynamically from ?id= query param
   ========================================================================== */

window.MARIS = window.MARIS || {};

(function () {
  'use strict';

  var BASE = window.MARIS.basePath || './';
  var asset = window.MARIS.asset || function (f) { return BASE + 'assets/images/' + f; };

  var ICONS = {
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>',
    knife: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>',
    box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>',
    shell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 0 0-9 9h18a9 9 0 0 0-9-9z"></path><path d="M12 12v9M8 21h8"></path></svg>',
    fish: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12c5-7 15-7 20 0-5 7-15 7-20 0z"></path><path d="M19 12l3-3v6z"></path><circle cx="7" cy="11" r="1"></circle></svg>',
    platter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"></circle><path d="M12 21v2M9 23h6"></path><circle cx="12" cy="13" r="3"></circle></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 4 13c0-6 8-11 16-11 0 8-5 16-11 16a7 7 0 0 1 0 0z"></path><path d="M4 21c3-3 6-5 10-6"></path></svg>'
  };

  var CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---------------- LIST MODE ---------------- */
  function cardHTML(s) {
    var from = s.pricing && s.pricing.length ? s.pricing[0].price : 'Contact';
    return '' +
      '<article class="service-card reveal" data-id="' + s.id + '">' +
      '  <div class="service-card-img">' +
      '    <img src="' + asset(s.image) + '" alt="' + esc(s.title) + '" loading="lazy">' +
      '    <span class="service-card-tag">' + esc(s.category) + '</span>' +
      '  </div>' +
      '  <div class="service-card-body">' +
      '    <div class="icon-badge" style="width:46px;height:46px;margin-bottom:14px;">' + (ICONS[s.icon] || ICONS.fish) + '</div>' +
      '    <h3>' + esc(s.title) + '</h3>' +
      '    <p>' + esc(s.short) + '</p>' +
      '    <div class="service-card-foot">' +
      '      <span class="price-from">From ' + esc(from) + '</span>' +
      '      <a class="link-arrow" href="' + BASE + 'public/pages/service-details.html?id=' + s.id + '">Details ' + ARROW + '</a>' +
      '    </div>' +
      '  </div>' +
      '</article>';
  }

  function initList() {
    var grid = document.getElementById('servicesGrid');
    if (!grid) return;
    var services = window.MARIS.services || [];
    var filterBar = document.getElementById('servicesFilter');
    var search = document.getElementById('servicesSearch');

    function render(list) {
      if (!list.length) {
        grid.innerHTML = '<div class="no-results"><h3 style="color:var(--navy-deep);margin-bottom:8px;">No services found</h3><p>Try another category or search term.</p></div>';
        return;
      }
      grid.innerHTML = list.map(cardHTML).join('');
      if (window.MARIS.initReveal) window.MARIS.initReveal();
    }

    var activeCat = 'All';
    function apply() {
      var q = (search && search.value || '').trim().toLowerCase();
      var list = services.filter(function (s) {
        var okCat = activeCat === 'All' || s.category === activeCat;
        var hay = (s.title + ' ' + s.short + ' ' + s.category).toLowerCase();
        return okCat && (!q || hay.indexOf(q) !== -1);
      });
      render(list);
    }

    if (search) search.addEventListener('input', apply);

    if (filterBar) {
      var cats = ['All'];
      services.forEach(function (s) { if (cats.indexOf(s.category) === -1) cats.push(s.category); });
      filterBar.innerHTML = cats.map(function (c, i) {
        return '<button class="filter-tab' + (i === 0 ? ' active' : '') + '" data-cat="' + c + '">' + c + '</button>';
      }).join('');
      filterBar.querySelectorAll('[data-cat]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          filterBar.querySelectorAll('[data-cat]').forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          activeCat = btn.getAttribute('data-cat');
          apply();
        });
      });
    }

    render(services);
  }

  /* ---------------- DETAIL MODE ---------------- */
  function renderPricing(tiers) {
    return '' +
      '<div class="pricing-grid">' +
      tiers.map(function (t) {
        return '<div class="price-card' + (t.highlight ? ' highlight' : '') + '">' +
          (t.highlight ? '<span class="price-ribbon">Most Popular</span>' : '') +
          '<div class="price-name">' + esc(t.name) + '</div>' +
          '<div class="price-tagline">' + esc(t.desc) + '</div>' +
          '<div class="price-amount">' + esc(t.price) + '</div>' +
          '<div class="price-period">' + esc(t.period) + '</div>' +
          '<ul class="price-features">' + t.features.map(function (f) { return '<li>' + CHECK + '<span>' + esc(f) + '</span></li>'; }).join('') + '</ul>' +
          '<a href="' + BASE + 'public/auth/signup.html" class="btn ' + (t.highlight ? 'btn-ocean' : 'btn-secondary') + '">Choose ' + esc(t.name) + '</a>' +
          '</div>';
      }).join('') +
      '</div>';
  }

  function initDetail() {
    var mount = document.getElementById('serviceDetailMount');
    if (!mount) return;

    var id = new URLSearchParams(window.location.search).get('id') || 'same-day-fish-delivery';
    var services = window.MARIS.services || [];
    var svc = services.filter(function (s) { return s.id === id; })[0] || services[0];
    document.title = svc.title + ' — MARIS & CATCH Services';

    var others = services.filter(function (s) { return s.id !== svc.id; }).slice(0, 3);

    mount.innerHTML = '' +
      '<nav class="breadcrumb" style="color:var(--text-muted);">' +
      '  <a href="' + BASE + 'index.html" style="color:var(--blue-ocean);">Home</a><span class="sep">/</span>' +
      '  <a href="' + BASE + 'public/pages/products.html" style="color:var(--blue-ocean);">Products</a><span class="sep">/</span>' +
      '  <span>' + esc(svc.category) + '</span>' +
      '</nav>' +

      '<div class="split-media" style="margin-bottom:70px;">' +
      '  <div>' +
      '    <span class="eyebrow">' + esc(svc.category) + ' • MARIS &amp; CATCH</span>' +
      '    <h1 style="font-size:clamp(2rem,3.6vw,3rem);color:var(--navy-deep);line-height:1.12;margin-bottom:16px;">' + esc(svc.title) + '</h1>' +
      '    <p style="font-size:1.15rem;color:var(--text-muted);line-height:1.65;margin-bottom:24px;">' + esc(svc.tagline) + '</p>' +
      '    <p style="color:var(--text-dark);line-height:1.75;margin-bottom:28px;">' + esc(svc.short) + '</p>' +
      '    <div class="flex-wrap">' +
      '      <a href="' + BASE + 'public/auth/signup.html" class="btn btn-ocean">Get Started ' + ARROW + '</a>' +
      '      <a href="' + BASE + 'public/pages/contact.html" class="btn btn-secondary">Ask a Question</a>' +
      '    </div>' +
      '  </div>' +
      '  <div class="media-frame"><img src="' + asset(svc.image) + '" alt="' + esc(svc.title) + '"></div>' +
      '</div>' +

      '<div class="grid grid-2" style="align-items:start;margin-bottom:70px;">' +
      '  <div>' +
      '    <span class="eyebrow">Overview</span>' +
      '    <h2 style="font-size:1.7rem;color:var(--navy-deep);margin-bottom:16px;">' + esc(svc.title) + '</h2>' +
      svc.overview.map(function (p) { return '<p style="color:var(--text-muted);line-height:1.8;margin-bottom:16px;">' + esc(p) + '</p>'; }).join('') +
      '  </div>' +
      '  <div class="dash-card">' +
      '    <h3 style="font-size:1.15rem;color:var(--navy-deep);margin-bottom:18px;">What’s Included</h3>' +
      '    <ul class="check-list">' + svc.includes.map(function (i) { return '<li><span class="check">' + CHECK + '</span><span>' + esc(i) + '</span></li>'; }).join('') + '</ul>' +
      '  </div>' +
      '</div>' +

      '<div class="section-head"><span class="eyebrow">Key Features</span><h2 class="section-title">Built Around Your Kitchen</h2></div>' +
      '<div class="grid grid-4" style="margin-bottom:70px;">' +
      svc.features.map(function (f) {
        return '<div class="feature-card"><div class="icon-badge">' + (ICONS[svc.icon] || ICONS.fish) + '</div><h4>' + esc(f.title) + '</h4><p>' + esc(f.text) + '</p></div>';
      }).join('') +
      '</div>' +

      '<div class="section-head"><span class="eyebrow">How It Works</span><h2 class="section-title">Three Simple Steps</h2></div>' +
      '<div class="grid grid-3" style="margin-bottom:70px;">' +
      svc.process.map(function (p) {
        return '<div class="feature-card text-center"><div class="team-avatar" style="width:64px;height:64px;font-size:1.1rem;margin-bottom:16px;">' + esc(p.step) + '</div><h4>' + esc(p.title) + '</h4><p>' + esc(p.text) + '</p></div>';
      }).join('') +
      '</div>' +

      '<div class="section-head"><span class="eyebrow">Pricing Tiers</span><h2 class="section-title">Transparent Pricing</h2><p class="lead-text">No hidden surcharges. Choose the tier that fits your household.</p></div>' +
      renderPricing(svc.pricing) +

      '<div class="section-head" style="margin-top:80px;"><span class="eyebrow">Questions</span><h2 class="section-title">Frequently Asked</h2></div>' +
      '<div class="faq-accordion">' +
      svc.faqs.map(function (f, i) {
        return '<div class="faq-item' + (i === 0 ? ' open' : '') + '">' +
          '<button class="faq-q" aria-expanded="' + (i === 0) + '"><span>' + esc(f.q) + '</span><span class="faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></span></button>' +
          '<div class="faq-a"' + (i === 0 ? ' style="max-height:400px;"' : '') + '><div class="faq-a-inner">' + esc(f.a) + '</div></div>' +
          '</div>';
      }).join('') +
      '</div>' +

      '<div class="section-head" style="margin-top:90px;"><span class="eyebrow">Keep Exploring</span><h2 class="section-title">Other Services</h2></div>' +
      '<div class="grid grid-3">' + others.map(cardHTML).join('') + '</div>';

    if (window.MARIS.initFaq) window.MARIS.initFaq();
    if (window.MARIS.initReveal) window.MARIS.initReveal();
    document.querySelectorAll('.faq-item.open .faq-a').forEach(function (a) { a.style.maxHeight = a.scrollHeight + 'px'; });
  }

  function init() {
    if (!window.MARIS.services) return;
    initList();
    initDetail();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
