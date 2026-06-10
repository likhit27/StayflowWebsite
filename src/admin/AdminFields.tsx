import React from 'react';

/* ── Shared styles ── */
export const fieldLabel: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, color: '#374151', display: 'block',
  marginBottom: 5, fontFamily: 'Barlow, sans-serif', letterSpacing: 1,
  textTransform: 'uppercase',
};

export const fieldInput: React.CSSProperties = {
  width: '100%', padding: '10px 12px', border: '1.5px solid #E5E7EB',
  borderRadius: 8, fontSize: 14, fontFamily: 'Inter, sans-serif',
  background: '#F9FAFB', color: '#0A0A0A',
};

export const fieldTextarea: React.CSSProperties = {
  ...fieldInput, resize: 'vertical' as const, minHeight: 80, lineHeight: 1.6,
};

/* ── Components ── */
interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
  rows?: number;
}

export function Field({ label, value, onChange, multiline, placeholder, rows = 3 }: FieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <label style={fieldLabel}>{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          style={fieldTextarea}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={fieldInput}
        />
      )}
    </div>
  );
}

/* ── Card list editor (for cards/items with title+desc) ── */
interface CardItem { title: string; desc: string; }

interface CardListProps {
  label: string;
  items: CardItem[];
  onChange: (items: CardItem[]) => void;
}

export function CardListEditor({ label, items, onChange }: CardListProps) {
  const update = (i: number, field: keyof CardItem, val: string) => {
    const next = [...items];
    next[i] = { ...next[i], [field]: val };
    onChange(next);
  };

  return (
    <div>
      <label style={{ ...fieldLabel, marginBottom: 12 }}>{label}</label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {items.map((item, i) => (
          <div key={i} style={{ background: '#F9FAFB', borderRadius: 10, padding: '14px 16px', border: '1px solid #F3F4F6' }}>
            <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 10, fontFamily: 'Barlow, sans-serif', fontWeight: 700, letterSpacing: 1 }}>
              CARD {i + 1}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Field label="Title" value={item.title} onChange={v => update(i, 'title', v)} />
              <Field label="Description" value={item.desc} onChange={v => update(i, 'desc', v)} multiline rows={2} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Feature list editor (array of strings) ── */
interface StringListProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}

export function StringListEditor({ label, items, onChange }: StringListProps) {
  const update = (i: number, val: string) => {
    const next = [...items];
    next[i] = val;
    onChange(next);
  };

  return (
    <div>
      <label style={{ ...fieldLabel, marginBottom: 10 }}>{label}</label>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((item, i) => (
          <input key={i} type="text" value={item} onChange={e => update(i, e.target.value)} style={fieldInput} />
        ))}
      </div>
    </div>
  );
}

/* ── Section wrapper ── */
interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  onSave: () => void;
  saving: boolean;
  saved: boolean;
}

export function SectionCard({ title, children, onSave, saving, saved }: SectionCardProps) {
  return (
    <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #F3F4F6', overflow: 'hidden', marginBottom: 24 }}>
      <div style={{ padding: '18px 24px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 20, textTransform: 'uppercase', letterSpacing: 0.3 }}>{title}</h2>
        <button
          onClick={onSave}
          disabled={saving}
          style={{
            padding: '9px 20px', background: saved ? '#22C55E' : '#FFCE00',
            border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 800,
            cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'Barlow, sans-serif',
            letterSpacing: 0.3, textTransform: 'uppercase',
            color: saved ? '#fff' : '#0A0A0A',
            transition: 'background 0.2s',
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving ? 'Saving...' : saved ? 'Saved' : 'Save Changes'}
        </button>
      </div>
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {children}
      </div>
    </div>
  );
}
