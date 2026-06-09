import React, { useState } from 'react';
import { X, Calendar, Clock, User, Building2, Phone, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import type { FormData, FormType } from '../types';

interface DemoFormProps {
  type: FormType;
  onClose: () => void;
}

const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM',
];

// Credentials are loaded from environment variables (see .env.local or Vercel dashboard)
const NOTION_TOKEN = import.meta.env.VITE_NOTION_TOKEN as string;
const NOTION_DATABASE_ID = import.meta.env.VITE_NOTION_DATABASE_ID as string;
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN as string;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID as string;

async function submitToNotion(data: FormData, tag: string): Promise<void> {
  const body = {
    parent: { database_id: NOTION_DATABASE_ID },
    properties: {
      Name: { title: [{ text: { content: data.name } }] },
      Company: { rich_text: [{ text: { content: data.company } }] },
      Mobile: { phone_number: data.mobile },
      Email: { email: data.email },
      'Preferred Date': { date: { start: data.date } },
      'Time Slot': { select: { name: data.time } },
      Tag: { select: { name: tag } },
    },
  };

  const res = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Notion API error');
  }
}

async function sendTelegramMessage(data: FormData, tag: string): Promise<void> {
  const emoji = tag === 'Demo' ? '🎯' : '🔍';
  const text = `${emoji} *New ${tag} Request*\n\n👤 *Name:* ${data.name}\n🏢 *Company:* ${data.company}\n📱 *Mobile:* ${data.mobile}\n📧 *Email:* ${data.email}\n📅 *Date:* ${data.date}\n⏰ *Time:* ${data.time}\n\n#${tag.toLowerCase()} #stayflo`;

  const res = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'Markdown' }),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.description || 'Telegram API error');
  }
}

export default function DemoForm({ type, onClose }: DemoFormProps) {
  const isDemo = type === 'demo';
  const tag = isDemo ? 'Demo' : 'Audit';

  const [form, setForm] = useState<FormData>({
    name: '', company: '', mobile: '', email: '', date: '', time: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrorMsg('');
  };

  const validate = (): boolean => {
    if (!form.name.trim()) { setErrorMsg('Please enter your name.'); return false; }
    if (!form.company.trim()) { setErrorMsg('Please enter your company name.'); return false; }
    if (!/^\d{10}$/.test(form.mobile.replace(/\s/g, ''))) { setErrorMsg('Please enter a valid 10-digit mobile number.'); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setErrorMsg('Please enter a valid email address.'); return false; }
    if (!form.date) { setErrorMsg('Please select a preferred date.'); return false; }
    if (!form.time) { setErrorMsg('Please select a preferred time slot.'); return false; }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!validate()) return;
    setStatus('loading');
    try {
      await Promise.all([submitToNotion(form, tag), sendTelegramMessage(form, tag)]);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or email us directly.');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  const inputStyle: React.CSSProperties = {
    padding: '12px 14px', border: '1.5px solid #E5E7EB',
    borderRadius: 10, fontSize: 14, color: '#0A0A0A',
    outline: 'none', fontFamily: 'Inter, sans-serif',
    background: '#F9FAFB', width: '100%',
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000, padding: '20px', backdropFilter: 'blur(6px)',
      }}
    >
      <div style={{
        background: '#FFFFFF', borderRadius: 20, width: '100%', maxWidth: 680,
        maxHeight: '92vh', overflowY: 'auto',
        boxShadow: '0 30px 100px rgba(0,0,0,0.3)',
      }}>
        {/* Header */}
        <div style={{
          padding: '28px 32px',
          background: isDemo ? '#FFCE00' : '#0F1B2D',
          borderRadius: '20px 20px 0 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 8, color: isDemo ? 'rgba(0,0,0,0.5)' : '#FFCE00' }}>
              {isDemo ? '🎯 Free 30-Minute Demo' : '🔍 Free Tech Stack Audit'}
            </p>
            <h2 style={{ fontSize: 26, fontWeight: 800, fontFamily: 'Syne, sans-serif', color: isDemo ? '#0A0A0A' : '#FFFFFF' }}>
              {isDemo ? 'Book a Product Demo' : 'Request a Free Audit'}
            </h2>
            <p style={{ color: isDemo ? '#374151' : '#9CA3AF', fontSize: 13, marginTop: 6 }}>
              {isDemo ? 'Live walkthrough tailored to your hotel. No pitch, just the product.' : 'We audit your booking engine, OTA presence, payments & SEO — free.'}
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: isDemo ? '#0A0A0A' : '#FFFFFF', opacity: 0.6, padding: 4, marginTop: 2 }}>
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '28px 32px' }}>
          {status === 'success' ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px', gap: 10 }}>
              <CheckCircle size={60} color="#22C55E" strokeWidth={1.5} />
              <h3 style={{ fontSize: 22, fontWeight: 700, marginTop: 12 }}>You're on the list!</h3>
              <p style={{ color: '#6B7280', textAlign: 'center', maxWidth: 320 }}>
                We'll reach out within 2 hours to confirm your {isDemo ? 'demo' : 'audit'} slot.
              </p>
              <button onClick={onClose} style={{ marginTop: 20, padding: '12px 32px', background: '#FFCE00', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 15, fontFamily: 'Inter, sans-serif' }}>
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <User size={13} /> Full Name
                  </label>
                  <input type="text" placeholder="Rahul Sharma" value={form.name} onChange={e => handleChange('name', e.target.value)} style={inputStyle} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Building2 size={13} /> Hotel / Company Name
                  </label>
                  <input type="text" placeholder="Mosaic Hotels" value={form.company} onChange={e => handleChange('company', e.target.value)} style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Phone size={13} /> Mobile Number
                  </label>
                  <input type="tel" placeholder="9876543210" value={form.mobile} onChange={e => handleChange('mobile', e.target.value)} style={inputStyle} maxLength={10} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Mail size={13} /> Email Address
                  </label>
                  <input type="email" placeholder="rahul@hotel.com" value={form.email} onChange={e => handleChange('email', e.target.value)} style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Calendar size={13} /> Preferred Date
                  </label>
                  <input type="date" min={today} value={form.date} onChange={e => handleChange('date', e.target.value)} style={inputStyle} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Clock size={13} /> Convenient Time
                  </label>
                  <select value={form.time} onChange={e => handleChange('time', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option value="">Pick a slot</option>
                    {TIME_SLOTS.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                  </select>
                </div>
              </div>

              {errorMsg && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, padding: '10px 14px', color: '#DC2626', fontSize: 13 }}>
                  <AlertCircle size={15} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  padding: '15px 24px', borderRadius: 12, border: 'none',
                  fontSize: 15, fontWeight: 700, cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  fontFamily: 'Inter, sans-serif', marginTop: 4,
                  background: isDemo ? '#FFCE00' : '#0F1B2D',
                  color: isDemo ? '#0A0A0A' : '#FFFFFF',
                  opacity: status === 'loading' ? 0.7 : 1,
                }}
              >
                {status === 'loading' ? 'Submitting...' : isDemo ? '🎯  Book My Demo' : '🔍  Request Free Audit'}
              </button>
              <p style={{ fontSize: 12, color: '#9CA3AF', textAlign: 'center' }}>
                No spam. We respond within 2 hours during business hours.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
