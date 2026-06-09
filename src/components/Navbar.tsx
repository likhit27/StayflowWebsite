import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import type { FormType } from '../types';

interface NavbarProps {
  onCTA: (type: FormType) => void;
}

export default function Navbar({ onCTA }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { label: 'Platform', href: '#platform' },
    { label: 'Services', href: '#services' },
    { label: 'Why StayFlow', href: '#why' },
    { label: 'Roadmap', href: '#roadmap' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
      background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid #F3F4F6' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            width: 36, height: 36, background: '#FFCE00', borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18,
          }}>🏨</span>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 22, color: '#0A0A0A' }}>
            StayFlow
          </span>
        </a>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="desktop-nav">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} style={{ textDecoration: 'none', color: '#374151', fontSize: 14, fontWeight: 500, transition: 'color 0.2s' }}>
              {link.label}
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="desktop-nav">
          <button
            onClick={() => onCTA('audit')}
            style={{ padding: '9px 18px', border: '1.5px solid #E5E7EB', borderRadius: 9, background: 'white', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif', color: '#374151' }}
          >
            Free Audit
          </button>
          <button
            onClick={() => onCTA('demo')}
            style={{ padding: '10px 20px', background: '#FFCE00', border: 'none', borderRadius: 9, cursor: 'pointer', fontSize: 13, fontWeight: 700, fontFamily: 'Inter, sans-serif', color: '#0A0A0A' }}
          >
            Book a Demo →
          </button>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn" style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: '#FFFFFF', borderTop: '1px solid #F3F4F6', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', color: '#374151', fontSize: 15, fontWeight: 500 }}>
              {link.label}
            </a>
          ))}
          <button onClick={() => { onCTA('demo'); setMenuOpen(false); }} style={{ padding: '13px', background: '#FFCE00', border: 'none', borderRadius: 10, cursor: 'pointer', fontSize: 15, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>
            Book a Demo
          </button>
          <button onClick={() => { onCTA('audit'); setMenuOpen(false); }} style={{ padding: '13px', background: '#F9FAFB', border: '1.5px solid #E5E7EB', borderRadius: 10, cursor: 'pointer', fontSize: 15, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
            Free Audit
          </button>
        </div>
      )}
    </nav>
  );
}
