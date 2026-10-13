/* ==========================================================================
   MARIS & CATCH — SHARED CONTENT DATA
   Central content store consumed by services, blog, pricing, faq pages.
   No frameworks. Pure vanilla JS global namespace.
   ========================================================================== */

window.MARIS = window.MARIS || {};

/* --------------------------------------------------------------------------
   ASSET HELPERS
   Resolves an asset path relative to the current document depth so the same
   data works from /, /public/pages, /public/auth, etc.
   -------------------------------------------------------------------------- */
window.MARIS.basePath = (function () {
  var path = window.location.pathname.replace(/\\/g, '/');
  var marker = '/public/';
  var idx = path.indexOf(marker);
  if (idx === -1) return './';
  var after = path.substring(idx + marker.length);
  var depth = after.split('/').length - 1;
  return '../'.repeat(depth + 1);
})();

window.MARIS.asset = function (rel) {
  return window.MARIS.basePath + 'assets/images/' + rel;
};

/* --------------------------------------------------------------------------
   SERVICES
   -------------------------------------------------------------------------- */
window.MARIS.services = [
  {
    id: 'same-day-fish-delivery',
    title: 'Same-Day Fresh Fish Delivery',
    category: 'Logistics',
    icon: 'truck',
    short: 'Order by 10:00 AM and receive rod-caught fish in chilled packaging the very same day.',
    tagline: 'From the morning landing to your kitchen before dinner.',
    image: 'hero_salmon.jpg',
    overview: [
      'Our flagship delivery service connects the dawn auction at Pier 4 directly to your doorstep. Every fish is inspected, weighed, and packed on a 0–2°C crushed-ice bed within hours of landing.',
      'Choose a two-hour delivery window that fits your day. Our refrigerated vans are telemetry-tracked, so you always know exactly when your catch will arrive.'
    ],
    features: [
      { title: 'Two-Hour Windows', text: 'Pick a morning or afternoon slot that suits your routine, tracked live to your door.' },
      { title: 'Insulated Chill Packaging', text: 'Recyclable thermo-boxes hold ice for up to six hours after arrival.' },
      { title: 'Harbor Traceability Card', text: 'Each box ships with vessel ID, landing time, and verified catch zone.' },
      { title: 'Contactless Handover', text: 'Optional chilled drop-safe locker for apartment buildings.' }
    ],
    process: [
      { step: '01', title: 'Choose Your Catch', text: 'Browse available stock with real-time weights and catch dates.' },
      { step: '02', title: 'Pick a Delivery Window', text: 'Select a convenient two-hour slot during checkout.' },
      { step: '03', title: 'Chilled Doorstep Arrival', text: 'Your fish arrives on ice, ready for the pan or the freezer.' }
    ],
    includes: [
      'Fresh crushed-ice cold chain from landing to door',
      'Traceability card with vessel and landing data',
      'Recyclable insulated box and gel refrigerant',
      'Live SMS/email tracking with driver ETA'
    ],
    faqs: [
      { q: 'What is the cut-off time for same-day delivery?', a: 'Orders placed before 10:00 AM qualify for same-day delivery in all eligible neighborhoods. Later orders roll to the next morning route.' },
      { q: 'How cold is the fish on arrival?', a: 'All fish travel between 0°C and 2°C. Each box includes a temperature logger strip you can verify.' },
      { q: 'Can I reschedule a delivery window?', a: 'Yes, up to 90 minutes before your window via the User Dashboard with no fee.' },
      { q: 'Do you deliver on Sundays?', a: 'Our morning routes run Tuesday, Thursday, and Saturday. Custom plans can add weekend slots.' }
    ],
    pricing: [
      { name: 'Single Route', price: '$8.50', period: 'per delivery', desc: 'Perfect for one-off orders.', features: ['Same-day chilled delivery', 'Two-hour window', 'Free over $75'], highlight: false },
      { name: 'Weekly Ritual', price: '$29', period: 'per month', desc: 'Unlimited free delivery all month.', features: ['Unlimited free delivery', 'Priority morning slots', 'No minimum order', 'Reschedule anytime'], highlight: true },
      { name: 'Household Plus', price: '$49', period: 'per month', desc: 'For large families and entertainers.', features: ['Everything in Weekly Ritual', 'Two concurrent routes', 'Dedicated spot in morning cut-off', 'Concierge phone support'], highlight: false }
    ]
  },
  {
    id: 'custom-butchery-filleting',
    title: 'Custom Butchery & Filleting',
    category: 'Preparation',
    icon: 'knife',
    short: 'Master fishmongers cut, descale, pin-bone, and portion your catch exactly how you cook it.',
    tagline: 'Restaurant-grade breakdown, sized for your table.',
    image: 'salmon_portion.jpg',
    overview: [
      'Every piece of seafood can be prepared by our in-house fishmongers before it is packed. Whether you want bone-in steaks, skinless portions, or butterflied whole fish, we cut to order.',
      'Our butchery operates in a dedicated 4°C room with separate boards for marine fish, freshwater fish, and shellfish to prevent cross-contact.'
    ],
    features: [
      { title: 'Portion Weight Control', text: 'Specify grams per portion and we deliver identical cuts every time.' },
      { title: 'Pin-Boning Service', text: 'Hand pin-boning removes fine bones for stress-free cooking.' },
      { title: 'Sushi-Ready Slicing', text: 'Precision sashimi blocks cut to chef specification on request.' },
      { title: 'Zero Waste Yield Report', text: 'We report net yield so you only pay for usable flesh.' }
    ],
    process: [
      { step: '01', title: 'Tell Us Your Recipe', text: 'Share cooking method and preferred portion size.' },
      { step: '02', title: 'Butcher to Order', text: 'Your fish is cut, trimmed, and pin-boned in our cold room.' },
      { step: '03', title: 'Vacuum-Sealed', text: 'Portions are sealed individually and labelled for easy storage.' }
    ],
    includes: [
      'Bone-in, boneless, or butterflied cuts',
      'Descaling, gutting, and fin trimming',
      'Individually vacuum-sealed portions',
      'Prep-date labels for safe home storage'
    ],
    faqs: [
      { q: 'Is custom butchery free?', a: 'Basic gutting, descaling, and filleting are included free on all whole-fish orders. Advanced sashimi prep carries a small per-kg fee.' },
      { q: 'Can you keep the bones and trim?', a: 'Absolutely. Ask us to include bones, head, and trim for stock in a separate bag at no charge.' },
      { q: 'How are portions labelled?', a: 'Every pack shows species, cut, net weight, and prep date so you can freeze with confidence.' }
    ],
    pricing: [
      { name: 'Included', price: '$0', period: 'whole-fish orders', desc: 'Standard cuts always free.', features: ['Gutting & descaling', 'Fillet or steak cut', 'Basic pin-boning'], highlight: false },
      { name: 'Artisan Cut', price: '$4', period: 'per kg', desc: 'Advanced to-order butchery.', features: ['Portion-weight control', 'Full pin-boning', 'Butterfly & roll cuts', 'Yield report'], highlight: true },
      { name: 'Chef Specification', price: '$9', period: 'per kg', desc: 'For professional kitchens.', features: ['Sashimi block slicing', 'Custom portioning', 'Scheduled weekly prep', 'Dedicated fishmonger'], highlight: false }
    ]
  },
  {
    id: 'seafood-subscription-boxes',
    title: 'Seafood Subscription Boxes',
    category: 'Subscription',
    icon: 'box',
    short: 'A recurring curated box of seasonal catch, tuned to your household size and tastes.',
    tagline: 'Dinner solved, one chilled box at a time.',
    image: 'subscription_box.jpg',
    overview: [
      'Set your preferences once and we handle the rest. Each box is assembled around what is genuinely fresh that week, not a fixed catalogue.',
      'Pause, swap species, change frequency, or cancel anytime from your dashboard — no phone calls, no penalties.'
    ],
    features: [
      { title: 'Seasonal Curation', text: 'Boxes follow the calendar so you always cook at peak quality.' },
      { title: 'Household Sizing', text: 'Solo, couple, family, and feast sizes with realistic portions.' },
      { title: 'Flexible Swaps', text: 'Exclude disliked species and prioritise your favourites.' },
      { title: 'Save Up To 12%', text: 'Subscribers pay less per kilogram than one-off orders.' }
    ],
    process: [
      { step: '01', title: 'Build Your Profile', text: 'Choose box size, frequency, and species preferences.' },
      { step: '02', title: 'We Curate Weekly', text: 'Our buyer selects the week’s best catch for your box.' },
      { step: '03', title: 'Delivered on Repeat', text: 'Your box arrives on your chosen cadence, chilled and labelled.' }
    ],
    includes: [
      'Curated mix of fish and shellfish',
      'Up to 12% subscriber savings',
      'Recipe card matched to box contents',
      'One-click pause and skip'
    ],
    faqs: [
      { q: 'Can I skip a week?', a: 'Yes. Skip, pause, or reschedule any delivery up to 48 hours before dispatch from your User Dashboard.' },
      { q: 'What if I do not like a species?', a: 'Add it to your exclusions list and our curators will never include it.' },
      { q: 'Is there a lock-in contract?', a: 'Never. Every plan is month-to-month and cancels instantly online.' }
    ],
    pricing: [
      { name: 'Solo Box', price: '$39', period: 'per box', desc: 'One keen cook, 2 portions.', features: ['2 premium portions', 'Bi-weekly or weekly', 'Recipe card', 'Free delivery over $75'], highlight: false },
      { name: 'Couple Box', price: '$69', period: 'per box', desc: 'Most popular for two.', features: ['4 portions + shellfish', 'Species swaps', 'Priority slots', '12% savings applied'], highlight: true },
      { name: 'Family Feast', price: '$129', period: 'per box', desc: 'Six to eight generous portions.', features: ['6–8 portions', 'Two species of shellfish', 'Bespoke curation call', 'Free delivery always'], highlight: false }
    ]
  },
  {
    id: 'live-shellfish-prawns',
    title: 'Live Shellfish & Prawns',
    category: 'Specialty',
    icon: 'shell',
    short: 'Live crabs, lobster, and jumbo prawns held in seawater tanks right up to dispatch.',
    tagline: 'Tank-fresh crustaceans, ready for the pot.',
    image: 'tiger_prawns.jpg',
    overview: [
      'Our shellfish live in filtered seawater holding tanks at the quay until the moment they are dispatched, preserving sweetness and texture.',
      'From black tiger prawns to brown crab and native lobster, everything arrives lively and ready for the table.'
    ],
    features: [
      { title: 'Seawater Holding Tanks', text: 'Optimal salinity and oxygen keep shellfish in prime condition.' },
      { title: 'Grading by Size', text: 'Consistent counts per kilogram for predictable plating.' },
      { title: 'Humane Dispatch Guidance', text: 'Simple instructions for stress-free preparation.' },
      { title: 'Weekend Availability', text: 'Live tanks stocked for Friday and Saturday feasts.' }
    ],
    process: [
      { step: '01', title: 'Select Your Shellfish', text: 'Choose species, size grade, and quantity.' },
      { step: '02', title: 'Held Live', text: 'We keep it in seawater tanks until your dispatch slot.' },
      { step: '03', title: 'Insulated Live Transit', text: 'Delivered cool, damp, and lively in chilled bio-crates.' }
    ],
    includes: [
      'Seawater-conditioned shellfish',
      'Size grading and count verification',
      'Chilled bio-crate with moisture pads',
      'Preparation and storage guide'
    ],
    faqs: [
      { q: 'Will the shellfish still be alive on arrival?', a: 'Yes. Live items are dispatched hours before delivery and travel in moisture-controlled crates.' },
      { q: 'How do I store live crab or lobster?', a: 'Keep them cool and damp — never in tap water — and cook within 24 hours for best results.' },
      { q: 'Can I order just a single lobster?', a: 'Definitely. Single-item shellfish orders are welcome with no minimum.' }
    ],
    pricing: [
      { name: 'Prawn Packs', price: '$36', period: 'per 800g', desc: 'Jumbo black tiger prawns.', features: ['Raw head-on or peeled', 'Graded sizing', 'Chilled delivery', 'Prep guide included'], highlight: false },
      { name: 'Crustacean Duo', price: '$74', period: 'per box', desc: 'Crab and prawns together.', features: ['1 crab + 800g prawns', 'Live crab option', 'Ice-pack crate', 'Free delivery'], highlight: true },
      { name: 'Lobster Feast', price: '$148', period: 'per box', desc: 'Two native lobsters.', features: ['2 whole lobsters', 'Humane dispatch guide', 'Seaweed wrap', 'Concierge scheduling'], highlight: false }
    ]
  },
  {
    id: 'sushi-grade-selection',
    title: 'Sushi-Grade Selection',
    category: 'Premium',
    icon: 'fish',
    short: 'Traceable, sashimi-grade loin cuts handled to the strictest temperature and hygiene standards.',
    tagline: 'For home sushi nights that taste like the counter.',
    image: 'seabass.jpg',
    overview: [
      'Our sushi-grade range is sourced from trusted fisheries and handled at a constant 0–1°C with dedicated tools and gloves to protect quality.',
      'Each loin comes with a handling card covering safe consumption timelines and slicing guidance.'
    ],
    features: [
      { title: 'Constant 0–1°C Chain', text: 'Colder than standard retail to protect raw-fish quality.' },
      { title: 'Dedicated Sashimi Tools', text: 'Separate knives, boards, and gloves prevent cross-contact.' },
      { title: 'Parasite-Safe Guidance', text: 'Clear information on freeze cycles where required.' },
      { title: 'Chef-Selected Loins', text: 'Only the highest-fat, most uniform cuts make the grade.' }
    ],
    process: [
      { step: '01', title: 'Order Your Loin', text: 'Pick species, loin size, and optional slicing.' },
      { step: '02', title: 'Cold-Room Breakdown', text: 'Handled at 0–1°C with sashimi-dedicated equipment.' },
      { step: '03', title: 'Chilled Overnight', text: 'Vacuum-sealed and delivered in a colder cushioned pack.' }
    ],
    includes: [
      'Sashimi-grade loin or block',
      '0–1°C handling documentation',
      'Optional pro slicing',
      'Safe-consumption timeline card'
    ],
    faqs: [
      { q: 'Is your fish parasite-safe for raw eating?', a: 'We follow documented freeze cycles where species require it and provide a handling card with every sashimi order.' },
      { q: 'Can you slice it for me?', a: 'Yes — select pro slicing at checkout and we will cut nigiri-ready slabs.' },
      { q: 'How long can I keep it raw?', a: 'Consume within 24 hours of delivery for the best flavour and texture.' }
    ],
    pricing: [
      { name: 'Taster Loin', price: '$34', period: '~300g', desc: 'Intro to raw prep.', features: ['Single loin', 'Handling card', 'Cushioned pack', 'Chilled delivery'], highlight: false },
      { name: 'Sushi Night', price: '$62', period: '~600g', desc: 'Enough for two.', features: ['Two loin varieties', 'Pro slicing option', 'Soy & wasabi kit', 'Free delivery'], highlight: true },
      { name: 'Omakase Box', price: '$118', period: '~1.2kg', desc: 'Chef-curated spread.', features: ['Four species', 'Full sashimi slicing', 'Seasonal specials', 'Concierge support'], highlight: false }
    ]
  },
  {
    id: 'event-catering-platters',
    title: 'Event & Catering Seafood Platters',
    category: 'Catering',
    icon: 'platter',
    short: 'Show-stopping seafood towers and smoked platters delivered ready to serve for your guests.',
    tagline: 'The centrepiece your celebration deserves.',
    image: 'seafood_feast.jpg',
    overview: [
      'From intimate dinner parties to corporate receptions, our catering team builds layered seafood platters and towers that need zero last-minute effort.',
      'Everything arrives pre-chilled, garnished, and accompanied by sauces, lemons, and serving guidance.'
    ],
    features: [
      { title: 'Layered Display Towers', text: 'Tiered platters of prawns, oysters, crab, and smoked fish.' },
      { title: 'Guest-Count Scaling', text: 'Platters sized from 6 to 200 guests without quality loss.' },
      { title: 'Sauce & Garnish Kit', text: 'House mignonette, marie rose, lemons, and herbs included.' },
      { title: 'Scheduled Setup Delivery', text: 'Timed arrival blocks to match your event schedule.' }
    ],
    process: [
      { step: '01', title: 'Share Your Event', text: 'Tell us guest count, date, and dietary needs.' },
      { step: '02', title: 'We Design the Platter', text: 'Our team proposes a curated layout and menu.' },
      { step: '03', title: 'Ready-to-Serve Delivery', text: 'Arrives assembled and chilled, minutes before guests.' }
    ],
    includes: [
      'Assembled tiered platter or tower',
      'House sauces and garnish kit',
      'Recyclable display stand',
      'On-call event coordinator'
    ],
    faqs: [
      { q: 'How much notice do you need?', a: 'We recommend 72 hours for catering orders, though we accommodate rush requests whenever stock allows.' },
      { q: 'Can you handle dietary requirements?', a: 'Yes — tell us about shellfish allergies or preferences and we will build alternative arrangements.' },
      { q: 'Do you provide staffing?', a: 'For large events we can arrange trained servers and oyster shuckers for an hourly fee.' }
    ],
    pricing: [
      { name: 'Gathering', price: '$89', period: '6–10 guests', desc: 'Intimate dinner parties.', features: ['Two-tier platter', 'Two shellfish types', 'Sauce kit', 'Scheduled delivery'], highlight: false },
      { name: 'Celebration', price: '$189', period: '20–30 guests', desc: 'Parties and milestones.', features: ['Three-tier tower', 'Four shellfish types', 'Garnish & breads', 'Setup guidance'], highlight: true },
      { name: 'Grand Event', price: 'Custom', period: 'per booking', desc: 'Weddings and corporate.', features: ['Bespoke menu design', 'On-site coordinator', 'Staffing available', 'Full setup service'], highlight: false }
    ]
  },
  {
    id: 'sustainable-sourcing-consultation',
    title: 'Sustainable Sourcing Consultation',
    category: 'Advisory',
    icon: 'leaf',
    short: 'Work with our sourcing team to build a traceable, responsible seafood programme for your kitchen.',
    tagline: 'Buy better, with data behind every decision.',
    image: 'fishing_boat.jpg',
    overview: [
      'Restaurants, schools, and retailers use our advisory service to align their menus with genuinely sustainable, traceable supply.',
      'We map your current spend, identify risk, and propose certified alternatives without compromising on flavour.'
    ],
    features: [
      { title: 'Supply Chain Mapping', text: 'See exactly where every product originates.' },
      { title: 'Certification Guidance', text: 'Navigate MSC, ASC, and local sustainability schemes.' },
      { title: 'Menu Engineering', text: 'Match species to season for cost and quality wins.' },
      { title: 'Reporting Dashboard', text: 'Track traceability KPIs across your operation.' }
    ],
    process: [
      { step: '01', title: 'Discovery Session', text: 'We review your menu, volumes, and sourcing goals.' },
      { step: '02', title: 'Build the Roadmap', text: 'Get a costed plan of certified alternatives.' },
      { step: '03', title: 'Ongoing Support', text: 'Quarterly reviews keep your programme on track.' }
    ],
    includes: [
      'Current-supply audit report',
      'Certified alternative recommendations',
      'Costed transition roadmap',
      'Quarterly performance reviews'
    ],
    faqs: [
      { q: 'Is this only for restaurants?', a: 'No — we work with any business that serves or sells seafood, from schools to retail chains.' },
      { q: 'What does a consultation cost?', a: 'The discovery session is free. Ongoing advisory is billed as a monthly retainer or per-project fee.' },
      { q: 'How soon will we see results?', a: 'Most clients have a costed roadmap within two weeks and begin switching supply within a month.' }
    ],
    pricing: [
      { name: 'Discovery', price: 'Free', period: 'one session', desc: 'Understand your options.', features: ['60-minute session', 'Initial supply overview', 'Certification primer', 'No obligation'], highlight: false },
      { name: 'Programme', price: '$490', period: 'per month', desc: 'Full advisory retainer.', features: ['Supply chain mapping', 'Costed roadmap', 'Monthly reviews', 'Email support'], highlight: true },
      { name: 'Enterprise', price: 'Custom', period: 'per project', desc: 'Multi-site operations.', features: ['Multi-site audit', 'Custom reporting', 'On-site training', 'Dedicated advisor'], highlight: false }
    ]
  }
];

