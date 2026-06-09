import { useState } from 'react';
import Navbar from './components/Navbar';
import DemoForm from './components/DemoForm';
import type { FormType } from './types';
import { ArrowRight, CheckCircle, ChevronRight } from 'lucide-react';

const displayHead = (size: string, mb = 16): React.CSSProperties => ({
  fontFamily: "'Barlow Condensed', sans-serif",
  fontWeight: 900, textTransform: 'uppercase' as const,
  letterSpacing: '-0.5px', lineHeight: 0.95,
  fontSize: size, marginBottom: mb, color: '#0A0A0A',
});

const sectionLabel: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, letterSpacing: 3,
  textTransform: 'uppercase', color: '#9CA3AF',
  marginBottom: 14, fontFamily: 'Barlow, sans-serif', display: 'block',
};

const bodyText: React.CSSProperties = {
  fontSize: 16, color: '#6B7280', lineHeight: 1.75, fontFamily: 'Inter, sans-serif',
};

const yellowBtn: React.CSSProperties = {
  padding: '14px 28px', background: '#FFCE00', border: 'none', borderRadius: 8,
  fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'Barlow, sans-serif',
  color: '#0A0A0A', letterSpacing: 0.5, textTransform: 'uppercase' as const,
  display: 'inline-flex', alignItems: 'center', gap: 8,
};

const darkBtn: React.CSSProperties = {
  padding: '14px 28px', background: '#0F1B2D', border: 'none', borderRadius: 8,
  fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'Barlow, sans-serif',
  color: '#FFFFFF', letterSpacing: 0.5, textTransform: 'uppercase' as const,
};

const outlineBtn: React.CSSProperties = {
  ...darkBtn, background: 'transparent',
  border: '1.5px solid rgba(255,255,255,0.25)',
};

