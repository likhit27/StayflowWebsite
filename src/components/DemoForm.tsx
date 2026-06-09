import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import type { FormData, FormType } from '../types';

interface DemoFormProps {
  type: FormType;
  onClose: () => void;
}

const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM',
];

const NOTION_TOKEN        = import.meta.env.VITE_NOTION_TOKEN as string;
const NOTION_DATABASE_ID  = import.meta.env.VITE_NOTION_DATABASE_ID as string;
const TELEGRAM_BOT_TOKEN  = import.meta.env.VITE_TELEGRAM_BOT_TOKEN as string;
const TELEGRAM_CHAT_ID    = import.meta.env.VITE_TELEGRAM_CHAT_ID as string;

async function submitToNotion(data: FormData, tag: string): Promise<void> {
  const body = {
    parent: { database_id: NOTION_DATABASE_ID },
    properties: {
      Name:             { title:      [{ text: { content: data.name } }] },
      Company:          { rich_text:  [{ text: { content: data.company } }] },
      Mobile:           { phone_number: data.mobile },
      Email:            { email:      data.email },
      'Preferred Date': { date:       { start: data.date } },
      'Time Slot':      { select:     { name: data.time } },
      Tag:              { select:     { name: tag } },
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
  if (!res.ok) { const e = await res.json(); throw new Error(e.message); }
}

async function sendTelegramMessage(data: FormData, tag: string): Promise<void> {
  const text =
    `*New ${tag} Request — StayFlow*\n\n` +
    `Name: ${data.name}\n` +
    `Company: ${data.company}\n` +
    `Mobile: ${data.mobile}\n` +
    `Email: ${data.email}\n` +
    `Date: ${data.date}\n` +
    `Time: ${data.time}\n\n` +
    `#${tag.toLowerCase()}`;
  const res = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'Markdown' }),
    }
  );
  if (!res.ok) { const e = await res.json(); throw new Error(e.description); }
}

const EMPTY_FORM: FormData = { name: '', company: '', mobile: '', email: '', date: '', time: '' };