/* --------------------------------------------------------------------------
   PRODUCTS
   -------------------------------------------------------------------------- */
window.MARIS.products = [
  {
    id: 'prod-salmon',
    name: 'Atlantic Salmon Cutlets',
    latin: 'Salmo salar',
    category: 'fillets',
    categoryLabel: 'Fillets & Steaks • Cutlet',
    price: 28.50,
    unit: '/ kg',
    status: 'Available Today',
    stockLabel: '14 kg landed today',
    origin: 'Norwegian Fjords (Verified)',
    image: 'salmon_portion.jpg',
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
    origin: 'Aegean Sea • Hook & Line',
    image: 'seabass.jpg',
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
    origin: 'Coastal Estuaries',
    image: 'tiger_prawns.jpg',
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
    categoryLabel: 'Marine Fish • Pelagic',
    price: 16.50,
    unit: '/ kg',
    status: 'Available Today',
    stockLabel: 'Limited Catch',
    origin: 'Atlantic Coastal Waters',
    image: 'sardines.jpg',
    prepOptions: ['Whole on Crushed Ice', 'Cleaned & Scaled', 'Butterflied (Head off)'],
    description: 'Lustrous silver sardines brimming with robust oceanic savor. Hand-selected for uniform size and glistening skin integrity.',
    cooking: 'Grill whole over lump charcoal with coarse sea salt and charred lemon juice.',
    temp: 'Consume within 24–36 hours for peak freshness. Keep chilled on ice.',
    method: 'Artisanal purse-seine coastal catch with minimal bycatch impact.'
  },
  {
    id: 'prod-mackerel',
    name: 'Atlantic Mackerel',
    latin: 'Scomber scombrus',
    category: 'marine',
    categoryLabel: 'Marine Fish • Oily',
    price: 18.00,
    unit: '/ kg',
    status: 'Available Today',
    stockLabel: '12 kg landed today',
    origin: 'North Atlantic • Day Boat',
    image: 'mackerel_navy.jpg',
    prepOptions: ['Whole (Gutted)', 'Fillets (Skin-on)', 'Butterflied & Pin-boned'],
    description: 'Glossy, firm-fleshed mackerel from cold northern waters. Exceptionally rich in omega-3s with a deep, savory character.',
    cooking: 'Griddle skin side up until crisp, or cure in citrus and dill for 20 minutes.',
    temp: 'Store at 0°C to 2°C. Best within 48 hours of landing.',
    method: 'Sustainably line-caught by certified day boats.'
  },
  {
    id: 'prod-crab',
    name: 'Native Brown Crab',
    latin: 'Cancer pagurus',
    category: 'shellfish',
    categoryLabel: 'Shellfish • Live',
    price: 24.00,
    unit: '/ kg',
    status: 'Available Today',
    stockLabel: 'Held live in-tank',
    origin: 'Coastal Reefs',
    image: 'crabs_shellfish.jpg',
    prepOptions: ['Live (Whole)', 'Cooked & Chilled', 'Dressed (Meat Only)'],
    description: 'Heavy, sweet native brown crab landed from inshore potters and held live in filtered seawater until dispatch.',
    cooking: 'Steam for 15 minutes per kg, then chill and pick the white and brown meat.',
    temp: 'Keep live crab cool and damp, never in tap water. Cook within 24 hours.',
    method: 'Inshore pot-caught, size-selected and returned-female protected.'
  },
  {
    id: 'prod-trout',
    name: 'Freshwater Rainbow Trout',
    latin: 'Oncorhynchus mykiss',
    category: 'freshwater',
    categoryLabel: 'Freshwater Fish • Whole',
    price: 21.00,
    unit: '/ kg',
    status: 'Available Today',
    stockLabel: '8 fish remaining',
    origin: 'Spring-Fed Valley Farms',
    image: 'freshwater_trout.jpg',
    prepOptions: ['Whole (Gutted)', 'Filleted (Boneless)', 'Butterflied'],
    description: 'Delicate freshwater trout raised in cold spring-fed raceways. Fine-grained pink flesh with a clean, nutty finish.',
    cooking: 'Pan-fry in brown butter and almonds, or hot-smoke over oak chips.',
    temp: 'Keep at 0°C to 2°C and cook within 48 hours.',
    method: 'Spring-fed, low-density farm with no antibiotics.'
  },
  {
    id: 'prod-platter',
    name: 'Royal Seafood Feast Platter',
    latin: 'Mixed Cold-Water Catch',
    category: 'platters',
    categoryLabel: 'Platters • Ready to Serve',
    price: 89.00,
    unit: '/ platter',
    status: 'Available Today',
    stockLabel: 'Pre-order recommended',
    origin: 'Harbor Assembled',
    image: 'seafood_feast.jpg',
    prepOptions: ['Serves 4–6', 'Serves 8–10', 'Add oyster shucking kit'],
    description: 'A layered centrepiece of prawns, dressed crab, smoked salmon, oysters, and langoustines, assembled minutes before delivery.',
    cooking: 'Ready to serve. Arrange on ice and garnish with the included lemon and sauces.',
    temp: 'Keep chilled at 0°C to 4°C and serve within 4 hours.',
    method: 'Assembled to order in our harbor cold kitchen.'
  }
];