export default function App() {
  const [formType, setFormType] = useState<FormType>(null);
  const open  = (type: FormType) => setFormType(type);
  const close = () => setFormType(null);

  return (
    <div style={{ background: '#FFFFFF', color: '#0A0A0A' }}>
      <Navbar onCTA={open} />
      {formType && <DemoForm type={formType} onClose={close} />}

      {/* HERO */}
      <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: '7%', paddingRight: '7%', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#FFF9E0', border: '1px solid #FFCE00', borderRadius: 100, padding: '5px 14px', marginBottom: 32 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#FFCE00', display: 'block' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#92780A', letterSpacing: 1.5, textTransform: 'uppercase', fontFamily: 'Barlow, sans-serif' }}>
              India's Hotel Tech Platform
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,0.9fr)', gap: 64, alignItems: 'center' }} className="hero-grid">
            <div>
              <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-1px', lineHeight: 0.92, fontSize: 'clamp(60px, 8vw, 100px)', color: '#0A0A0A', marginBottom: 32 }}>
                Stop Losing<br />Revenue<br /><span style={{ color: '#FFCE00' }}>to OTAs.</span>
              </h1>
              <p style={{ ...bodyText, maxWidth: 480, marginBottom: 36 }}>
                StayFlow gives Indian hotels a complete tech stack — Booking Engine, Payments, CRM, PMS, Channel Manager and Growth Marketing — from one platform, at a fraction of the cost.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button onClick={() => open('demo')} style={yellowBtn}>Book a Demo <ArrowRight size={16} /></button>
                <button onClick={() => open('audit')} style={darkBtn}>Free Tech Audit</button>
              </div>
              <div style={{ display: 'flex', gap: 40, marginTop: 52, paddingTop: 40, borderTop: '1px solid #F3F4F6', flexWrap: 'wrap' }}>
                {[{ val: '₹3–5 Cr', label: 'OTA savings, Year 1' }, { val: '22%', label: 'Direct booking uplift' }, { val: '2.4×', label: 'Repeat guest rate' }].map(s => (
                  <div key={s.val}>
                    <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 32, color: '#0A0A0A', letterSpacing: -0.5 }}>{s.val}</p>
                    <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2, fontFamily: 'Inter, sans-serif' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#0F1B2D', borderRadius: 20, padding: '28px 28px 24px', boxShadow: '0 32px 80px rgba(15,27,45,0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
                <span style={{ color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter, sans-serif' }}>Live Dashboard</span>
                <span style={{ background: '#22C55E', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 100, fontFamily: 'Barlow, sans-serif', letterSpacing: 1 }}>LIVE</span>
              </div>
              {[
                { label: 'Direct Bookings Today', val: '₹1,84,000', change: '+18%' },
                { label: 'OTA Commission Saved',  val: '₹42,600',   change: 'vs last week' },
                { label: 'Occupancy Rate',        val: '87%',       change: '+6pp' },
                { label: 'Revenue Per Guest',     val: '₹8,450',    change: '+12%' },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: '#9CA3AF', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>{row.label}</span>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 700, fontFamily: 'Barlow, sans-serif' }}>{row.val}</p>
                    <p style={{ color: '#22C55E', fontSize: 11, marginTop: 1, fontFamily: 'Inter, sans-serif' }}>▲ {row.change}</p>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 20, background: '#FFCE00', borderRadius: 10, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: '#0A0A0A', fontFamily: 'Barlow, sans-serif' }}>This Month's Savings</span>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 900, color: '#0A0A0A' }}>₹12.4L</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section style={{ background: '#F9FAFB', padding: '90px 7%' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <span style={sectionLabel}>The Problem</span>
          <h2 style={{ ...displayHead('clamp(36px, 5vw, 60px)', 14), maxWidth: 640 }}>
            Hotels Are Drowning in<br />Fragmented Software
          </h2>
          <p style={{ ...bodyText, maxWidth: 560, marginBottom: 56 }}>
            The average hotel manages 6–10 vendors. The result is revenue leakage, fragmented guest data, OTA dependency and zero unified view of your business.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: '#E5E7EB' }} className="problem-grid">
            {[
              { title: '20–25% OTA Commission', desc: 'On every OTA booking. ₹18–27 Cr drained annually across a 7-property chain.' },
              { title: 'Zero Guest Data',        desc: 'OTA bookings bring zero first-party data. You cannot identify, segment or re-market to past guests.' },
              { title: 'Invisible on Google',    desc: 'No Google Hotel Ads. Weak SEO. Competitors own the discovery moment you are paying to build.' },
              { title: 'No Payment Control',     desc: 'Third-party checkout kills conversion. No UPI, EMI, wallets or abandoned cart recovery.' },
              { title: 'No Upsell Revenue',      desc: 'OTAs capture the checkout. Room upgrades, F&B, spa packages — lost to the platform.' },
              { title: 'Manual OTA Sync',        desc: 'Rate parity violations. Overbookings. Inventory lag across MakeMyTrip, Goibibo, Booking.com.' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#FFFFFF', padding: '28px 24px' }}>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 18, textTransform: 'uppercase', letterSpacing: 0.3, marginBottom: 10 }}>{item.title}</p>
                <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.65, fontFamily: 'Inter, sans-serif' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORM */}
      <section id="platform" style={{ background: '#0F1B2D', padding: '90px 7%' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <span style={{ ...sectionLabel, color: '#FFCE00' }}>The Platform</span>
          <h2 style={{ ...displayHead('clamp(36px, 5vw, 60px)', 14), color: '#FFFFFF', maxWidth: 640 }}>
            One Platform.<br />Every Hotel Operation.
          </h2>
          <p style={{ ...bodyText, color: '#6B7280', maxWidth: 540, marginBottom: 56 }}>
            Replace 6–10 vendors with a single stack built for Indian hotels — UPI, GST, Razorpay and the OTA ecosystem included.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="platform-grid">
            {[
              { title: 'Booking Engine',     phase: 'Phase 1', desc: 'Native widget on your website. Zero redirect. Chain booking, dynamic pricing, upsell at checkout.', features: ['No OTA redirect', 'Chain booking for all properties', 'Dynamic pricing and promos', 'Abandoned cart recovery'] },
              { title: 'Payments',           phase: 'Phase 1', desc: 'UPI, Cards, Net Banking, Wallets, EMI. Branded checkout. T+1 settlement. Auto GST invoices.', features: ['UPI, Wallets, EMI support', 'Branded checkout page', 'T+1 direct settlement', 'Auto GST invoicing'] },
              { title: 'CRM and Guest Intel',phase: 'Phase 1', desc: 'Unified guest profiles across all properties. WhatsApp automation, loyalty, pre-arrival upsell.', features: ['Unified guest profiles', 'WhatsApp and email automation', 'Segmentation and loyalty', 'Pre-arrival upsell flows'] },
              { title: 'Hotel PMS',          phase: 'Phase 2', desc: 'Reservations, front desk, housekeeping, maintenance and cross-property reporting in one dashboard.', features: ['Reservations and front desk', 'Housekeeping workflow', 'Cross-property reporting', 'Staff task management'] },
              { title: 'Channel Manager',    phase: 'Phase 2', desc: 'Real-time 2-way OTA sync in under 5 seconds. Rate parity alerts. Revenue-optimised inventory.', features: ['Under 5 sec OTA sync', 'Rate parity enforcement', 'Inventory allocation control', 'All major OTAs supported'] },
              { title: 'Growth Marketing',   phase: 'Phase 3', desc: 'Google Hotel Ads, Local SEO, Meta retargeting and WhatsApp broadcast — all managed for you.', features: ['Google Hotel Ads setup', 'Local SEO for all properties', 'Meta retargeting campaigns', 'WhatsApp broadcast'] },
            ].map((item, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '26px 22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 18, textTransform: 'uppercase', letterSpacing: 0.3, color: '#FFFFFF' }}>{item.title}</p>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: '#FFCE00', background: 'rgba(255,206,0,0.1)', padding: '4px 10px', borderRadius: 100, fontFamily: 'Barlow, sans-serif', whiteSpace: 'nowrap', marginLeft: 10 }}>{item.phase}</span>
                </div>
                <p style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.65, marginBottom: 18, fontFamily: 'Inter, sans-serif' }}>{item.desc}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {item.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: '#D1D5DB', fontFamily: 'Inter, sans-serif' }}>
                      <CheckCircle size={13} color="#22C55E" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 1 }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY STAYFLO */}
      <section id="why" style={{ background: '#FFFFFF', padding: '90px 7%' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }} className="why-grid">
            <div>
              <span style={sectionLabel}>Why StayFlow</span>
              <h2 style={{ ...displayHead('clamp(36px, 4vw, 52px)', 20), maxWidth: 480 }}>
                Built for Indian Hotels.<br />Not Adapted for Them.
              </h2>
              <p style={{ ...bodyText, marginBottom: 40 }}>
                Global hotel software was not designed for UPI payments, OTA-first markets, GST compliance or the Indian property chain model. StayFlow is.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {[
                  { title: 'One Vendor Instead of Ten',   desc: 'Booking engine, payments, CRM, PMS, channel manager, marketing — all connected, all from us.' },
                  { title: 'Payments-First Design',       desc: 'UPI, Razorpay, GST invoicing, T+1 settlement, EMI. Built for India\'s mobile-first payment landscape.' },
                  { title: 'Own Your Guest Relationship', desc: 'First-party data, WhatsApp automation, loyalty — the guest relationship belongs to your hotel, not the OTA.' },
                ].map(item => (
                  <div key={item.title} style={{ display: 'flex', gap: 16 }}>
                    <div style={{ width: 4, background: '#FFCE00', borderRadius: 4, flexShrink: 0 }} />
                    <div>
                      <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 800, fontSize: 15, marginBottom: 5 }}>{item.title}</p>
                      <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.65, fontFamily: 'Inter, sans-serif' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#F9FAFB', borderRadius: 16, padding: '32px 28px', border: '1px solid #F3F4F6' }}>
              <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 800, fontSize: 14, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 28 }}>
                The Business Case for StayFlow
              </p>
              {[
                { metric: '₹3–5 Cr', label: 'Year 1 commission savings',       sub: 'Shifting 15% of bookings from OTAs to direct' },
                { metric: '22%',     label: 'Direct booking conversion uplift', sub: 'Industry average replacing 3rd-party engines' },
                { metric: '2.4×',    label: 'Repeat guest rate with CRM',       sub: 'vs baseline without guest data management' },
                { metric: '₹180',    label: 'Cost per direct booking',          sub: 'vs ₹1,800–4,500 via OTA after commission' },
                { metric: '7 → 15',  label: 'Properties on one stack',          sub: 'StayFlow scales with your pipeline' },
              ].map(row => (
                <div key={row.metric} style={{ display: 'flex', gap: 16, marginBottom: 18, paddingBottom: 18, borderBottom: '1px solid #F3F4F6' }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 900, color: '#0A0A0A', minWidth: 80, lineHeight: 1, paddingTop: 2 }}>{row.metric}</div>
                  <div>
                    <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 700, fontSize: 14 }}>{row.label}</p>
                    <p style={{ color: '#9CA3AF', fontSize: 12, marginTop: 3, fontFamily: 'Inter, sans-serif' }}>{row.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ background: '#F9FAFB', padding: '90px 7%' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <span style={sectionLabel}>Services</span>
          <h2 style={{ ...displayHead('clamp(36px, 4vw, 52px)', 14), maxWidth: 560 }}>
            Everything Your Hotel<br />Needs to Grow
          </h2>
          <p style={{ ...bodyText, maxWidth: 520, marginBottom: 56 }}>
            From setup to ongoing growth — StayFlow's team handles implementation, training and marketing so your team can focus on guests.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="services-grid">
            {[
              { title: 'Hotel Website Development', desc: 'Speed-optimised, SEO-ready hotel websites that convert visitors into direct bookers.' },
              { title: 'OTA Integration',           desc: 'Connect to MakeMyTrip, Goibibo, Booking.com, Expedia and manage from one dashboard.' },
              { title: 'Payment Gateway Setup',     desc: 'Razorpay / PayU with UPI, cards, wallets, EMI and auto GST invoicing.' },
              { title: 'Google Hotel Ads',          desc: 'Get your direct rates on Google Search alongside OTAs — at a fraction of the cost per booking.' },
              { title: 'SEO and Content Marketing', desc: 'Rank for "hotels in [city]" searches. Destination content that drives organic intent traffic.' },
              { title: 'Social Media Marketing',    desc: 'Instagram, Facebook retargeting, WhatsApp broadcast and influencer programmes.' },
            ].map(item => (
              <div key={item.title} style={{ background: '#FFFFFF', borderRadius: 12, padding: '24px 22px', border: '1px solid #F3F4F6' }}>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 17, textTransform: 'uppercase', letterSpacing: 0.3, marginBottom: 8 }}>{item.title}</p>
                <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.65, fontFamily: 'Inter, sans-serif' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" style={{ background: '#FFFFFF', padding: '90px 7%' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <span style={sectionLabel}>Roadmap</span>
          <h2 style={{ ...displayHead('clamp(36px, 4vw, 52px)', 56) }}>
            From Gap to Growth:<br />12 Months
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="roadmap-grid">
            {[
              { phase: 'Phase 1', timeline: 'Month 1–3', note: 'Live in 3–4 weeks', bg: '#FFCE00', text: '#0A0A0A', sub: '#374151', items: ['Booking Engine (Native StayFlow)', 'Payment Gateway (Razorpay/PayU)', 'CRM Setup and Guest Import', 'Brand Website Audit and Fix'] },
              { phase: 'Phase 2', timeline: 'Month 3–6', note: 'Full-stack control',  bg: '#0F1B2D', text: '#FFFFFF', sub: '#9CA3AF', items: ['Hotel PMS Deployment', 'Channel Manager and OTA Sync', 'Rate Parity Dashboard', 'Staff Training and Onboarding'] },
              { phase: 'Phase 3', timeline: 'Month 6–12', note: 'Top-of-funnel ownership', bg: '#F9FAFB', text: '#0A0A0A', sub: '#6B7280', items: ['Google Hotel Ads Launch', 'Social Media Marketing', 'SEO and Content Engine', 'Loyalty and CRM Automation'] },
            ].map(p => (
              <div key={p.phase} style={{ background: p.bg, borderRadius: 16, padding: '28px 24px', border: p.bg === '#F9FAFB' ? '1px solid #F3F4F6' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <div>
                    <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 22, textTransform: 'uppercase', color: p.text }}>{p.phase}</p>
                    <p style={{ fontSize: 12, color: p.sub, marginTop: 4, fontFamily: 'Inter, sans-serif' }}>{p.timeline}</p>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, opacity: 0.55, color: p.text, fontFamily: 'Inter, sans-serif', textAlign: 'right', marginLeft: 8 }}>{p.note}</span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {p.items.map(item => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: p.bg === '#0F1B2D' ? '#D1D5DB' : '#374151', fontFamily: 'Inter, sans-serif', lineHeight: 1.5 }}>
                      <ChevronRight size={14} style={{ flexShrink: 0, marginTop: 2, opacity: 0.6 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: '#0F1B2D', padding: '100px 7%', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <span style={{ ...sectionLabel, color: '#FFCE00' }}>Get Started</span>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(40px, 6vw, 68px)', lineHeight: 0.95, letterSpacing: -0.5, color: '#FFFFFF', marginBottom: 20 }}>
            Your Brand Is Too Strong<br />to Let OTAs Own<br /><span style={{ color: '#FFCE00' }}>Your Guests.</span>
          </h2>
          <p style={{ ...bodyText, color: '#6B7280', marginBottom: 48 }}>
            Start with the Booking Engine. See direct bookings climb in 30 days. Build the full stack at your pace.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => open('demo')} style={{ ...yellowBtn, padding: '16px 32px', fontSize: 15 }}>
              Book a Demo <ArrowRight size={17} />
            </button>
            <button onClick={() => open('audit')} style={{ ...outlineBtn, padding: '16px 32px', fontSize: 15 }}>
              Free Tech Audit
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24, marginTop: 72 }} className="steps-grid">
            {[
              { num: '01', title: 'Demo Call',  sub: 'Live walkthrough — book this week' },
              { num: '02', title: 'Tech Audit', sub: '30-min deep dive of your stack' },
              { num: '03', title: 'Proposal',   sub: 'Custom pricing within 48 hours' },
              { num: '04', title: 'Go Live',    sub: 'In 3–4 weeks with our team' },
            ].map(step => (
              <div key={step.num}>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 36, color: '#FFCE00', lineHeight: 1 }}>{step.num}</p>
                <p style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 800, fontSize: 14, color: '#FFFFFF', marginTop: 8, textTransform: 'uppercase', letterSpacing: 0.3 }}>{step.title}</p>
                <p style={{ fontSize: 12, color: '#6B7280', marginTop: 4, fontFamily: 'Inter, sans-serif', lineHeight: 1.5 }}>{step.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#0A0A0A', padding: '36px 7%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 30, height: 30, background: '#FFCE00', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 14, color: '#0A0A0A' }}>SF</span>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 18, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: 0.5 }}>StayFlow</span>
          <span style={{ color: '#374151', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>Your Full-Stack Hotel Tech Partner</span>
        </div>
        <p style={{ color: '#374151', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>© 2026 StayFlow. All Rights Reserved.</p>
      </footer>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid, .why-grid { grid-template-columns: 1fr !important; }
          .problem-grid, .platform-grid, .services-grid { grid-template-columns: 1fr 1fr !important; }
          .roadmap-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .problem-grid, .platform-grid, .services-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
