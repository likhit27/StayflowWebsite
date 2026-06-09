import { useState } from 'react';
import Navbar from './components/Navbar';
import DemoForm from './components/DemoForm';
import type { FormType } from './types';
import {
  ArrowRight, TrendingUp, Shield, Zap, BarChart3,
  CreditCard, Users, Building, Globe, Megaphone,
  CheckCircle, ChevronRight
} from 'lucide-react';

export default function App() {
  const [formType, setFormType] = useState<FormType>(null);

  const openForm = (type: FormType) => setFormType(type);
  const closeForm = () => setFormType(null);

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', color: '#0A0A0A', background: '#FFFFFF' }}>
      <Navbar onCTA={openForm} />
      {formType && <DemoForm type={formType} onClose={closeForm} />}

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '120px 8% 80px', background: '#FFFFFF', position: 'relative', overflow: 'hidden',
      }}>
        {/* Background grid accent */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(255,206,0,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#FFF9E0', border: '1px solid #FFCE00',
                borderRadius: 100, padding: '6px 14px', marginBottom: 24,
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#FFCE00', display: 'inline-block' }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#92780A', letterSpacing: 0.5 }}>India's Hotel Tech Platform</span>
              </div>

              <h1 style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 800,
                fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1.08, marginBottom: 24, color: '#0A0A0A',
              }}>
                Stop Losing Revenue<br />
                <span style={{ color: '#FFCE00', WebkitTextStroke: '2px #E6B800' }}>to OTAs.</span>
              </h1>

              <p style={{ fontSize: 18, color: '#4B5563', lineHeight: 1.7, marginBottom: 36, maxWidth: 500 }}>
                StayFlow gives Indian hotels a complete tech stack — Booking Engine, Payments, CRM, PMS, Channel Manager & Growth Marketing — from one platform, at a fraction of the cost.
              </p>

              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <button
                  onClick={() => openForm('demo')}
                  style={{
                    padding: '16px 28px', background: '#FFCE00', border: 'none',
                    borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif', color: '#0A0A0A',
                    display: 'flex', alignItems: 'center', gap: 8,
                    boxShadow: '0 4px 24px rgba(255,206,0,0.4)',
                  }}
                >
                  Book a Demo <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => openForm('audit')}
                  style={{
                    padding: '16px 28px', background: '#0F1B2D', border: 'none',
                    borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif', color: '#FFFFFF',
                  }}
                >
                  Free Tech Audit
                </button>
              </div>

              <div style={{ display: 'flex', gap: 32, marginTop: 48, paddingTop: 40, borderTop: '1px solid #F3F4F6' }}>
                {[
                  { val: '₹3–5 Cr', label: 'OTA savings, Year 1' },
                  { val: '22%', label: 'Direct booking uplift' },
                  { val: '2.4×', label: 'Repeat guest rate' },
                ].map(stat => (
                  <div key={stat.val}>
                    <p style={{ fontFamily: 'Syne, sans-serif', fontSize: 26, fontWeight: 800, color: '#0A0A0A' }}>{stat.val}</p>
                    <p style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual */}
            <div style={{ position: 'relative' }}>
              <div style={{
                background: '#0F1B2D', borderRadius: 24, padding: 32,
                boxShadow: '0 40px 100px rgba(15,27,45,0.25)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <span style={{ color: '#9CA3AF', fontSize: 13 }}>Live Dashboard</span>
                  <span style={{ background: '#22C55E', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100 }}>LIVE</span>
                </div>
                {[
                  { label: 'Direct Bookings Today', val: '₹1,84,000', change: '+18%', up: true },
                  { label: 'OTA Commission Saved', val: '₹42,600', change: 'vs last week', up: true },
                  { label: 'Occupancy Rate', val: '87%', change: '+6pp', up: true },
                  { label: 'Avg. Revenue / Guest', val: '₹8,450', change: '+12%', up: true },
                ].map(row => (
                  <div key={row.label} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
                  }}>
                    <span style={{ color: '#9CA3AF', fontSize: 13 }}>{row.label}</span>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 700 }}>{row.val}</p>
                      <p style={{ color: '#22C55E', fontSize: 11, marginTop: 2 }}>▲ {row.change}</p>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 24, background: '#FFCE00', borderRadius: 10, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: '#0A0A0A' }}>This Month's Savings</span>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 800, color: '#0A0A0A' }}>₹12.4L</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section style={{ background: '#F9FAFB', padding: '100px 8%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#9CA3AF', marginBottom: 16 }}>The Problem</p>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, marginBottom: 16, maxWidth: 700 }}>
            Hotels Are Drowning in Fragmented Software
          </h2>
          <p style={{ color: '#6B7280', fontSize: 16, maxWidth: 600, marginBottom: 60, lineHeight: 1.7 }}>
            The average hotel manages 6–10 vendors. The result? Revenue leakage, fragmented guest data, OTA dependency, and zero unified view of your business.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            {[
              { icon: '🏷️', title: '20–25% OTA Commission', desc: 'On every OTA booking. ₹18–27 Cr drained annually across a 7-property chain.' },
              { icon: '👤', title: 'Zero Guest Data', desc: 'OTA bookings bring zero first-party data. You cannot identify, segment, or re-market to past guests.' },
              { icon: '🔍', title: 'Invisible on Google', desc: 'No Google Hotel Ads. Weak SEO. Competitors own the discovery moment you\'re paying to build.' },
              { icon: '💳', title: 'No Payment Control', desc: 'Third-party checkout kills conversion. No UPI, EMI, wallets, or abandoned cart recovery.' },
              { icon: '📦', title: 'No Upsell Revenue', desc: 'OTAs capture the checkout. Room upgrades, F&B, spa packages — lost to the platform.' },
              { icon: '🔀', title: 'Manual OTA Sync', desc: 'Rate parity violations. Overbookings. Inventory lag across MakeMyTrip, Goibibo, Booking.com.' },
            ].map((item, i) => (
              <div key={i} style={{
                background: '#FFFFFF', padding: '28px 24px',
                border: '1px solid #F3F4F6',
              }}>
                <span style={{ fontSize: 28, display: 'block', marginBottom: 14 }}>{item.icon}</span>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORM ── */}
      <section id="platform" style={{ background: '#0F1B2D', padding: '100px 8%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#FFCE00', marginBottom: 16, opacity: 0.8 }}>The Platform</p>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#FFFFFF', marginBottom: 16, maxWidth: 700 }}>
            One Platform. Every Hotel Operation.
          </h2>
          <p style={{ color: '#6B7280', fontSize: 16, maxWidth: 600, marginBottom: 64, lineHeight: 1.7 }}>
            Replace 6–10 vendors with a single stack built for Indian hotels — UPI, GST, Razorpay, OTA ecosystem and all.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              {
                icon: <Globe size={22} color="#FFCE00" />,
                title: 'Booking Engine',
                badge: 'Phase 1',
                desc: 'Native widget on your website. Zero redirect. Chain booking, dynamic pricing, upsell at checkout. 100% booking data owned by you.',
                features: ['No OTA redirect', 'Chain booking for all properties', 'Dynamic pricing & promos', 'Abandoned cart recovery'],
              },
              {
                icon: <CreditCard size={22} color="#FFCE00" />,
                title: 'Payments',
                badge: 'Phase 1',
                desc: 'UPI, Cards, Net Banking, Wallets, EMI. Branded checkout. T+1 settlement. Auto-generated GST invoices.',
                features: ['UPI, Wallets, EMI support', 'Branded checkout page', 'T+1 direct settlement', 'Auto GST invoicing'],
              },
              {
                icon: <Users size={22} color="#FFCE00" />,
                title: 'CRM & Guest Intelligence',
                badge: 'Phase 1',
                desc: 'Unified guest profiles across all properties. WhatsApp automation, loyalty, pre-arrival upsell, and post-stay re-marketing.',
                features: ['Unified guest profiles', 'WhatsApp & email automation', 'Segmentation & loyalty', 'Pre-arrival upsell flows'],
              },
              {
                icon: <Building size={22} color="#FFCE00" />,
                title: 'Hotel PMS',
                badge: 'Phase 2',
                desc: 'Reservations, front desk, housekeeping, maintenance and cross-property reporting — all in one dashboard.',
                features: ['Reservations & front desk', 'Housekeeping workflow', 'Cross-property reporting', 'Staff task management'],
              },
              {
                icon: <BarChart3 size={22} color="#FFCE00" />,
                title: 'Channel Manager',
                badge: 'Phase 2',
                desc: 'Real-time 2-way OTA sync in under 5 seconds. Rate parity alerts. Inventory allocation optimised for revenue.',
                features: ['<5 sec OTA sync', 'Rate parity enforcement', 'Inventory allocation control', 'MakeMyTrip, Booking.com, Expedia'],
              },
              {
                icon: <Megaphone size={22} color="#FFCE00" />,
                title: 'Growth Marketing',
                badge: 'Phase 3',
                desc: 'Google Hotel Ads, Local SEO, Social Media retargeting, and WhatsApp broadcast campaigns — all managed for you.',
                features: ['Google Hotel Ads setup', 'Local SEO for all properties', 'Meta retargeting campaigns', 'WhatsApp broadcast'],
              },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 16, padding: '28px 24px',
                transition: 'border-color 0.2s',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{ width: 42, height: 42, background: 'rgba(255,206,0,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.icon}
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: '#FFCE00', opacity: 0.7, background: 'rgba(255,206,0,0.1)', padding: '4px 10px', borderRadius: 100 }}>
                    {item.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#FFFFFF', marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.6, marginBottom: 18 }}>{item.desc}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {item.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#D1D5DB' }}>
                      <CheckCircle size={13} color="#22C55E" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY STAYFLO ── */}
      <section id="why" style={{ padding: '100px 8%', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#9CA3AF', marginBottom: 16 }}>Why StayFlow</p>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 800, marginBottom: 24 }}>
                Built for Indian Hotels. Not Adapted for Them.
              </h2>
              <p style={{ color: '#6B7280', fontSize: 16, lineHeight: 1.7, marginBottom: 40 }}>
                Global hotel software wasn't designed for UPI payments, OTA-first markets, GST compliance, or the Indian property chain model. StayFlow is.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { icon: <Zap size={18} color="#FFCE00" />, title: 'One Vendor Instead of Ten', desc: 'Booking engine, payments, CRM, PMS, channel manager, marketing — all connected, all from us.' },
                  { icon: <Shield size={18} color="#FFCE00" />, title: 'Payments-First DNA', desc: 'UPI, Razorpay, GST invoicing, T+1 settlement, EMI. Designed for India\'s mobile-first payment landscape.' },
                  { icon: <TrendingUp size={18} color="#FFCE00" />, title: 'Own Your Guest Relationship', desc: 'First-party data, WhatsApp automation, loyalty — OTAs never touched it.' },
                ].map(item => (
                  <div key={item.title} style={{ display: 'flex', gap: 16 }}>
                    <div style={{ width: 40, height: 40, background: '#FFF9E0', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.title}</p>
                      <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ROI Card */}
            <div style={{ background: '#F9FAFB', borderRadius: 20, padding: 36, border: '1px solid #F3F4F6' }}>
              <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 28 }}>The Business Case for StayFlow</p>
              {[
                { metric: '₹3–5 Cr', label: 'Year 1 commission savings', sub: 'Shifting 15% of bookings from OTAs to direct' },
                { metric: '↑ 22%', label: 'Direct booking conversion uplift', sub: 'Industry average replacing 3rd-party engines' },
                { metric: '2.4×', label: 'Repeat guest rate with CRM', sub: 'vs baseline without guest data management' },
                { metric: '₹180', label: 'Cost per direct booking', sub: 'vs ₹1,800–4,500 via OTA after commission' },
                { metric: '7 → 15', label: 'Properties served by one stack', sub: 'StayFlow scales with your pipeline' },
              ].map(row => (
                <div key={row.metric} style={{ display: 'flex', gap: 20, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid #F3F4F6' }}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, color: '#0A0A0A', minWidth: 90 }}>{row.metric}</div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 14 }}>{row.label}</p>
                    <p style={{ color: '#9CA3AF', fontSize: 12, marginTop: 3 }}>{row.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ background: '#F9FAFB', padding: '100px 8%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#9CA3AF', marginBottom: 16 }}>Services</p>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, marginBottom: 16 }}>
            Everything Your Hotel Needs to Grow
          </h2>
          <p style={{ color: '#6B7280', fontSize: 16, maxWidth: 600, marginBottom: 60, lineHeight: 1.7 }}>
            From setup to ongoing growth — StayFlow's team handles implementation, training, and marketing so your team can focus on guests.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { icon: '🌐', title: 'Hotel Website Development', desc: 'Speed-optimised, SEO-ready hotel websites that convert visitors into direct bookers.' },
              { icon: '🔗', title: 'OTA Integration & Management', desc: 'Connect to MakeMyTrip, Goibibo, Booking.com, Expedia and manage from one dashboard.' },
              { icon: '💳', title: 'Payment Gateway Setup', desc: 'Razorpay / PayU integration with UPI, cards, wallets, EMI and GST invoicing.' },
              { icon: '📢', title: 'Google Hotel Ads', desc: 'Get your direct rates on Google Search alongside OTAs — at 10× lower cost per booking.' },
              { icon: '🔍', title: 'SEO & Content Marketing', desc: 'Rank for "hotels in [city]" searches. Destination content that drives organic intent traffic.' },
              { icon: '📱', title: 'Social Media Marketing', desc: 'Instagram, Facebook retargeting, WhatsApp broadcast, influencer & UGC programmes.' },
            ].map(item => (
              <div key={item.title} style={{ background: '#FFFFFF', borderRadius: 14, padding: '24px 22px', border: '1px solid #F3F4F6' }}>
                <span style={{ fontSize: 30, display: 'block', marginBottom: 14 }}>{item.icon}</span>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROADMAP ── */}
      <section id="roadmap" style={{ padding: '100px 8%', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#9CA3AF', marginBottom: 16 }}>Implementation Roadmap</p>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, marginBottom: 60 }}>
            From Gap to Growth: 12 Months
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              {
                phase: 'Phase 1', timeline: 'Month 1–3',
                color: '#FFCE00', textColor: '#0A0A0A',
                items: ['Booking Engine (Native StayFlow)', 'Payment Gateway (Razorpay/PayU)', 'CRM Setup & Guest Import', 'Brand Website Audit & Fix'],
                note: 'Live in 3–4 weeks',
              },
              {
                phase: 'Phase 2', timeline: 'Month 3–6',
                color: '#0F1B2D', textColor: '#FFFFFF',
                items: ['Hotel PMS Deployment', 'Channel Manager & OTA Sync', 'Rate Parity Dashboard', 'Staff Training & Onboarding'],
                note: 'Full-stack control',
              },
              {
                phase: 'Phase 3', timeline: 'Month 6–12',
                color: '#F9FAFB', textColor: '#0A0A0A',
                items: ['Google Hotel Ads Launch', 'Social Media Marketing', 'SEO & Content Engine', 'Loyalty & CRM Automation'],
                note: 'Top-of-funnel ownership',
              },
            ].map(phase => (
              <div key={phase.phase} style={{ background: phase.color, borderRadius: 20, padding: '32px 28px', border: phase.color === '#F9FAFB' ? '1px solid #F3F4F6' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <div>
                    <p style={{ fontSize: 20, fontFamily: 'Syne, sans-serif', fontWeight: 800, color: phase.textColor }}>{phase.phase}</p>
                    <p style={{ fontSize: 13, color: phase.color === '#0F1B2D' ? '#9CA3AF' : '#6B7280', marginTop: 4 }}>{phase.timeline}</p>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, opacity: 0.6, color: phase.textColor }}>{phase.note}</span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {phase.items.map(item => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: phase.color === '#0F1B2D' ? '#D1D5DB' : '#374151', fontWeight: 500 }}>
                      <ChevronRight size={15} style={{ flexShrink: 0, marginTop: 2 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section style={{ background: '#0F1B2D', padding: '100px 8%', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#FFCE00', opacity: 0.7, marginBottom: 20 }}>Get Started</p>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#FFFFFF', marginBottom: 20, lineHeight: 1.15 }}>
            Your Brand Is Too Strong<br />to Let OTAs Own Your Guests.
          </h2>
          <p style={{ color: '#6B7280', fontSize: 16, lineHeight: 1.7, marginBottom: 48 }}>
            Start with the Booking Engine. See direct bookings climb in 30 days. Then build the full stack at your pace.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => openForm('demo')}
              style={{
                padding: '18px 36px', background: '#FFCE00', border: 'none', borderRadius: 12,
                fontSize: 17, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                color: '#0A0A0A', display: 'flex', alignItems: 'center', gap: 10,
                boxShadow: '0 8px 30px rgba(255,206,0,0.3)',
              }}
            >
              🎯 Book a Demo <ArrowRight size={18} />
            </button>
            <button
              onClick={() => openForm('audit')}
              style={{
                padding: '18px 36px', background: 'transparent',
                border: '1.5px solid rgba(255,255,255,0.2)',
                borderRadius: 12, fontSize: 17, fontWeight: 700, cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', color: '#FFFFFF',
              }}
            >
              🔍 Free Tech Audit
            </button>
          </div>

          <div style={{ display: 'flex', gap: 32, justifyContent: 'center', marginTop: 60 }}>
            {[
              { val: '01', title: 'Demo Call', desc: 'Live walkthrough — book this week' },
              { val: '02', title: 'Tech Audit', desc: '30-min deep dive of your stack' },
              { val: '03', title: 'Proposal', desc: 'Custom pricing within 48 hours' },
              { val: '04', title: 'Go Live', desc: 'In 3–4 weeks with our team' },
            ].map(step => (
              <div key={step.val} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 28, fontFamily: 'Syne, sans-serif', fontWeight: 800, color: '#FFCE00' }}>{step.val}</p>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#FFFFFF', marginTop: 6 }}>{step.title}</p>
                <p style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0A0A0A', padding: '48px 8%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 32, height: 32, background: '#FFCE00', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🏨</span>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 20, color: '#FFFFFF' }}>StayFlow</span>
          <span style={{ color: '#4B5563', fontSize: 13 }}>· Your Full-Stack Hotel Tech Partner</span>
        </div>
        <p style={{ color: '#4B5563', fontSize: 13 }}>© 2026 StayFlow. All Rights Reserved. Built for Indian Hotels.</p>
      </footer>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
        input:focus, select:focus {
          border-color: #FFCE00 !important;
          box-shadow: 0 0 0 3px rgba(255,206,0,0.12);
        }
        button:hover { opacity: 0.92; transform: translateY(-1px); transition: all 0.15s; }
      `}</style>
    </div>
  );
}
