/* ==========================================================================
   MARIS & CATCH — BLOG ENGINE
   Handles: (1) blog list with live search, category filter & pagination
            (2) blog details rendered dynamically from ?id= query param
   ========================================================================== */

window.MARIS = window.MARIS || {};

(function () {
  'use strict';

  var BASE = window.MARIS.basePath || './';
  var asset = window.MARIS.asset || function (f) { return BASE + 'assets/images/' + f; };
  var PAGE_SIZE = 6;

  function esc(str) {
    return String(str).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function formatDate(iso) {
    var d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function initials(name) {
    return name.split(' ').map(function (w) { return w[0]; }).slice(0, 2).join('').toUpperCase();
  }

  function cardHTML(post) {
    return '' +
      '<article class="blog-card reveal">' +
      '  <a class="blog-card-img" href="' + BASE + 'public/pages/blog-details.html?id=' + post.id + '">' +
      '    <img src="' + asset(post.image) + '" alt="' + esc(post.title) + '" loading="lazy">' +
      '  </a>' +
      '  <div class="blog-card-body">' +
      '    <span class="blog-tag">' + esc(post.category) + '</span>' +
      '    <h3><a href="' + BASE + 'public/pages/blog-details.html?id=' + post.id + '">' + esc(post.title) + '</a></h3>' +
      '    <p>' + esc(post.excerpt) + '</p>' +
      '    <div class="blog-meta" style="margin-bottom:0;">' +
      '      <span>' + formatDate(post.date) + '</span><span>•</span><span>' + post.readTime + '</span>' +
      '    </div>' +
      '    <div class="blog-card-foot">' +
      '      <div class="blog-author-mini">' +
      '        <span class="author-avatar">' + initials(post.author) + '</span>' +
      '        <span>' + esc(post.author) + '</span>' +
      '      </div>' +
      '      <a class="link-arrow" href="' + BASE + 'public/pages/blog-details.html?id=' + post.id + '">Read' +
      '        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>' +
      '      </a>' +
      '    </div>' +
      '  </div>' +
      '</article>';
  }

  /* ---------------- LIST MODE ---------------- */
  function initList() {
    var grid = document.getElementById('blogGrid');
    if (!grid) return;

    var posts = (window.MARIS.blogPosts || []).slice();
    var search = document.getElementById('blogSearch');
    var resultCount = document.getElementById('blogResultsCount');
    var pagination = document.getElementById('blogPagination');
    var catButtons = document.querySelectorAll('[data-blog-cat]');

    var state = { query: '', category: 'All', page: 1 };

    function filtered() {
      var q = state.query.trim().toLowerCase();
      return posts.filter(function (p) {
        var matchCat = state.category === 'All' || p.category === state.category;
        if (!matchCat) return false;
        if (!q) return true;
        var haystack = [p.title, p.excerpt, p.category, p.author, (p.tags || []).join(' ')].join(' ').toLowerCase();
        return haystack.indexOf(q) !== -1;
      });
    }

    function render() {
      var list = filtered();
      var totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
      if (state.page > totalPages) state.page = totalPages;
      var start = (state.page - 1) * PAGE_SIZE;
      var pageItems = list.slice(start, start + PAGE_SIZE);

      if (resultCount) {
        resultCount.textContent = list.length + (list.length === 1 ? ' article' : ' articles') +
          (state.category !== 'All' ? ' in ' + state.category : '') +
          (state.query ? ' matching “' + state.query + '”' : '');
      }

      if (!pageItems.length) {
        grid.innerHTML = '<div class="no-results">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>' +
          '<h3 style="color:var(--navy-deep);margin-bottom:8px;">No articles found</h3>' +
          '<p>Try a different search term or category.</p></div>';
      } else {
        grid.innerHTML = pageItems.map(cardHTML).join('');
        if (window.MARIS.initReveal) window.MARIS.initReveal();
      }

      renderPagination(totalPages);
    }

    function renderPagination(totalPages) {
      if (!pagination) return;
      if (totalPages <= 1) { pagination.innerHTML = ''; return; }
      var html = '<button ' + (state.page === 1 ? 'disabled' : '') + ' data-page="' + (state.page - 1) + '">Prev</button>';
      for (var i = 1; i <= totalPages; i++) {
        html += '<button class="' + (i === state.page ? 'active' : '') + '" data-page="' + i + '">' + i + '</button>';
      }
      html += '<button ' + (state.page === totalPages ? 'disabled' : '') + ' data-page="' + (state.page + 1) + '">Next</button>';
      pagination.innerHTML = html;
      pagination.querySelectorAll('button[data-page]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var p = parseInt(btn.getAttribute('data-page'), 10);
          if (p >= 1 && p <= totalPages) {
            state.page = p;
            render();
            var top = grid.getBoundingClientRect().top + window.scrollY - 140;
            window.scrollTo({ top: top, behavior: 'smooth' });
          }
        });
      });
    }

    if (search) {
      search.addEventListener('input', function () {
        state.query = search.value;
        state.page = 1;
        render();
      });
    }

    catButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        catButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        state.category = btn.getAttribute('data-blog-cat');
        state.page = 1;
        render();
      });
    });

    render();
  }

  /* ---------------- DETAIL MODE ---------------- */
  function blockHTML(block) {
    if (block.type === 'heading') return '<h2>' + esc(block.text) + '</h2>';
    if (block.type === 'quote') return '<blockquote class="article-quote">' + esc(block.text) + '</blockquote>';
    if (block.type === 'list') return '<ul>' + block.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>';
    return '<p>' + esc(block.text) + '</p>';
  }

  function initDetail() {
    var mount = document.getElementById('blogDetailMount');
    if (!mount) return;

    var params = new URLSearchParams(window.location.search);
    var id = params.get('id') || 'choose-fresh-fish';
    var posts = window.MARIS.blogPosts || [];
    var post = posts.filter(function (p) { return p.id === id; })[0] || posts[0];

    document.title = post.title + ' — MARIS & CATCH Journal';

    var related = posts.filter(function (p) { return p.id !== post.id && p.category === post.category; });
    if (related.length < 3) {
      posts.forEach(function (p) {
        if (p.id !== post.id && related.indexOf(p) === -1 && related.length < 3) related.push(p);
      });
    }

    var widgetsHTML = '' +
      '<div class="widget">' +
      '  <h4>Search</h4>' +
      '  <div class="blog-search" style="max-width:100%;">' +
      '    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>' +
      '    <input type="search" id="sidebarSearch" placeholder="Search the journal">' +
      '  </div>' +
      '</div>' +
      '<div class="widget">' +
      '  <h4>Categories</h4>' +
      '  <div class="widget-list">' +
      (window.MARIS.blogCategories || []).filter(function (c) { return c !== 'All'; }).map(function (c) {
        var count = posts.filter(function (p) { return p.category === c; }).length;
        return '<a href="' + BASE + 'public/pages/blog.html">' + c + '<span>' + count + '</span></a>';
      }).join('') +
      '  </div>' +
      '</div>' +
      '<div class="widget">' +
      '  <h4>Related Reading</h4>' +
      related.map(function (p) {
        return '<a class="widget-post" href="' + BASE + 'public/pages/blog-details.html?id=' + p.id + '">' +
          '<img src="' + asset(p.image) + '" alt="' + esc(p.title) + '" loading="lazy">' +
          '<div><h6>' + esc(p.title) + '</h6><span>' + formatDate(p.date) + '</span></div></a>';
      }).join('') +
      '</div>' +
      '<div class="widget" style="background:linear-gradient(150deg,#08243c,#124a72);color:#c2d8e7;">' +
      '  <h4 style="color:#fff;">Fresh Catch Alerts</h4>' +
      '  <p style="font-size:.86rem;line-height:1.6;margin-bottom:16px;">Get a weekly note when your favourite species is landed.</p>' +
      '  <a href="' + BASE + 'public/pages/contact.html" class="btn btn-ocean btn-sm" style="width:100%;">Subscribe</a>' +
      '</div>';

    mount.innerHTML = '' +
      '<nav class="breadcrumb" style="color:var(--text-muted);">' +
      '  <a href="' + BASE + 'index.html" style="color:var(--blue-ocean);">Home</a><span class="sep">/</span>' +
      '  <a href="' + BASE + 'public/pages/blog.html" style="color:var(--blue-ocean);">Journal</a><span class="sep">/</span>' +
      '  <span>' + esc(post.category) + '</span>' +
      '</nav>' +
      '<div class="blog-layout">' +
      '  <article>' +
      '    <div class="blog-meta" style="margin-bottom:16px;">' +
      '      <span class="blog-tag">' + esc(post.category) + '</span>' +
      '      <span>' + formatDate(post.date) + '</span><span>•</span><span>' + post.readTime + '</span>' +
      '    </div>' +
      '    <h1 style="font-size:clamp(2rem,3.4vw,2.9rem);color:var(--navy-deep);line-height:1.15;margin-bottom:20px;">' + esc(post.title) + '</h1>' +
      '    <div class="blog-author-mini" style="margin-bottom:30px;">' +
      '      <span class="author-avatar">' + initials(post.author) + '</span>' +
      '      <div><span style="display:block;font-size:.9rem;">' + esc(post.author) + '</span>' +
      '      <small style="color:var(--text-muted);font-size:.76rem;">' + esc(post.role) + '</small></div>' +
      '    </div>' +
      '    <div class="article-hero"><img src="' + asset(post.image) + '" alt="' + esc(post.title) + '"></div>' +
      '    <div class="article-body">' + post.content.map(blockHTML).join('') + '</div>' +
      '    <div class="article-tags">' + (post.tags || []).map(function (t) { return '<a href="' + BASE + 'public/pages/blog.html">#' + esc(t) + '</a>'; }).join('') + '</div>' +
      '    <div class="dash-card" style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;">' +
      '      <span class="author-avatar" style="width:56px;height:56px;font-size:1rem;">' + initials(post.author) + '</span>' +
      '      <div style="flex:1;min-width:200px;">' +
      '        <h6 style="font-family:var(--font-heading);font-size:1rem;color:var(--navy-deep);">Written by ' + esc(post.author) + '</h6>' +
      '        <p style="font-size:.86rem;color:var(--text-muted);">' + esc(post.role) + ' at MARIS &amp; CATCH.</p>' +
      '      </div>' +
      '      <a href="' + BASE + 'public/pages/blog.html" class="btn btn-secondary btn-sm">More Articles</a>' +
      '    </div>' +
      '  </article>' +
      '  <aside class="blog-sidebar">' + widgetsHTML + '</aside>' +
      '</div>';

    var sidebarSearch = document.getElementById('sidebarSearch');
    if (sidebarSearch) {
      sidebarSearch.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && sidebarSearch.value.trim()) {
          window.location.href = BASE + 'public/pages/blog.html';
        }
      });
    }
  }

  function init() {
    if (!window.MARIS.blogPosts) return;
    initList();
    initDetail();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