export default function DemoForm({ type, onClose }: DemoFormProps) {
  const isDemo = type === 'demo';
  const tag    = isDemo ? 'Demo' : 'Audit';

  const [form, setForm]       = useState<FormData>(EMPTY_FORM);
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set = (field: keyof FormData, value: string) => {
    setForm(p => ({ ...p, [field]: value }));
    setErrorMsg('');
  };

  const validate = (): boolean => {
    if (!form.name.trim())        { setErrorMsg('Please enter your name.'); return false; }
    if (!form.company.trim())     { setErrorMsg('Please enter your company name.'); return false; }
    if (!/^\d{10}$/.test(form.mobile.replace(/\s/g, ''))) {
      setErrorMsg('Please enter a valid 10-digit mobile number.'); return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrorMsg('Please enter a valid email address.'); return false;
    }
    if (!form.date) { setErrorMsg('Please select a preferred date.'); return false; }
    if (!form.time) { setErrorMsg('Please select a time slot.'); return false; }
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
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px',
    border: '1.5px solid #E5E7EB', borderRadius: 8,
    fontSize: 14, color: '#0A0A0A', background: '#F9FAFB',
    fontFamily: 'Inter, sans-serif',
    transition: 'border-color 0.15s',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12, fontWeight: 600, color: '#374151',
    marginBottom: 6, display: 'block',
    fontFamily: 'Barlow, sans-serif', letterSpacing: 0.4,
    textTransform: 'uppercase',
  };

  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000, padding: '16px',
        backdropFilter: 'blur(6px)',
      }}
    >
      <div style={{
        background: '#FFFFFF', borderRadius: 16,
        width: '100%', maxWidth: 640,
        maxHeight: '94vh', overflowY: 'auto',
        boxShadow: '0 24px 80px rgba(0,0,0,0.2)',
      }}>
        {/* Header */}
        <div style={{
          padding: '24px 28px',
          background: isDemo ? '#FFCE00' : '#0F1B2D',
          borderRadius: '16px 16px 0 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        }}>
          <div>
            <p style={{
              fontSize: 10, fontWeight: 700, letterSpacing: 2.5,
              textTransform: 'uppercase',
              color: isDemo ? 'rgba(0,0,0,0.45)' : '#FFCE00',
              marginBottom: 6, fontFamily: 'Barlow, sans-serif',
            }}>
              {isDemo ? '30-Minute Demo' : 'Free Tech Stack Audit'}
            </p>
            <h2 style={{
              fontSize: 24, fontWeight: 900, lineHeight: 1.1,
              fontFamily: 'Barlow Condensed, sans-serif',
              textTransform: 'uppercase', letterSpacing: 0.5,
              color: isDemo ? '#0A0A0A' : '#FFFFFF',
            }}>
              {isDemo ? 'Book a Product Demo' : 'Request a Free Audit'}
            </h2>
            <p style={{
              color: isDemo ? '#374151' : '#9CA3AF',
              fontSize: 13, marginTop: 6, fontFamily: 'Inter, sans-serif',
            }}>
              {isDemo
                ? 'Live walkthrough tailored to your hotel. No pitch, just the product.'
                : 'We audit your booking engine, OTA presence, payments and SEO — free.'}
            </p>
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: isDemo ? '#0A0A0A' : '#FFFFFF',
            opacity: 0.5, padding: 4, flexShrink: 0, marginLeft: 12,
          }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px 28px' }}>
          {status === 'success' ? (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '40px 16px', gap: 10, textAlign: 'center',
            }}>
              <CheckCircle size={52} color="#22C55E" strokeWidth={1.5} />
              <h3 style={{
                fontSize: 22, fontWeight: 900, marginTop: 12,
                fontFamily: 'Barlow Condensed, sans-serif',
                textTransform: 'uppercase',
              }}>You are confirmed</h3>
              <p style={{ color: '#6B7280', maxWidth: 300, fontSize: 14, lineHeight: 1.6 }}>
                We will reach out within 2 hours to confirm your {isDemo ? 'demo' : 'audit'} slot.
              </p>
              <button onClick={onClose} style={{
                marginTop: 20, padding: '12px 32px',
                background: '#FFCE00', border: 'none', borderRadius: 8,
                fontWeight: 800, cursor: 'pointer', fontSize: 14,
                fontFamily: 'Barlow, sans-serif', letterSpacing: 0.3,
              }}>
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Row 1 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-row">
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input
                    type="text" placeholder="Rahul Sharma"
                    value={form.name} onChange={e => set('name', e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Hotel / Company</label>
                  <input
                    type="text" placeholder="Mosaic Hotels"
                    value={form.company} onChange={e => set('company', e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-row">
                <div>
                  <label style={labelStyle}>Mobile Number</label>
                  <input
                    type="tel" placeholder="9876543210"
                    value={form.mobile} onChange={e => set('mobile', e.target.value)}
                    style={inputStyle} maxLength={10}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input
                    type="email" placeholder="you@hotel.com"
                    value={form.email} onChange={e => set('email', e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-row">
                <div>
                  <label style={labelStyle}>Preferred Date</label>
                  <input
                    type="date" min={today}
                    value={form.date} onChange={e => set('date', e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Convenient Time</label>
                  <select
                    value={form.time} onChange={e => set('time', e.target.value)}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                  >
                    <option value="">Pick a slot</option>
                    {TIME_SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* Error */}
              {errorMsg && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: '#FEF2F2', border: '1px solid #FECACA',
                  borderRadius: 8, padding: '10px 14px',
                  color: '#DC2626', fontSize: 13,
                }}>
                  <AlertCircle size={14} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  padding: '14px 24px', borderRadius: 8, border: 'none',
                  fontSize: 15, fontWeight: 800, cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  fontFamily: 'Barlow, sans-serif', letterSpacing: 0.5,
                  textTransform: 'uppercase', marginTop: 4,
                  background: isDemo ? '#FFCE00' : '#0F1B2D',
                  color: isDemo ? '#0A0A0A' : '#FFFFFF',
                  opacity: status === 'loading' ? 0.7 : 1,
                  transition: 'opacity 0.15s',
                }}
              >
                {status === 'loading'
                  ? 'Submitting...'
                  : isDemo ? 'Book My Demo' : 'Request Free Audit'}
              </button>

              <p style={{ fontSize: 12, color: '#9CA3AF', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
                No spam. We respond within 2 hours during business hours.
              </p>
            </form>
          )}
        </div>
      </div>

      {/* Mobile form stack */}
      <style>{`
        @media (max-width: 600px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
