import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import type { FormType } from '../types';

interface NavbarProps {
  onCTA: (type: FormType) => void;
}

const NAV_LINKS = [
  { label: 'Platform', href: '#platform' },
  { label: 'Services', href: '#services' },
  { label: 'Why StayFlow', href: '#why' },
  { label: 'Roadmap', href: '#roadmap' },
];

export default function Navbar({ onCTA }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
      background: scrolled || menuOpen ? 'rgba(255,255,255,0.97)' : 'transparent',
      borderBottom: scrolled || menuOpen ? '1px solid #F3F4F6' : '1px solid transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      transition: 'all 0.25s',
    }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 32, height: 32, background: '#FFCE00', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 16, color: '#0A0A0A' }}>SF</span>
          <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 22, color: '#0A0A0A', letterSpacing: 0.5, textTransform: 'uppercase' }}>StayFlow</span>
        </a>

        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} style={{ fontSize: 14, fontWeight: 600, color: '#374151', fontFamily: 'Barlow, sans-serif' }}>{l.label}</a>
          ))}
        </div>

        <div className="desktop-nav" style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => onCTA('audit')} style={{ padding: '9px 18px', border: '1.5px solid #E5E7EB', borderRadius: 8, background: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 700, fontFamily: 'Barlow, sans-serif', color: '#374151' }}>
            Free Audit
          </button>
          <button onClick={() => onCTA('demo')} style={{ padding: '10px 20px', background: '#FFCE00', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 800, fontFamily: 'Barlow, sans-serif', color: '#0A0A0A' }}>
            Book a Demo
          </button>
        </div>

        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex' }}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div style={{ background: '#fff', borderTop: '1px solid #F3F4F6', padding: '16px 24px 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 20 }}>
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{ padding: '12px 0', fontSize: 16, fontWeight: 700, fontFamily: 'Barlow, sans-serif', borderBottom: '1px solid #F9FAFB' }}>{l.label}</a>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button onClick={() => { onCTA('demo'); setMenuOpen(false); }} style={{ padding: '14px', background: '#FFCE00', border: 'none', borderRadius: 10, cursor: 'pointer', fontSize: 15, fontWeight: 800, fontFamily: 'Barlow, sans-serif' }}>Book a Demo</button>
            <button onClick={() => { onCTA('audit'); setMenuOpen(false); }} style={{ padding: '14px', background: '#F9FAFB', border: '1.5px solid #E5E7EB', borderRadius: 10, cursor: 'pointer', fontSize: 15, fontWeight: 700, fontFamily: 'Barlow, sans-serif' }}>Free Audit</button>
          </div>
        </div>
      )}
    </nav>
  );
}
