// Default content — displayed until Supabase is connected.
// All of this is editable from /admin once your DB is set up.

export const DEFAULT_CONTENT = {
  hero: {
    badge: "India's Hotel Tech Platform",
    headline_line1: 'Stop Losing',
    headline_line2: 'Revenue',
    headline_accent: 'to OTAs.',
    subtext: 'StayFlo gives Indian hotels a complete tech stack — Booking Engine, Payments, CRM, PMS, Channel Manager and Growth Marketing — from one platform, at a fraction of the cost.',
    cta_demo: 'Book a Demo',
    cta_audit: 'Free Tech Audit',
    stat1_val: '₹3–5 Cr',
    stat1_label: 'OTA savings, Year 1',
    stat2_val: '22%',
    stat2_label: 'Direct booking uplift',
    stat3_val: '2.4×',
    stat3_label: 'Repeat guest rate',
    dashboard_title: 'Live Dashboard',
  },

  problem: {
    section_label: 'The Problem',
    headline: 'Hotels Are Drowning in Fragmented Software',
    subtext: 'The average hotel manages 6–10 vendors. The result is revenue leakage, fragmented guest data, OTA dependency and zero unified view of your business.',
    cards: [
      { title: '20–25% OTA Commission', desc: 'On every OTA booking. ₹18–27 Cr drained annually across a 7-property chain.' },
      { title: 'Zero Guest Data', desc: 'OTA bookings bring zero first-party data. You cannot identify, segment or re-market to past guests.' },
      { title: 'Invisible on Google', desc: 'No Google Hotel Ads. Weak SEO. Competitors own the discovery moment you are paying to build.' },
      { title: 'No Payment Control', desc: 'Third-party checkout kills conversion. No UPI, EMI, wallets or abandoned cart recovery.' },
      { title: 'No Upsell Revenue', desc: 'OTAs capture the checkout. Room upgrades, F&B, spa packages — lost to the platform.' },
      { title: 'Manual OTA Sync', desc: 'Rate parity violations. Overbookings. Inventory lag across MakeMyTrip, Goibibo, Booking.com.' },
    ],
  },

  platform: {
    section_label: 'The Platform',
    headline: 'One Platform. Every Hotel Operation.',
    subtext: 'Replace 6–10 vendors with a single stack built for Indian hotels — UPI, GST, Razorpay and the OTA ecosystem included.',
    modules: [
      { title: 'Booking Engine', phase: 'Phase 1', desc: 'Native widget on your website. Zero redirect. Chain booking, dynamic pricing, upsell at checkout.', features: ['No OTA redirect', 'Chain booking for all properties', 'Dynamic pricing and promos', 'Abandoned cart recovery'] },
      { title: 'Payments', phase: 'Phase 1', desc: 'UPI, Cards, Net Banking, Wallets, EMI. Branded checkout. T+1 settlement. Auto GST invoices.', features: ['UPI, Wallets, EMI support', 'Branded checkout page', 'T+1 direct settlement', 'Auto GST invoicing'] },
      { title: 'CRM and Guest Intel', phase: 'Phase 1', desc: 'Unified guest profiles across all properties. WhatsApp automation, loyalty, pre-arrival upsell.', features: ['Unified guest profiles', 'WhatsApp and email automation', 'Segmentation and loyalty', 'Pre-arrival upsell flows'] },
      { title: 'Hotel PMS', phase: 'Phase 2', desc: 'Reservations, front desk, housekeeping, maintenance and cross-property reporting in one dashboard.', features: ['Reservations and front desk', 'Housekeeping workflow', 'Cross-property reporting', 'Staff task management'] },
      { title: 'Channel Manager', phase: 'Phase 2', desc: 'Real-time 2-way OTA sync in under 5 seconds. Rate parity alerts. Revenue-optimised inventory.', features: ['Under 5 sec OTA sync', 'Rate parity enforcement', 'Inventory allocation control', 'All major OTAs supported'] },
      { title: 'Growth Marketing', phase: 'Phase 3', desc: 'Google Hotel Ads, Local SEO, Meta retargeting and WhatsApp broadcast — all managed for you.', features: ['Google Hotel Ads setup', 'Local SEO for all properties', 'Meta retargeting campaigns', 'WhatsApp broadcast'] },
    ],
  },

  why: {
    section_label: 'Why StayFlo',
    headline: 'Built for Indian Hotels. Not Adapted for Them.',
    subtext: "Global hotel software was not designed for UPI payments, OTA-first markets, GST compliance or the Indian property chain model. StayFlo is.",
    points: [
      { title: 'One Vendor Instead of Ten', desc: 'Booking engine, payments, CRM, PMS, channel manager, marketing — all connected, all from us.' },
      { title: 'Payments-First Design', desc: "UPI, Razorpay, GST invoicing, T+1 settlement, EMI. Built for India's mobile-first payment landscape." },
      { title: 'Own Your Guest Relationship', desc: 'First-party data, WhatsApp automation, loyalty — the guest relationship belongs to your hotel, not the OTA.' },
    ],
    roi_title: 'The Business Case for StayFlo',
    roi_rows: [
      { metric: '₹3–5 Cr', label: 'Year 1 commission savings', sub: 'Shifting 15% of bookings from OTAs to direct' },
      { metric: '22%', label: 'Direct booking conversion uplift', sub: 'Industry average replacing 3rd-party engines' },
      { metric: '2.4×', label: 'Repeat guest rate with CRM', sub: 'vs baseline without guest data management' },
      { metric: '₹180', label: 'Cost per direct booking', sub: 'vs ₹1,800–4,500 via OTA after commission' },
      { metric: '7 → 15', label: 'Properties on one stack', sub: 'StayFlo scales with your pipeline' },
    ],
  },

  services: {
    section_label: 'Services',
    headline: 'Everything Your Hotel Needs to Grow',
    subtext: "From setup to ongoing growth — StayFlo's team handles implementation, training and marketing so your team can focus on guests.",
    cards: [
      { title: 'Hotel Website Development', desc: 'Speed-optimised, SEO-ready hotel websites that convert visitors into direct bookers.' },
      { title: 'OTA Integration', desc: 'Connect to MakeMyTrip, Goibibo, Booking.com, Expedia and manage from one dashboard.' },
      { title: 'Payment Gateway Setup', desc: 'Razorpay / PayU with UPI, cards, wallets, EMI and auto GST invoicing.' },
      { title: 'Google Hotel Ads', desc: 'Get your direct rates on Google Search alongside OTAs — at a fraction of the cost per booking.' },
      { title: 'SEO and Content Marketing', desc: 'Rank for "hotels in [city]" searches. Destination content that drives organic intent traffic.' },
      { title: 'Social Media Marketing', desc: 'Instagram, Facebook retargeting, WhatsApp broadcast and influencer programmes.' },
    ],
  },

  roadmap: {
    section_label: 'Roadmap',
    headline: 'From Gap to Growth: 12 Months',
    phases: [
      { phase: 'Phase 1', timeline: 'Month 1–3', note: 'Live in 3–4 weeks', items: ['Booking Engine (Native StayFlo)', 'Payment Gateway (Razorpay/PayU)', 'CRM Setup and Guest Import', 'Brand Website Audit and Fix'] },
      { phase: 'Phase 2', timeline: 'Month 3–6', note: 'Full-stack control', items: ['Hotel PMS Deployment', 'Channel Manager and OTA Sync', 'Rate Parity Dashboard', 'Staff Training and Onboarding'] },
      { phase: 'Phase 3', timeline: 'Month 6–12', note: 'Top-of-funnel ownership', items: ['Google Hotel Ads Launch', 'Social Media Marketing', 'SEO and Content Engine', 'Loyalty and CRM Automation'] },
    ],
  },

  cta: {
    section_label: 'Get Started',
    headline_line1: 'Your Brand Is Too Strong',
    headline_line2: 'to Let OTAs Own',
    headline_accent: 'Your Guests.',
    subtext: 'Start with the Booking Engine. See direct bookings climb in 30 days. Build the full stack at your pace.',
    cta_demo: 'Book a Demo',
    cta_audit: 'Free Tech Audit',
    steps: [
      { num: '01', title: 'Demo Call', sub: 'Live walkthrough — book this week' },
      { num: '02', title: 'Tech Audit', sub: '30-min deep dive of your stack' },
      { num: '03', title: 'Proposal', sub: 'Custom pricing within 48 hours' },
      { num: '04', title: 'Go Live', sub: 'In 3–4 weeks with our team' },
    ],
  },

  footer: {
    tagline: 'Your Full-Stack Hotel Tech Partner',
    copyright: '© 2026 StayFlo. All Rights Reserved.',
  },
};

export type SiteContent = typeof DEFAULT_CONTENT;
