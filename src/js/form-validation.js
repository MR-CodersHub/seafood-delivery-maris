/* ==========================================================================
   MARIS & CATCH — CLIENT-SIDE FORM VALIDATION & SUCCESS MESSAGES
   Handles: contact, newsletter, login, signup and any [data-validate] form.
   ========================================================================== */

window.MARIS = window.MARIS || {};

(function () {
  'use strict';

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var PHONE_RE = /^[+()\d][\d\s().-]{6,}$/;

  function fieldErrorEl(input) {
    if (!input || !input.id) return null;
    return document.querySelector('[data-error-for="' + input.id + '"]');
  }

  function setError(input, message) {
    input.classList.add('invalid');
    input.setAttribute('aria-invalid', 'true');
    var el = fieldErrorEl(input);
    if (el) el.textContent = message;
  }

  function clearError(input) {
    input.classList.remove('invalid');
    input.removeAttribute('aria-invalid');
    var el = fieldErrorEl(input);
    if (el) el.textContent = '';
  }

  function showSuccess(form, message) {
    var box = form.querySelector('.form-success');
    if (!box) {
      box = document.createElement('div');
      box.className = 'form-success';
      form.appendChild(box);
    }
    box.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg><span>' + message + '</span>';
    box.style.display = 'flex';
  }

  function validateField(input) {
    var value = (input.value || '').trim();
    var type = input.getAttribute('data-validate') || input.type;
    var required = input.hasAttribute('required');

    clearError(input);

    if (required && !value) {
      setError(input, 'This field is required.');
      return false;
    }
    if (!value) return true;

    if (input.type === 'email' || type === 'email') {
      if (!EMAIL_RE.test(value)) { setError(input, 'Please enter a valid email address.'); return false; }
    }
    if (type === 'phone') {
      if (!PHONE_RE.test(value)) { setError(input, 'Please enter a valid phone number.'); return false; }
    }
    if (input.id === 'signupPassword' || input.hasAttribute('data-password')) {
      if (value.length < 8) { setError(input, 'Password must be at least 8 characters.'); return false; }
    }
    if (input.hasAttribute('data-min')) {
      var min = parseInt(input.getAttribute('data-min'), 10);
      if (value.length < min) { setError(input, 'Please enter at least ' + min + ' characters.'); return false; }
    }
    return true;
  }

  function validateForm(form) {
    var inputs = form.querySelectorAll('input, textarea, select');
    var ok = true;
    inputs.forEach(function (input) {
      if (input.type === 'hidden' || input.type === 'submit' || input.disabled) return;
      if (!validateField(input)) ok = false;
    });

    /* Confirm password match */
    var pw = form.querySelector('[data-password]');
    var confirm = form.querySelector('[data-confirm]');
    if (pw && confirm) {
      if (confirm.value !== pw.value || !confirm.value) {
        setError(confirm, 'Passwords do not match.');
        ok = false;
      }
    }

    /* Required checkbox groups */
    form.querySelectorAll('input[type="checkbox"][required]').forEach(function (box) {
      if (!box.checked) {
        var el = fieldErrorEl(box);
        if (el) el.textContent = 'Please tick this box to continue.';
        ok = false;
      } else {
        var el2 = fieldErrorEl(box);
        if (el2) el2.textContent = '';
      }
    });

    return ok;
  }

  function passwordStrength(value) {
    var score = 0;
    if (value.length >= 8) score++;
    if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    return score;
  }

  function bindPasswordMeter() {
    document.querySelectorAll('[data-password]').forEach(function (input) {
      var meter = document.querySelector('[data-password-meter] span');
      if (!meter) return;
      input.addEventListener('input', function () {
        var s = passwordStrength(input.value);
        var pct = [0, 25, 50, 75, 100][s];
        meter.style.width = pct + '%';
        meter.style.background = s <= 1 ? '#d9534f' : s === 2 ? '#e5a93b' : '#0d8a57';
      });
    });
  }

  function bindPasswordToggles() {
    document.querySelectorAll('[data-toggle-password]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = document.getElementById(btn.getAttribute('data-toggle-password'));
        if (!target) return;
        var show = target.type === 'password';
        target.type = show ? 'text' : 'password';
        btn.textContent = show ? 'Hide' : 'Show';
      });
    });
  }

  /* ---------------- Specific forms ---------------- */
  function handleContact(form) {
    var subject = form.querySelector('#contactSubject');
    if (subject && !subject.value.trim()) {
      setError(subject, 'Please choose a subject.');
      return false;
    }
    showSuccess(form, 'Thank you! Your message has been received. Our harbor team replies within one business day.');
    if (window.MARIS.toast) window.MARIS.toast('Message sent — we will be in touch shortly.');
    form.reset();
    return true;
  }

  function handleNewsletter(form) {
    var email = form.querySelector('input[type="email"], input[name="email"]');
    var wrap = form.parentElement;
    var msg = wrap ? wrap.querySelector('.newsletter-note') : null;
    showSuccess(form, 'You are on the list! Watch your inbox for the next landing note.');
    if (!msg && wrap) {
      msg = document.createElement('p');
      msg.className = 'newsletter-note';
      msg.style.cssText = 'font-size:.78rem;color:#7ee0b0;margin-top:10px;';
      wrap.appendChild(msg);
    }
    if (msg) msg.textContent = 'Subscribed as ' + (email ? email.value : 'you') + '. Check your inbox to confirm.';
    if (window.MARIS.toast) window.MARIS.toast('Newsletter subscription confirmed.');
    form.reset();
    return true;
  }

  function handleLogin(form) {
    showSuccess(form, 'Welcome back! You are signed in (demo mode — no real authentication). Redirecting to your dashboard…');
    if (window.MARIS.toast) window.MARIS.toast('Signed in successfully.');
    form.reset();
    var base = window.MARIS.basePath || './';
    setTimeout(function () { window.location.href = base + 'public/auth/user/user-dashboard.html'; }, 1600);
    return true;
  }

  function handleSignup(form) {
    showSuccess(form, 'Account created! A confirmation email is on its way (demo mode — no real authentication).');
    if (window.MARIS.toast) window.MARIS.toast('Account created successfully.');
    form.reset();
    var base = window.MARIS.basePath || './';
    setTimeout(function () { window.location.href = base + 'public/auth/login.html'; }, 1700);
    return true;
  }

  function bindForm(id, handler) {
    var form = document.getElementById(id);
    if (!form) return;
    form.setAttribute('novalidate', 'novalidate');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateForm(form)) {
        if (window.MARIS.toast) window.MARIS.toast('Please fix the highlighted fields.', 'error');
        return;
      }
      handler(form);
    });

    form.querySelectorAll('input, textarea, select').forEach(function (input) {
      input.addEventListener('blur', function () { validateField(input); });
      input.addEventListener('input', function () {
        if (input.classList.contains('invalid')) validateField(input);
      });
    });
  }

  function bindGeneric() {
    document.querySelectorAll('form[data-validate-form]').forEach(function (form) {
      form.setAttribute('novalidate', 'novalidate');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!validateForm(form)) {
          if (window.MARIS.toast) window.MARIS.toast('Please fix the highlighted fields.', 'error');
          return;
        }
        showSuccess(form, form.getAttribute('data-success') || 'Submitted successfully. Thank you!');
        if (window.MARIS.toast) window.MARIS.toast('Submitted successfully.');
        form.reset();
      });
      form.querySelectorAll('input, textarea, select').forEach(function (input) {
        input.addEventListener('blur', function () { validateField(input); });
      });
    });
  }

  function init() {
    bindPasswordMeter();
    bindPasswordToggles();
    bindForm('contactForm', handleContact);
    bindForm('newsletterForm', handleNewsletter);
    bindForm('loginForm', handleLogin);
    bindForm('signupForm', handleSignup);
    bindGeneric();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.MARIS.validateField = validateField;
})();