/* --------------------------------------------------------------------------
   BLOG POSTS
   -------------------------------------------------------------------------- */
window.MARIS.blogPosts = [
  {
    id: 'choose-fresh-fish',
    title: 'How to Choose the Freshest Fish at the Market',
    category: 'Guides',
    author: 'Eleanor Vance',
    role: 'Head Fishmonger',
    date: '2026-09-28',
    readTime: '6 min read',
    image: 'seabass.jpg',
    excerpt: 'Bright eyes, firm flesh, and clean scent — learn the simple checks professionals use before they buy a single fillet.',
    tags: ['Freshness', 'Buying Guide', 'Fishmonger'],
    content: [
      { type: 'paragraph', text: 'A great seafood meal begins long before the pan heats up. The single most valuable skill you can learn is judging freshness at a glance, and it takes only four quick checks.' },
      { type: 'heading', text: '1. Look at the Eyes' },
      { type: 'paragraph', text: 'Fresh fish have clear, convex eyes that bulge slightly. As fish age, the eyes cloud and sink inward. If the eyes look dull or sunken, keep walking.' },
      { type: 'heading', text: '2. Check the Gills' },
      { type: 'paragraph', text: 'Lift the gill cover gently. You want deep red to pink, moist gills with no slime or brown discoloration. Pale, greyish gills are a clear warning sign.' },
      { type: 'quote', text: 'Fresh fish smells of the sea, not of “fish”. If the aroma is sharp or ammonia-like, quality has already declined.' },
      { type: 'heading', text: '3. Press the Flesh' },
      { type: 'paragraph', text: 'A gentle press with your fingertip should spring back immediately. If an indentation lingers, the muscle structure is breaking down.' },
      { type: 'heading', text: '4. Note the Sheen' },
      { type: 'list', items: ['Skin should shimmer with natural iridescence', 'Flesh should look translucent, not chalky', 'No dry or curling edges', 'Scales should sit tight to the body'] },
      { type: 'paragraph', text: 'Our traceability card gives you all of this information up front, so you can buy with the same confidence our fishmongers do every morning.' }
    ]
  },
  {
    id: 'salmon-cooking-guide',
    title: 'The Complete Salmon Cooking Guide',
    category: 'Recipes',
    author: 'Marcus Lin',
    role: 'Culinary Director',
    date: '2026-09-20',
    readTime: '8 min read',
    image: 'salmon_portion.jpg',
    excerpt: 'Pan-sear, roast, cure, or grill — a single salmon fillet can become four completely different dinners.',
    tags: ['Salmon', 'Recipes', 'Techniques'],
    content: [
      { type: 'paragraph', text: 'Atlantic salmon is forgiving, rich, and endlessly adaptable. This guide walks through four core techniques and the internal temperatures that guarantee a perfect result.' },
      { type: 'heading', text: 'Pan-Searing Skin-Side Down' },
      { type: 'paragraph', text: 'Pat the skin bone-dry, season generously, and place it into a hot oiled pan skin-side down. Press gently for the first twenty seconds so the skin stays flat, then leave it alone until the edges turn opaque.' },
      { type: 'list', items: ['Use medium-high heat and a stainless or cast-iron pan', 'Target 48–52°C internal for silky medium', 'Baste with butter and thyme in the final minute'] },
      { type: 'heading', text: 'Slow-Roasting Whole Sides' },
      { type: 'paragraph', text: 'For entertaining, roast a whole side at a low 120°C until it reaches 45°C. The flesh stays translucent and glistening, and it flakes at the touch of a fork.' },
      { type: 'quote', text: 'Salmon continues cooking after it leaves the heat. Pull it four degrees early and let it rest.' },
      { type: 'heading', text: 'Grilled Salmon' },
      { type: 'paragraph', text: 'Oil the grates, not the fish. Cook on a well-cleaned hot grill over direct heat, turning only once, for charred edges and a smoky finish.' }
    ]
  },
  {
    id: 'shellfish-storage',
    title: 'Storing Shellfish Safely at Home',
    category: 'Guides',
    author: 'Priya Naidoo',
    role: 'Food Safety Lead',
    date: '2026-09-12',
    readTime: '5 min read',
    image: 'crabs_shellfish.jpg',
    excerpt: 'Live crab, raw prawns, and oysters each need a different approach. Here is how to keep them at their best.',
    tags: ['Storage', 'Food Safety', 'Shellfish'],
    content: [
      { type: 'paragraph', text: 'Shellfish spoils faster than fin fish, so a little knowledge goes a long way. The rules differ depending on whether your shellfish is live, raw, or cooked.' },
      { type: 'heading', text: 'Live Crab and Lobster' },
      { type: 'paragraph', text: 'Keep them cool and damp, never submerged in tap water. A covered container lined with damp paper towels in the coldest part of the fridge works perfectly for up to 24 hours.' },
      { type: 'heading', text: 'Raw Prawns and Mussels' },
      { type: 'list', items: ['Store on ice in a sealed container', 'Use within 24 hours of delivery', 'Discard any mussels that stay open when tapped'] },
      { type: 'heading', text: 'Cooked Shellfish' },
      { type: 'paragraph', text: 'Cooked shellfish keeps for up to two days when chilled. Keep it airtight to prevent it absorbing other fridge odours.' },
      { type: 'quote', text: 'When in doubt, throw it out. Shellfish is not the place to gamble on freshness.' }
    ]
  },
  {
    id: 'sustainable-seafood',
    title: 'What “Sustainable Seafood” Really Means',
    category: 'Sustainability',
    author: 'Eleanor Vance',
    role: 'Head Fishmonger',
    date: '2026-09-04',
    readTime: '7 min read',
    image: 'fishing_boat.jpg',
    excerpt: 'Beyond the labels lies a complicated story of stocks, gear, and communities. Here is how to read between the lines.',
    tags: ['Sustainability', 'Sourcing', 'Ethics'],
    content: [
      { type: 'paragraph', text: '“Sustainable” is one of the most used and least understood words in food. It is not a single attribute but a balance of stock health, fishing method, and community impact.' },
      { type: 'heading', text: 'Stock Health Comes First' },
      { type: 'paragraph', text: 'A fishery is sustainable only if the population can replenish itself. Certification schemes such as MSC assess this independently, which is why we prioritise certified and locally managed stocks.' },
      { type: 'heading', text: 'Gear Matters' },
      { type: 'list', items: ['Hook-and-line catches cause minimal habitat damage', 'Purse-seine can be highly selective for schooling fish', 'Bottom trawling carries the highest bycatch risk'] },
      { type: 'heading', text: 'People Matter Too' },
      { type: 'paragraph', text: 'Sustainability includes fair pay for crews and the survival of coastal communities. Buying from day-boats keeps that value local.' },
      { type: 'quote', text: 'The most sustainable fish is the one you actually eat — waste less, and you have already done half the work.' }
    ]
  },
  {
    id: 'seafood-omega3',
    title: 'Omega-3s: Why Seafood Matters for Your Health',
    category: 'Health',
    author: 'Dr. Amara Cole',
    role: 'Nutrition Advisor',
    date: '2026-08-26',
    readTime: '6 min read',
    image: 'sardines.jpg',
    excerpt: 'Oily fish remain the best dietary source of long-chain omega-3s. Here is what the evidence says about how much to eat.',
    tags: ['Health', 'Nutrition', 'Omega-3'],
    content: [
      { type: 'paragraph', text: 'Long-chain omega-3 fatty acids support heart, brain, and eye health. Oily fish such as sardines, mackerel, and salmon are by far the richest and most absorbable source.' },
      { type: 'heading', text: 'How Much Do You Need?' },
      { type: 'paragraph', text: 'Most guidelines suggest one to two servings of oily fish per week. A serving is roughly 140 grams cooked.' },
      { type: 'heading', text: 'Best Sources' },
      { type: 'list', items: ['Sardines and mackerel — highest omega-3 per gram', 'Salmon — high omega-3 and easy to cook', 'Trout and herring — great everyday options'] },
      { type: 'heading', text: 'Small Fish, Big Benefits' },
      { type: 'paragraph', text: 'Small oily fish are also low in mercury and affordable, making them an excellent weekly staple.' },
      { type: 'quote', text: 'Two portions of oily fish a week is one of the simplest evidence-backed dietary upgrades you can make.' }
    ]
  },
  {
    id: 'grilling-prawns',
    title: 'Grilled Prawns: 5 Recipes You Will Love',
    category: 'Recipes',
    author: 'Marcus Lin',
    role: 'Culinary Director',
    date: '2026-08-18',
    readTime: '7 min read',
    image: 'tiger_prawns.jpg',
    excerpt: 'Garlic butter, smoky paprika, citrus, chilli, and herb — five marinades that turn jumbo prawns into a feast.',
    tags: ['Prawns', 'Recipes', 'Grilling'],
    content: [
      { type: 'paragraph', text: 'Jumbo prawns cook in minutes, which makes them ideal for fast, impressive meals. The key is a screaming-hot grill and a bold marinade.' },
      { type: 'heading', text: '1. Classic Garlic Butter' },
      { type: 'paragraph', text: 'Melt butter with crushed garlic, parsley, and a squeeze of lemon. Brush over prawns and grill for two minutes per side.' },
      { type: 'heading', text: '2. Smoked Paprika & Lime' },
      { type: 'paragraph', text: 'Toss peeled prawns in olive oil, smoked paprika, and lime zest for a warm, smoky finish.' },
      { type: 'heading', text: '3. Chilli & Honey Glaze' },
      { type: 'list', items: ['Whisk honey, chilli flakes, and soy', 'Glaze in the final minute to avoid burning', 'Finish with sesame and spring onion'] },
      { type: 'quote', text: 'Never walk away from a prawn on the grill. Two minutes too long turns sweetness into rubber.' }
    ]
  },
  {
    id: 'cold-chain-explained',
    title: 'Inside Our Cold-Chain: From Boat to Door',
    category: 'Behind the Scenes',
    author: 'Priya Naidoo',
    role: 'Food Safety Lead',
    date: '2026-08-10',
    readTime: '5 min read',
    image: 'mackerel_navy.jpg',
    excerpt: 'Trace a single mackerel from the 4:30 AM landing to your kitchen and see every temperature checkpoint along the way.',
    tags: ['Cold Chain', 'Logistics', 'Quality'],
    content: [
      { type: 'paragraph', text: 'Temperature control is invisible to the customer but it is the whole game. Here is the journey your fish makes before it ever reaches you.' },
      { type: 'heading', text: '4:30 AM — Landing' },
      { type: 'paragraph', text: 'Fish are unloaded and immediately buried in flake ice, dropping core temperature toward 0°C within minutes.' },
      { type: 'heading', text: '6:00 AM — Inspection & Grading' },
      { type: 'list', items: ['Freshness grading under cold light', 'Weight and traceability logging', 'Zone and vessel verification'] },
      { type: 'heading', text: '8:00 AM — Packing' },
      { type: 'paragraph', text: 'Orders are packed in insulated boxes with gel refrigerant and a temperature logger strip.' },
      { type: 'quote', text: 'Every box carries its own temperature history. If the chain breaks, we know before you do.' }
    ]
  },
  {
    id: 'winter-seafood',
    title: 'Best Winter Seafood for Cozy Dinners',
    category: 'Guides',
    author: 'Eleanor Vance',
    role: 'Head Fishmonger',
    date: '2026-08-02',
    readTime: '6 min read',
    image: 'freshwater_trout.jpg',
    excerpt: 'Cold months bring the richest, firmest fish of the year. Here is what to look for and how to cook it.',
    tags: ['Seasonal', 'Winter', 'Trout'],
    content: [
      { type: 'paragraph', text: 'Winter seafood is often overlooked, yet cold water produces some of the finest, firmest flesh of the entire year.' },
      { type: 'heading', text: 'Trout and Arctic Char' },
      { type: 'paragraph', text: 'These cold-water fish develop exceptional flavour in winter. Roast them whole with root vegetables for a warming traybake.' },
      { type: 'heading', text: 'Mussels and Clams' },
      { type: 'list', items: ['Peak sweetness in colder months', 'Perfect for white wine and cream broths', 'Ready in under ten minutes'] },
      { type: 'heading', text: 'Slow-Braised Fish' },
      { type: 'paragraph', text: 'Firm species like monkfish and turbot hold up beautifully in slow, spiced braises.' },
      { type: 'quote', text: 'Winter is not the off-season for seafood — it is the quiet peak.' }
    ]
  }
];

