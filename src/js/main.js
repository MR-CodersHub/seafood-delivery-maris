/**
 * MARIS & CATCH - PREMIUM FRESH SEAFOOD PURVEYORS
 * Interactive UI Engine & State Management
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Product Inventory State ---
  const products = [
    {
      id: 'prod-salmon',
      name: 'Atlantic Salmon Cutlets',
      latin: 'Salmo salar',
      category: 'fillets',
      categoryLabel: 'Marine Fish • Cutlet',
      price: 28.50,
      unit: '/ kg',
      status: 'Available Today',
      stockLabel: '14 kg landed today',
      statusType: 'fresh',
      origin: 'Norwegian Fjords (Verified)',
      image: 'assets/images/salmon_portion.jpg',
      prepOptions: ['Thick Steaks (Bone-in)', 'Skin-on Fillet', 'Skinless Portions'],
      description: 'Superior grade Atlantic salmon harvested from cold Norwegian fjords. High in natural omega-3 oils with pristine coral flesh and delicate fat marbling.',
      cooking: 'Pan-sear skin side down for 4 mins, baste with herb butter, or bake at 180°C.',
      temp: 'Store at 0°C to 2°C on crushed ice. Consume within 48 hours of delivery.',
      method: 'Sustainably farmed, cold sea pens, harvested at peak vitality.'
    },
    {
      id: 'prod-seabass',
      name: 'Wild Mediterranean Seabass',
      latin: 'Dicentrarchus labrax',
      category: 'marine',
      categoryLabel: 'Marine Fish • Whole',
      price: 32.00,
      unit: '/ kg',
      status: 'Available Today',
      stockLabel: '8 fish remaining',
      statusType: 'fresh',
      origin: 'Aegean Sea • Hook & Line',
      image: 'assets/images/seabass.jpg',
      prepOptions: ['Whole (Descaled & Gutted)', 'Butterflied Whole', 'Cleaned Fillets (2 pcs)'],
      description: 'Prized Mediterranean Branzino with firm, snow-white flakes and sweet delicate flavor. Landed by small-scale artisanal day-boats.',
      cooking: 'Roast whole with sea salt, lemon wheels, and fresh rosemary over olive oil.',
      temp: 'Keep refrigerated at 0°C to 2°C. Delivered in insulated seaweed wrap.',
      method: 'Artisanal day-boat handline catch, landed 04:30 AM.'
    },
    {
      id: 'prod-prawns',
      name: 'Jumbo Black Tiger Prawns',
      latin: 'Penaeus monodon',
      category: 'shellfish',
      categoryLabel: 'Shellfish & Crustaceans',
      price: 36.00,
      unit: '/ 800g Box',
      status: 'Available Today',
      stockLabel: 'Fresh Daily Batch',
      statusType: 'fresh',
      origin: 'Coastal Estuaries',
      image: 'assets/images/tiger_prawns.jpg',
      prepOptions: ['Whole Head-on (Raw)', 'Peeled & Deveined (Tail-on)', 'Split for Grill'],
      description: 'Colossal wild tiger prawns with distinctive dark tiger striping. Crisp snap upon bite with succulent ocean sweetness.',
      cooking: 'Char on open grill with garlic butter and smoked paprika for 3 minutes per side.',
      temp: 'Packed on dry ice crystals. Keep at -1°C to 2°C.',
      method: 'Responsible mangrove-friendly coastal aquaculture, zero chemicals.'
    },
    {
      id: 'prod-sardines',
      name: 'Silver Wild Sardines',
      latin: 'Sardina pilchardus',
      category: 'marine',
      categoryLabel: 'Marine Pelagic Fish',
      price: 16.50,
      unit: '/ kg',
      status: 'Available Today',
      stockLabel: 'Limited Catch',
      statusType: 'fresh',
      origin: 'Atlantic Coastal Waters',
      image: 'assets/images/sardines.jpg',
      prepOptions: ['Whole on Crushed Ice', 'Cleaned & Scaled', 'Butterflied (Head off)'],
      description: 'Lustrous silver sardines brimming with robust oceanic savor. Hand-selected for uniform size and glistening skin integrity.',
      cooking: 'Grill whole over lump charcoal with coarse sea salt and charred lemon juice.',
      temp: 'Consume within 24–36 hours for peak freshness. Keep chilled on ice.',
      method: 'Artisanal purse-seine coastal catch with minimal bycatch impact.'
    }
  ];

  // --- 2. Cart State & Persistent Storage ---
  let cart = [
    {
      id: 'prod-salmon',
      name: 'Atlantic Salmon Cutlets',
      prep: 'Thick Steaks (Bone-in)',
      price: 28.50,
      qty: 1,
      image: 'assets/images/salmon_portion.jpg'
    },
    {
      id: 'prod-prawns',
      name: 'Jumbo Black Tiger Prawns',
      prep: 'Peeled & Deveined (Tail-on)',
      price: 36.00,
      qty: 1,
      image: 'assets/images/tiger_prawns.jpg'
    }
  ];

  const FREE_SHIPPING_THRESHOLD = 75.00;

  // --- 3. DOM Elements ---
  const header = document.querySelector('.site-header');
  const cartDrawer = document.getElementById('cartDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const cartBtn = document.getElementById('cartBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartCounter = document.getElementById('cartCounter');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartTotalEl = document.getElementById('cartTotal');
  const meterBar = document.getElementById('meterBar');
  const meterText = document.getElementById('meterText');
  
  const quickViewModal = document.getElementById('quickViewModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalContentBox = document.getElementById('modalContentBox');

  const postalModal = document.getElementById('postalModal');
  const postalBtn = document.getElementById('postalBtn');
  const postalClose = document.getElementById('postalClose');
  const checkPostcodeForm = document.getElementById('checkPostcodeForm');
  const postalResult = document.getElementById('postalResult');

  const toastNotice = document.getElementById('toastNotice');
  const toastMessage = document.getElementById('toastMessage');

  // --- 4. Render Products Grid ---
  const productsGrid = document.getElementById('productsGrid');
  const filterTabs = document.querySelectorAll('.filter-tab');

  function renderProducts(filter = 'all') {
    if (!productsGrid) return;
    
    const filtered = filter === 'all' 
      ? products 
      : products.filter(p => p.category === filter);

    productsGrid.innerHTML = filtered.map(prod => `
      <div class="product-card" data-id="${prod.id}">
        <div class="product-image-box">
          <img src="${prod.image}" alt="${prod.name}" loading="lazy">
          <div class="card-badges">
            <span class="status-badge status-fresh">${prod.status}</span>
            <span class="origin-badge">${prod.origin}</span>
          </div>
        </div>
        <div class="product-content">
          <span class="product-category">${prod.categoryLabel}</span>
          <h4 class="product-name">${prod.name}</h4>
          <span class="product-latin">${prod.latin}</span>
          
          <div class="product-meta-row">
            <div class="product-price">$${prod.price.toFixed(2)} <span>${prod.unit}</span></div>
            <div class="avail-indicator">
              <span class="avail-dot"></span>
              ${prod.stockLabel}
            </div>
          </div>

          <div class="prep-select-group">
            <label class="prep-label">Cut & Preparation</label>
            <select class="prep-select" id="prep-${prod.id}">
              ${prod.prepOptions.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
            </select>
          </div>

          <div class="card-actions">
            <button class="btn-add-cart" onclick="addToCart('${prod.id}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              Add to Cart
            </button>
            <button class="btn-quick-view" onclick="openQuickView('${prod.id}')" title="Product Specs & Sourcing">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Filter Tabs Event
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderProducts(tab.dataset.filter);
    });
  });

  // --- 5. Cart Operations ---
  window.addToCart = function(productId) {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    const prepSelect = document.getElementById(`prep-${productId}`);
    const selectedPrep = prepSelect ? prepSelect.value : prod.prepOptions[0];

    const existingIndex = cart.findIndex(item => item.id === productId && item.prep === selectedPrep);

    if (existingIndex > -1) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({
        id: prod.id,
        name: prod.name,
        prep: selectedPrep,
        price: prod.price,
        qty: 1,
        image: prod.image
      });
    }

    updateCartUI();
    showToast(`Added ${prod.name} (${selectedPrep}) to your catch cart.`);
    openCart();
  };

  window.changeQty = function(index, delta) {
    if (!cart[index]) return;
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
    updateCartUI();
  };

  window.removeFromCart = function(index) {
    if (!cart[index]) return;
    const item = cart[index];
    cart.splice(index, 1);
    updateCartUI();
    showToast(`Removed ${item.name} from cart.`);
  };

  function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    if (cartCounter) cartCounter.textContent = totalCount;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 8.50;
    const total = subtotal + shipping;

    if (cartSubtotalEl) cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (cartTotalEl) cartTotalEl.textContent = `$${total.toFixed(2)}`;

    // Update free shipping meter
    if (meterBar && meterText) {
      if (subtotal >= FREE_SHIPPING_THRESHOLD) {
        meterBar.style.width = '100%';
        meterBar.style.backgroundColor = '#0d8a57';
        meterText.innerHTML = '🎉 You qualified for <strong>FREE Refrigerated Delivery!</strong>';
      } else {
        const remaining = (FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2);
        const percent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
        meterBar.style.width = `${percent}%`;
        meterBar.style.backgroundColor = 'var(--blue-ocean)';
        meterText.innerHTML = `Add <strong>$${remaining}</strong> more for <strong>FREE Refrigerated Delivery</strong>`;
      }
    }

    // Render items
    if (cartItemsList) {
      if (cart.length === 0) {
        cartItemsList.innerHTML = `
          <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin: 0 auto 16px auto; opacity: 0.5;">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <p style="font-weight: 600; color: var(--navy-deep); margin-bottom: 6px;">Your catch basket is empty</p>
            <p style="font-size: 0.85rem;">Discover daily caught wild fish and local seafood ready for your kitchen.</p>
          </div>
        `;
      } else {
        cartItemsList.innerHTML = cart.map((item, idx) => `
          <div class="cart-item-row">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
              <h5>${item.name}</h5>
              <div class="cart-item-prep">${item.prep}</div>
              <div class="cart-item-qty">
                <button class="qty-btn" onclick="changeQty(${idx}, -1)">-</button>
                <span class="qty-val">${item.qty}</span>
                <button class="qty-btn" onclick="changeQty(${idx}, 1)">+</button>
              </div>
            </div>
            <div>
              <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
              <span class="cart-item-remove" onclick="removeFromCart(${idx})">Remove</span>
            </div>
          </div>
        `).join('');
      }
    }
  }

  function openCart() {
    if (cartDrawer && drawerOverlay) {
      cartDrawer.classList.add('active');
      drawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCart() {
    if (cartDrawer && drawerOverlay) {
      cartDrawer.classList.remove('active');
      drawerOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Keyboard Escape Handler
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeModal();
    }
  });

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (drawerOverlay) drawerOverlay.addEventListener('click', () => {
    closeCart();
    closeModal();
  });

  // --- 6. Quick View Modal ---
  window.openQuickView = function(productId) {
    const prod = products.find(p => p.id === productId);
    if (!prod || !quickViewModal || !modalContentBox) return;

    modalContentBox.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 28px; align-items: start;">
        <div>
          <img src="${prod.image}" alt="${prod.name}" style="width: 100%; height: 260px; object-fit: cover; border-radius: var(--radius-md); box-shadow: var(--shadow-sm);">
          <div style="margin-top: 16px; padding: 12px; background: var(--blue-ice); border-radius: var(--radius-sm); font-size: 0.78rem; border: 1px solid var(--border-ice);">
            <div style="font-weight: 700; color: var(--navy-deep); margin-bottom: 4px;">🌡️ Storage Guidance</div>
            <div style="color: var(--text-dark);">${prod.temp}</div>
          </div>
        </div>
        <div>
          <div class="eyebrow" style="margin-bottom: 4px;">${prod.categoryLabel}</div>
          <h3 style="font-family: var(--font-heading); font-size: 1.6rem; color: var(--navy-deep); line-height: 1.2; margin-bottom: 4px;">${prod.name}</h3>
          <p style="font-style: italic; color: var(--text-muted); font-size: 0.85rem; margin-bottom: 14px;">Scientific name: ${prod.latin}</p>
          
          <div style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: var(--navy-deep); margin-bottom: 16px;">
            $${prod.price.toFixed(2)} <span style="font-size: 0.85rem; font-weight: 500; color: var(--text-muted);">${prod.unit}</span>
          </div>

          <p style="font-size: 0.92rem; color: var(--text-dark); line-height: 1.6; margin-bottom: 18px;">${prod.description}</p>
          
          <div style="margin-bottom: 16px; font-size: 0.85rem;">
            <div style="font-weight: 700; color: var(--navy-deep); margin-bottom: 4px;">📍 Sourcing & Harvest Protocol:</div>
            <div style="color: var(--text-muted);">${prod.origin} • ${prod.method}</div>
          </div>

          <div style="margin-bottom: 22px; font-size: 0.85rem;">
            <div style="font-weight: 700; color: var(--navy-deep); margin-bottom: 4px;">👨‍🍳 Culinary Preparation Suggestion:</div>
            <div style="color: var(--text-muted);">${prod.cooking}</div>
          </div>

          <button class="btn btn-ocean" style="width: 100%;" onclick="addToCart('${prod.id}'); closeModal();">
            Add to Catch Basket
          </button>
        </div>
      </div>
    `;

    quickViewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function() {
    if (quickViewModal) quickViewModal.classList.remove('active');
    if (postalModal) postalModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  // --- 7. Postal Code Modal ---
  if (postalBtn && postalModal) {
    postalBtn.addEventListener('click', () => {
      postalModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (postalClose) postalClose.addEventListener('click', closeModal);

  if (checkPostcodeForm) {
    checkPostcodeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('postcodeInput').value.trim();
      if (!input) return;

      postalResult.innerHTML = `
        <div style="padding: 16px; background-color: #e9f8f0; border: 1px solid rgba(13, 138, 87, 0.3); border-radius: var(--radius-md); margin-top: 18px;">
          <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; color: #0d8a57; margin-bottom: 6px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Refrigerated Delivery Available for "${input}"!
          </div>
          <p style="font-size: 0.85rem; color: var(--text-dark); line-height: 1.5;">
            Our morning chill-van delivers to your neighborhood every <strong>Tuesday, Thursday, & Saturday</strong> between <strong>07:30 AM – 11:30 AM</strong>.
          </p>
        </div>
      `;
    });
  }

  // --- 8. Subscription Plan Card Selectors ---
  const subPlanCards = document.querySelectorAll('.sub-plan-card');
  subPlanCards.forEach(card => {
    card.addEventListener('click', () => {
      subPlanCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const planName = card.querySelector('h5').innerText;
      showToast(`Selected "${planName}". Click 'View Subscription Plans' to customize.`);
    });
  });

  // --- 9. Toast Notification ---
  function showToast(message) {
    if (!toastNotice || !toastMessage) return;
    toastMessage.textContent = message;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 3800);
  }

  // --- 10. Sticky Navbar & Side Rail Scroll Tracker ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Track scroll for side rail
    const sections = ['hero', 'promise', 'catch', 'sourcing', 'benefits', 'subscription'];
    const scrollPos = window.scrollY + 200;

    sections.forEach((secId, idx) => {
      const el = document.getElementById(secId);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          document.querySelectorAll('.rail-step').forEach(step => step.classList.remove('active'));
          const currentStep = document.querySelector(`.rail-step[data-step="${idx + 1}"]`);
          if (currentStep) currentStep.classList.add('active');
        }
      }
    });
  });

  // --- 11. Initial Render ---
  renderProducts();
  updateCartUI();
});
