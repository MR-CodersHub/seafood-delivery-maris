/* ==========================================================================
   MARIS & CATCH — PRODUCTS ENGINE
   Handles: (1) products listing grid + search/filter rendered from shared data
            (2) product details rendered dynamically from ?id= query param
            (3) lightweight "catch basket" counter shared via localStorage
   ========================================================================== */

window.MARIS = window.MARIS || {};

(function () {
  'use strict';

  var BASE = window.MARIS.basePath || './';
  var asset = window.MARIS.asset || function (f) { return BASE + 'assets/images/' + f; };

  var CART_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>';
  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
  var CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';

  var FILTERS = [
    { key: 'all', label: 'All Products' },
    { key: 'marine', label: 'Marine Fish' },
    { key: 'fillets', label: 'Fillets & Steaks' },
    { key: 'shellfish', label: 'Shellfish' },
    { key: 'freshwater', label: 'Freshwater' },
    { key: 'platters', label: 'Platters' }
  ];

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function detailUrl(id) { return BASE + 'public/pages/product-details.html?id=' + id; }

  /* ---------------- CATCH BASKET COUNTER ---------------- */
  var CART_KEY = 'maris-catch-count';

  function getCount() {
    try { return parseInt(window.localStorage.getItem(CART_KEY), 10) || 0; } catch (e) { return 0; }
  }

  function paintCounter(n) {
    var el = document.getElementById('cartCounter');
    if (el) el.textContent = n;
  }

  window.MARIS.addToCatch = function (productId, prep) {
    var products = window.MARIS.products || [];
    var prod = products.filter(function (p) { return p.id === productId; })[0];
    if (!prod) return;
    var n = getCount() + 1;
    try { window.localStorage.setItem(CART_KEY, String(n)); } catch (e) {}
    paintCounter(n);
    if (window.MARIS.toast) {
      window.MARIS.toast('Added ' + prod.name + (prep ? ' (' + prep + ')' : '') + ' to your catch basket.');
    }
  };

  /* ---------------- CARD ---------------- */
  function productCard(p) {
    var url = detailUrl(p.id);
    return '' +
      '<article class="product-card reveal" data-id="' + p.id + '">' +
      '  <div class="product-image-box">' +
      '    <a href="' + url + '"><img src="' + asset(p.image) + '" alt="' + esc(p.name) + '" loading="lazy"></a>' +
      '    <div class="card-badges">' +
      '      <span class="status-badge status-fresh">' + esc(p.status) + '</span>' +
      '      <span class="origin-badge">' + esc(p.origin) + '</span>' +
      '    </div>' +
      '  </div>' +
      '  <div class="product-content">' +
      '    <span class="product-category">' + esc(p.categoryLabel) + '</span>' +
      '    <a href="' + url + '" style="text-decoration:none;"><h4 class="product-name">' + esc(p.name) + '</h4></a>' +
      '    <span class="product-latin">' + esc(p.latin) + '</span>' +
      '    <div class="product-meta-row">' +
      '      <div class="product-price">$' + p.price.toFixed(2) + ' <span>' + esc(p.unit) + '</span></div>' +
      '      <div class="avail-indicator"><span class="avail-dot"></span>' + esc(p.stockLabel) + '</div>' +
      '    </div>' +
      '    <div class="card-actions">' +
      '      <button class="btn-add-cart" data-add="' + p.id + '">' + CART_ICON + ' Add to Cart</button>' +
      '      <a class="btn-quick-view" href="' + url + '" title="View product details" aria-label="View product details">' + ARROW + '</a>' +
      '    </div>' +
      '  </div>' +
      '</article>';
  }

  function bindAddButtons(scope) {
    scope.querySelectorAll('[data-add]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        window.MARIS.addToCatch(btn.getAttribute('data-add'), '');
      });
    });
  }

  /* ---------------- LIST MODE ---------------- */
  function initList() {
    var grid = document.getElementById('productsGrid');
    if (!grid) return;
    var products = window.MARIS.products || [];
    var filterBar = document.getElementById('productsFilter');
    var search = document.getElementById('productsSearch');

    function render(list) {
      if (!list.length) {
        grid.innerHTML = '<div class="no-results"><h3 style="color:var(--navy-deep);margin-bottom:8px;">No products found</h3><p>Try another category or search term.</p></div>';
        return;
      }
      grid.innerHTML = list.map(productCard).join('');
      bindAddButtons(grid);
      if (window.MARIS.initReveal) window.MARIS.initReveal();
    }

    var activeCat = 'all';
    function apply() {
      var q = (search && search.value || '').trim().toLowerCase();
      var list = products.filter(function (p) {
        var okCat = activeCat === 'all' || p.category === activeCat;
        var hay = (p.name + ' ' + p.latin + ' ' + p.categoryLabel + ' ' + p.origin).toLowerCase();
        return okCat && (!q || hay.indexOf(q) !== -1);
      });
      render(list);
    }

    if (search) search.addEventListener('input', apply);

    if (filterBar) {
      filterBar.innerHTML = FILTERS.map(function (f, i) {
        return '<button class="filter-tab' + (i === 0 ? ' active' : '') + '" data-cat="' + f.key + '">' + f.label + '</button>';
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

    render(products);
  }

  /* ---------------- DETAIL MODE ---------------- */
  function initDetail() {
    var mount = document.getElementById('productDetailMount');
    if (!mount) return;

    var products = window.MARIS.products || [];
    var id = new URLSearchParams(window.location.search).get('id') || 'prod-salmon';
    var p = products.filter(function (x) { return x.id === id; })[0] || products[0];
    document.title = p.name + ' — MARIS & CATCH Products';

    var others = products.filter(function (x) { return x.id !== p.id; }).slice(0, 4);

    var specCard = function (title, text) {
      return '<div class="feature-card reveal"><h4>' + esc(title) + '</h4><p>' + esc(text) + '</p></div>';
    };

    mount.innerHTML = '' +
      '<nav class="breadcrumb" style="color:var(--text-muted);">' +
      '  <a href="' + BASE + 'index.html" style="color:var(--blue-ocean);">Home</a><span class="sep">/</span>' +
      '  <a href="' + BASE + 'public/pages/products.html" style="color:var(--blue-ocean);">Products</a><span class="sep">/</span>' +
      '  <span>' + esc(p.name) + '</span>' +
      '</nav>' +

      '<div class="split-media" style="margin-bottom:70px;">' +
      '  <div>' +
      '    <span class="eyebrow">' + esc(p.categoryLabel) + '</span>' +
      '    <h1 style="font-size:clamp(2rem,3.6vw,3rem);color:var(--navy-deep);line-height:1.12;margin-bottom:6px;">' + esc(p.name) + '</h1>' +
      '    <p style="font-style:italic;color:var(--text-muted);font-size:0.9rem;margin-bottom:16px;">Scientific name: ' + esc(p.latin) + '</p>' +
      '    <div style="font-family:var(--font-heading);font-size:1.8rem;font-weight:800;color:var(--navy-deep);margin-bottom:18px;">' +
      '      $' + p.price.toFixed(2) + ' <span style="font-size:0.9rem;font-weight:500;color:var(--text-muted);">' + esc(p.unit) + '</span>' +
      '    </div>' +
      '    <p style="color:var(--text-dark);line-height:1.75;margin-bottom:22px;">' + esc(p.description) + '</p>' +
      '    <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:24px;">' +
      '      <span class="status-badge status-fresh">' + esc(p.status) + '</span>' +
      '      <span class="origin-badge" style="position:static;">' + esc(p.origin) + '</span>' +
      '    </div>' +
      '    <div class="prep-select-group">' +
      '      <label class="prep-label" for="detailPrep">Cut &amp; Preparation</label>' +
      '      <select class="prep-select" id="detailPrep">' +
      p.prepOptions.map(function (o) { return '<option value="' + esc(o) + '">' + esc(o) + '</option>'; }).join('') +
      '      </select>' +
      '    </div>' +
      '    <div class="flex-wrap">' +
      '      <button class="btn btn-ocean" id="detailAdd">Add to Catch Basket ' + CART_ICON.replace('<svg', '<svg width="18" height="18"') + '</button>' +
      '      <a href="' + BASE + 'public/pages/contact.html" class="btn btn-secondary">Ask a Question</a>' +
      '    </div>' +
      '  </div>' +
      '  <div class="media-frame"><img src="' + asset(p.image) + '" alt="' + esc(p.name) + '"></div>' +
      '</div>' +

      '<div class="section-head"><span class="eyebrow">The Details</span><h2 class="section-title">Catch Specifications</h2></div>' +
      '<div class="grid grid-4" style="margin-bottom:60px;">' +
      specCard('Origin & Landing', p.origin) +
      specCard('Harvest Method', p.method) +
      specCard('Storage & Handling', p.temp) +
      specCard('Culinary Suggestion', p.cooking) +
      '</div>' +

      '<div class="grid grid-2" style="align-items:start;margin-bottom:70px;">' +
      '  <div class="dash-card">' +
      '    <h3 style="font-size:1.15rem;color:var(--navy-deep);margin-bottom:18px;">Available Preparations</h3>' +
      '    <ul class="check-list">' + p.prepOptions.map(function (o) { return '<li><span class="check">' + CHECK + '</span><span>' + esc(o) + '</span></li>'; }).join('') + '</ul>' +
      '  </div>' +
      '  <div class="dash-card">' +
      '    <h3 style="font-size:1.15rem;color:var(--navy-deep);margin-bottom:18px;">Our Freshness Promise</h3>' +
      '    <ul class="check-list">' +
      '      <li><span class="check">' + CHECK + '</span><span>Delivered on a 0°C–2°C insulated cold chain</span></li>' +
      '      <li><span class="check">' + CHECK + '</span><span>Traceability card with vessel and landing data</span></li>' +
      '      <li><span class="check">' + CHECK + '</span><span>Free delivery on orders over $75</span></li>' +
      '      <li><span class="check">' + CHECK + '</span><span>Replaced or refunded if below standard on arrival</span></li>' +
      '    </ul>' +
      '  </div>' +
      '</div>' +

      '<div class="section-head"><span class="eyebrow">Keep Exploring</span><h2 class="section-title">More from Today’s Catch</h2></div>' +
      '<div class="products-grid">' + others.map(productCard).join('') + '</div>';

    var prep = document.getElementById('detailPrep');
    var addBtn = document.getElementById('detailAdd');
    if (addBtn) {
      addBtn.addEventListener('click', function () {
        window.MARIS.addToCatch(p.id, prep ? prep.value : '');
      });
    }

    bindAddButtons(mount);
    if (window.MARIS.initReveal) window.MARIS.initReveal();
  }

  function init() {
    paintCounter(getCount());
    if (!window.MARIS.products) return;
    initList();
    initDetail();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
