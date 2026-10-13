/* ==========================================================================
   MARIS & CATCH — SHARED LAYOUT SYSTEM
   Injects ONE shared navbar and ONE shared footer into every public page.
   Pages only need: <div id="site-navbar"></div> ... <div id="site-footer"></div>
   ========================================================================== */

window.MARIS = window.MARIS || {};

(function () {
  'use strict';

  var BASE = window.MARIS.basePath || './';

  function U(p) { return BASE + p; }

  /* ------------------------------------------------------------------
     NAV ICONS
     ------------------------------------------------------------------ */
  var icons = {
    logoFish: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 12c5-7 15-7 20 0-5 7-15 7-20 0zm17 0 3-3v6z"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"></path></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>',
    rtl: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h13M12 5l5 7-5 7M18 5l3 7-3 7"></path></svg>',
    login: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>',
    signup: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>'
  };

  /* ------------------------------------------------------------------
     NAVBAR
     ------------------------------------------------------------------ */
  function navItem(href, label, page) {
    return '<a href="' + href + '" class="nav-link" data-page="' + page + '">' + label + '</a>';
  }

  function buildNavbar() {
    return '' +
      '<header class="site-header" id="siteHeader">' +
      '  <div class="container-wide header-container">' +
      '    <a href="' + U('index.html') + '" class="brand-logo" aria-label="MARIS &amp; CATCH Home">' +
      '      <div class="logo-symbol"><img src="' + U('assets/images/logo.png') + '" alt="MARIS logo"></div>' +
      '      <div class="brand-text"><span class="brand-name">MARIS</span></div>' +
      '    </a>' +

      '    <nav class="nav-menu" aria-label="Main Navigation">' +
      navItem(U('index.html'), 'Home', 'home') +
      '      <div class="nav-dropdown">' +
      '        <button class="nav-link nav-drop-toggle" aria-expanded="false">Pages ' + icons.chevron + '</button>' +
      '        <div class="dropdown-panel">' +
      '          <a href="' + U('index.html') + '">Home — General Landing</a>' +
      '          <a href="' + U('public/pages/home-2.html') + '">Home — Niche Landing</a>' +
      '          <a href="' + U('public/pages/about.html') + '">About Us</a>' +
      '          <a href="' + U('public/pages/pricing.html') + '">Pricing Plans</a>' +
      '          <a href="' + U('public/pages/FAQ.html') + '">FAQs</a>' +
      '          <a href="' + U('public/pages/coming-soon.html') + '">Coming Soon</a>' +
      '        </div>' +
      '      </div>' +
      navItem(U('public/pages/products.html'), 'Products', 'products') +
      navItem(U('public/pages/blog.html'), 'Blog', 'blog') +
      navItem(U('public/pages/pricing.html'), 'Pricing', 'pricing') +
      navItem(U('public/pages/about.html'), 'About', 'about') +
      navItem(U('public/pages/contact.html'), 'Contact', 'contact') +
      '    </nav>' +

      '    <div class="header-actions">' +
      '      <button class="icon-toggle" id="themeToggle" aria-label="Toggle dark mode" title="Toggle theme">' + icons.sun + '</button>' +
      '      <button class="icon-toggle rtl-toggle" id="rtlToggle" aria-label="Toggle right-to-left layout" title="Toggle RTL">' + icons.rtl + '</button>' +
      '      <button class="cart-btn" id="cartBtn" aria-label="Open Shopping Cart">' + icons.cart + '<span class="cart-counter" id="cartCounter">0</span></button>' +

      '      <div class="profile-wrapper" id="profileWrapper">' +
      '        <button class="icon-toggle" id="profileBtn" aria-haspopup="true" aria-expanded="false" aria-label="Account menu">' + icons.user + '</button>' +
      '        <div class="profile-dropdown" id="profileDropdown" role="menu">' +
      '          <div class="profile-dropdown-head">' +
      '            <span class="pdh-title">Welcome to MARIS</span>' +
      '            <span class="pdh-sub">Sign in or explore a dashboard</span>' +
      '          </div>' +
      '          <a href="' + U('public/auth/login.html') + '" role="menuitem">' + icons.login + ' Login</a>' +
      '          <a href="' + U('public/auth/signup.html') + '" role="menuitem">' + icons.signup + ' Sign Up</a>' +
      '          <div class="dropdown-divider"></div>' +
      '          <a href="' + U('public/auth/admin/admin-dashboard.html') + '" role="menuitem">' + icons.shield + ' Admin Dashboard</a>' +
      '          <a href="' + U('public/auth/user/user-dashboard.html') + '" role="menuitem">' + icons.grid + ' User Dashboard</a>' +
      '        </div>' +
      '      </div>' +

      '      <a href="' + U('index.html') + '#catch" class="btn btn-ocean btn-sm header-cta">Shop Catch</a>' +

      '      <button class="mobile-menu-toggle" id="mobileToggle" aria-label="Open navigation menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
      '    </div>' +
      '  </div>' +

      '  <div class="mobile-nav-panel" id="mobileNavPanel">' +
      '    <div class="mobile-nav-inner">' +
      navItem(U('index.html'), 'Home', 'home') +
      navItem(U('public/pages/home-2.html'), 'Home — Niche', 'home-2') +
      navItem(U('public/pages/products.html'), 'Products', 'products') +
      navItem(U('public/pages/blog.html'), 'Blog', 'blog') +
      navItem(U('public/pages/pricing.html'), 'Pricing', 'pricing') +
      navItem(U('public/pages/about.html'), 'About', 'about') +
      navItem(U('public/pages/contact.html'), 'Contact', 'contact') +
      navItem(U('public/pages/FAQ.html'), 'FAQs', 'faq') +
      navItem(U('public/pages/coming-soon.html'), 'Coming Soon', 'coming-soon') +
      '      <div class="mobile-nav-divider"></div>' +
      '      <a href="' + U('public/auth/login.html') + '" class="mobile-nav-cta btn btn-secondary btn-sm">Login</a>' +
      '      <a href="' + U('public/auth/signup.html') + '" class="mobile-nav-cta btn btn-ocean btn-sm">Sign Up</a>' +
      '    </div>' +
      '  </div>' +
      '</header>';
  }

  /* ------------------------------------------------------------------
     FOOTER
     ------------------------------------------------------------------ */
  function buildFooter() {
    return '' +
      '<footer class="site-footer" id="siteFooter">' +
      '  <div class="container">' +
      '    <div class="footer-grid">' +

      '      <div class="footer-brand">' +
      '        <a href="' + U('index.html') + '" class="brand-logo" style="margin-bottom:12px;">' +
      '          <div class="logo-symbol"><img src="' + U('assets/images/logo.png') + '" alt="MARIS logo"></div>' +
      '          <div class="brand-text"><span class="brand-name">MARIS &amp; CATCH</span></div>' +
      '        </a>' +
      '        <p class="footer-about">Delivering daily caught ocean fish, pristine coastal shellfish, and responsibly sourced seafood directly from local markets and verified fishers to home kitchens.</p>' +
      '        <div class="footer-coldchain-badge">' +
      '          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>' +
      '          <span>FDA &amp; HACCP Certified 0°C–2°C Cold Chain</span>' +
      '        </div>' +
      '        <div class="footer-social">' +
      '          <a href="#" aria-label="Instagram" onclick="return false;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1"></circle></svg></a>' +
      '          <a href="#" aria-label="Facebook" onclick="return false;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>' +
      '          <a href="#" aria-label="X" onclick="return false;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4l16 16M20 4L4 20"></path></svg></a>' +
      '        </div>' +
      '      </div>' +

      '      <div class="footer-col">' +
      '        <h5>Shop</h5>' +
      '        <ul class="footer-links">' +
      '          <li><a href="' + U('index.html') + '#catch">Today’s Catch</a></li>' +
      '          <li><a href="' + U('public/pages/products.html') + '">All Products</a></li>' +
      '          <li><a href="' + U('public/pages/products.html') + '#products-grid">Fresh Fish</a></li>' +
      '          <li><a href="' + U('public/pages/products.html') + '#products-grid">Shellfish &amp; Prawns</a></li>' +
      '          <li><a href="' + U('public/pages/products.html') + '#products-grid">Fillets &amp; Steaks</a></li>' +
      '          <li><a href="' + U('public/pages/pricing.html') + '">Pricing Plans</a></li>' +
      '        </ul>' +
      '      </div>' +

      '      <div class="footer-col">' +
      '        <h5>Company</h5>' +
      '        <ul class="footer-links">' +
      '          <li><a href="' + U('public/pages/about.html') + '">About Us</a></li>' +
      '          <li><a href="' + U('public/pages/about.html') + '#team">Our Team</a></li>' +
      '          <li><a href="' + U('public/pages/blog.html') + '">Journal &amp; Recipes</a></li>' +
      '          <li><a href="' + U('public/pages/coming-soon.html') + '">Coming Soon</a></li>' +
      '          <li><a href="' + U('public/pages/contact.html') + '">Careers</a></li>' +
      '        </ul>' +
      '      </div>' +

      '      <div class="footer-col">' +
      '        <h5>Support</h5>' +
      '        <ul class="footer-links">' +
      '          <li><a href="' + U('public/pages/FAQ.html') + '">FAQs</a></li>' +
      '          <li><a href="' + U('public/pages/contact.html') + '">Contact Support</a></li>' +
      '          <li><a href="' + U('public/auth/login.html') + '">Login</a></li>' +
      '          <li><a href="' + U('public/auth/signup.html') + '">Create Account</a></li>' +
      '          <li><a href="' + U('public/auth/user/user-dashboard.html') + '">Track My Order</a></li>' +
      '          <li><a href="' + U('public/pages/404.html') + '">Help Centre</a></li>' +
      '        </ul>' +
      '      </div>' +

      '      <div class="footer-col">' +
      '        <h5>Newsletter</h5>' +
      '        <p class="footer-newsletter-text">Weekly landing notes, seasonal catches, and recipes. No spam.</p>' +
      '        <form class="footer-newsletter" id="newsletterForm" novalidate>' +
      '          <div class="newsletter-field">' +
      '            <input type="email" id="newsletterEmail" name="email" placeholder="you@example.com" aria-label="Email address" required>' +
      '            <button type="submit" class="btn btn-ocean btn-sm">Join</button>' +
      '          </div>' +
      '          <span class="field-error" data-error-for="newsletterEmail"></span>' +
      '        </form>' +
      '        <div class="footer-contact-info" style="margin-top:18px;">' +
      '          <div class="contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg><span>Pier 4, Harbor Basin, Coastal Terminal 2</span></div>' +
      '          <div class="contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg><span>+1 (800) 428-FISH (3474)</span></div>' +
      '          <div class="contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg><span>catch@marisandcatch.com</span></div>' +
      '        </div>' +
      '      </div>' +

      '    </div>' +

      '    <div class="footer-bottom">' +
      '      <div>© <span id="footerYear">2026</span> MARIS &amp; CATCH Purveyors Ltd. All rights reserved.</div>' +
      '      <div class="footer-legal-links">' +
      '        <a href="' + U('public/pages/Privacy-policy.html') + '">Privacy Policy</a>' +
      '        <a href="' + U('public/pages/Terms-of-service.html') + '">Terms of Service</a>' +
      '        <a href="' + U('public/pages/FAQ.html') + '">Refund Guarantee</a>' +
      '        <a href="' + U('public/pages/FAQ.html') + '">Food Safety &amp; Storage</a>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '</footer>';
  }

  /* ------------------------------------------------------------------
     SHARED FLOATING SHELLS (toast, back-to-top)
     ------------------------------------------------------------------ */
  function buildShells() {
    return '' +
      '<div class="toast-notice" id="toastNotice">' +
      '  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>' +
      '  <span id="toastMessage">Done</span>' +
      '</div>' +
      '<button class="back-to-top" id="backToTop" aria-label="Back to top">' +
      '  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>' +
      '</button>';
  }

  /* ------------------------------------------------------------------
     TOAST HELPER (shared across all JS)
     ------------------------------------------------------------------ */
  window.MARIS.toast = function (message, type) {
    var el = document.getElementById('toastNotice');
    var msg = document.getElementById('toastMessage');
    if (!el || !msg) return;
    msg.textContent = message;
    el.classList.remove('toast-success', 'toast-error');
    el.classList.add(type === 'error' ? 'toast-error' : 'toast-success');
    el.classList.add('show');
    clearTimeout(window.MARIS._toastTimer);
    window.MARIS._toastTimer = setTimeout(function () {
      el.classList.remove('show');
    }, 3800);
  };

  /* ------------------------------------------------------------------
     MARK ACTIVE LINK
     ------------------------------------------------------------------ */
  function markActiveNav() {
    var file = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
    var map = {
      'index.html': 'home',
      'home-2.html': 'home-2',
      'products.html': 'products',
      'product-details.html': 'products',
      'blog.html': 'blog',
      'blog-details.html': 'blog',
      'pricing.html': 'pricing',
      'about.html': 'about',
      'contact.html': 'contact',
      'faq.html': 'faq',
      'coming-soon.html': 'coming-soon'
    };
    var page = map[file];
    if (!page) return;
    document.querySelectorAll('.nav-link[data-page="' + page + '"], .mobile-nav-inner .nav-link[data-page="' + page + '"]').forEach(function (link) {
      link.classList.add('active');
    });
  }

  /* ------------------------------------------------------------------
     INJECT
     ------------------------------------------------------------------ */
  function inject() {
    var navMount = document.getElementById('site-navbar');
    var footMount = document.getElementById('site-footer');
    if (navMount) navMount.innerHTML = buildNavbar();
    if (footMount) footMount.innerHTML = buildFooter();
    if (!document.getElementById('maris-shells')) {
      var holder = document.createElement('div');
      holder.id = 'maris-shells';
      holder.innerHTML = buildShells();
      document.body.appendChild(holder);
    }
    var yearEl = document.getElementById('footerYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    markActiveNav();
    document.dispatchEvent(new CustomEvent('maris:layout-ready'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