/* --------------------------------------------------------------------------
   CATEGORIES / TEAM / TESTIMONIALS / GENERAL FAQ
   -------------------------------------------------------------------------- */
window.MARIS.blogCategories = ['All', 'Guides', 'Recipes', 'Sustainability', 'Health', 'Behind the Scenes'];

window.MARIS.team = [
  { name: 'Eleanor Vance', role: 'Founder & Head Fishmonger', initials: 'EV', bio: 'Twenty years at the quayside, obsessed with traceability and the perfect fillet.' },
  { name: 'Marcus Lin', role: 'Culinary Director', initials: 'ML', bio: 'Former coastal restaurant chef who designs our preparation standards and recipes.' },
  { name: 'Priya Naidoo', role: 'Food Safety & Cold-Chain Lead', initials: 'PN', bio: 'Keeps every box between 0°C and 2°C, from landing to doorstep.' },
  { name: 'Tomás Rivera', role: 'Sourcing & Sustainability', initials: 'TR', bio: 'Builds relationships with day-boat crews and certified fisheries.' },
  { name: 'Hana Kim', role: 'Head of Customer Care', initials: 'HK', bio: 'Makes sure every box lands when promised and every question is answered.' },
  { name: 'Daniel Osei', role: 'Logistics Manager', initials: 'DO', bio: 'Runs the refrigerated fleet and the two-hour delivery promise.' }
];

