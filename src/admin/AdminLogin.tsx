import React, { useState } from 'react';

interface Props { onLogin: () => void; }

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string;

export default function AdminLogin({ onLogin }: Props) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (pw === ADMIN_PASSWORD) {
        sessionStorage.setItem('sf_admin', 'true');
        onLogin();
      } else {
        setError('Incorrect password.');
        setLoading(false);
      }
    }, 400);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: '#fff', borderRadius: 16, padding: '40px 36px', width: '100%', maxWidth: 400, boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <span style={{ width: 36, height: 36, background: '#FFCE00', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 18 }}>SF</span>
          <div>
            <p style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 18, textTransform: 'uppercase' }}>StayFlow</p>
            <p style={{ fontSize: 12, color: '#9CA3AF' }}>Admin Panel</p>
          </div>
        </div>

        <h1 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 28, textTransform: 'uppercase', marginBottom: 8 }}>Sign In</h1>
        <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 28 }}>Enter your admin password to continue.</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 6, fontFamily: 'Barlow, sans-serif', letterSpacing: 1, textTransform: 'uppercase' }}>
              Password
            </label>
            <input
              type="password"
              value={pw}
              onChange={e => { setPw(e.target.value); setError(''); }}
              placeholder="Enter admin password"
              autoFocus
              style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #E5E7EB', borderRadius: 8, fontSize: 14, fontFamily: 'Inter, sans-serif', background: '#F9FAFB' }}
            />
          </div>
          {error && <p style={{ color: '#DC2626', fontSize: 13, background: '#FEF2F2', padding: '10px 14px', borderRadius: 8, border: '1px solid #FECACA' }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ padding: '14px', background: '#0F1B2D', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'Barlow, sans-serif', letterSpacing: 0.5, textTransform: 'uppercase', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Checking...' : 'Sign In'}
          </button>
        </form>

        <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 20, textAlign: 'center' }}>
          Set <code>VITE_ADMIN_PASSWORD</code> in your .env file.
        </p>
      </div>
    </div>
  );
}