window.MARIS.testimonials = [
  { name: 'Sarah & David K.', role: 'Weekly subscribers, Bayside', initials: 'SD', quote: 'The prawns arrive sweet and colossal. Our Friday dinners have completely changed.' },
  { name: 'Chef Marco Rossi', role: 'Restaurant owner, Old Harbour', initials: 'MR', quote: 'Traceability and consistency I can actually rely on. My kitchen stopped guessing.' },
  { name: 'Amelia Turner', role: 'Home cook, Rivergate', initials: 'AT', quote: 'The traceability card made me trust seafood again. Everything is cold and clean.' },
  { name: 'Josh Bennett', role: 'Family plan member', initials: 'JB', quote: 'The family box removed all the weeknight meal planning stress. Brilliant value.' }
];

window.MARIS.generalFaqs = [
  { cat: 'Orders', q: 'How do I place an order?', a: 'Browse Today’s Catch or the Products page, add items to your basket, and choose a chilled delivery window at checkout. No account is required to order.' },
  { cat: 'Orders', q: 'What is the delivery cut-off time?', a: 'Place orders before 10:00 AM for same-day chilled delivery. Later orders are dispatched on the next morning route.' },
  { cat: 'Orders', q: 'Can I change or cancel my order?', a: 'Yes. Orders can be modified up to 90 minutes before your delivery window from the User Dashboard or by contacting support.' },
  { cat: 'Delivery', q: 'Which neighborhoods do you deliver to?', a: 'We deliver across the harbor district and surrounding suburbs. Enter your postcode via the Check Delivery Availability tool to confirm your route.' },
  { cat: 'Delivery', q: 'How is freshness maintained in transit?', a: 'Every order travels between 0°C and 2°C in insulated boxes with gel refrigerant and a temperature logger strip.' },
  { cat: 'Delivery', q: 'Do you offer contactless delivery?', a: 'Yes. Choose chilled locker drop-off for apartment buildings and shared entrances at checkout.' },
  { cat: 'Subscriptions', q: 'Can I skip or pause a subscription box?', a: 'Absolutely. Skip, pause, or reschedule up to 48 hours before dispatch from your dashboard — no fees, no calls.' },
  { cat: 'Subscriptions', q: 'Is there a minimum commitment?', a: 'No. All subscriptions are month-to-month and can be cancelled instantly online.' },
  { cat: 'Payments', q: 'What payment methods do you accept?', a: 'We accept all major cards, digital wallets, and account credit. Subscriptions are billed automatically each cycle.' },
  { cat: 'Payments', q: 'Do you offer refunds?', a: 'If any product fails our freshness inspection on arrival, we replace it or issue full store credit immediately.' },
  { cat: 'Account', q: 'Do I need an account to order?', a: 'You can check out as a guest. Creating an account lets you track orders, manage subscriptions, and reorder favourites faster.' },
  { cat: 'Account', q: 'How do I reset my password?', a: 'Use the “Forgot password” link on the login page and follow the email instructions. This is a demo experience with no real authentication.' }
];

window.MARIS.pricingPlans = [
  {
    name: 'Harbor', price: 0, period: 'forever', tagline: 'For occasional home cooks',
    features: ['Pay-per-order pricing', 'Same-day delivery over $75', 'Standard preparation', 'Email support', 'Traceability card'],
    cta: 'Start Free', highlight: false
  },
  {
    name: 'Tidal', price: 29, period: 'per month', tagline: 'Most popular for regulars',
    features: ['Unlimited free delivery', 'Priority morning slots', 'Custom butchery included', 'Subscriber savings up to 12%', 'Live order tracking', 'Priority support'],
    cta: 'Choose Tidal', highlight: true
  },
  {
    name: 'Abyss', price: 79, period: 'per month', tagline: 'For families & entertainers',
    features: ['Everything in Tidal', 'Two concurrent routes', 'Catering discounts 15%', 'Dedicated concierge', 'Sushi-grade access', 'Quarterly sourcing report'],
    cta: 'Go Abyss', highlight: false
  }
];
