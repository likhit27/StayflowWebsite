import { useState, useEffect } from 'react';
import { LogOut, RefreshCw, Eye } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { DEFAULT_CONTENT, type SiteContent } from '../lib/defaultContent';
import { Field, CardListEditor, StringListEditor, SectionCard } from './AdminFields';

interface Props { onLogout: () => void; }

type Section = keyof SiteContent;
type SaveState = Record<string, 'idle' | 'saving' | 'saved'>;

export default function AdminDashboard({ onLogout }: Props) {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [saveState, setSaveState] = useState<SaveState>({});
  const [activeTab, setActiveTab] = useState<Section>('hero');
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState(false);

  // Load all content from Supabase on mount
  useEffect(() => {
    async function load() {
      try {
        const { data, error } = await supabase.from('site_content').select('section, data');
        if (error) { setDbError(true); return; }
        if (data && data.length > 0) {
          const merged = { ...DEFAULT_CONTENT };
          for (const row of data) {
            const s = row.section as Section;
            if (s in merged) {
              (merged as Record<string, unknown>)[s] = {
                ...(merged[s] as Record<string, unknown>),
                ...(row.data as Record<string, unknown>),
              };
            }
          }
          setContent(merged);
        }
      } catch { setDbError(true); }
      finally { setLoading(false); }
    }
    load();
  }, []);

  const updateSection = <K extends Section>(section: K, patch: Partial<SiteContent[K]>) => {
    setContent(prev => ({
      ...prev,
      [section]: { ...prev[section], ...patch },
    }));
  };

  const saveSection = async (section: Section) => {
    setSaveState(p => ({ ...p, [section]: 'saving' }));
    try {
      const { error } = await supabase
        .from('site_content')
        .upsert({ section, data: content[section] }, { onConflict: 'section' });
      if (error) throw error;
      setSaveState(p => ({ ...p, [section]: 'saved' }));
      setTimeout(() => setSaveState(p => ({ ...p, [section]: 'idle' })), 2500);
    } catch (err) {
      console.error(err);
      alert('Save failed. Check your Supabase connection.');
      setSaveState(p => ({ ...p, [section]: 'idle' }));
    }
  };

  const TABS: { key: Section; label: string }[] = [
    { key: 'hero',     label: 'Hero' },
    { key: 'problem',  label: 'Problem' },
    { key: 'platform', label: 'Platform' },
    { key: 'why',      label: 'Why Us' },
    { key: 'services', label: 'Services' },
    { key: 'roadmap',  label: 'Roadmap' },
    { key: 'cta',      label: 'CTA' },
    { key: 'footer',   label: 'Footer' },
  ];

  const tabStyle = (key: Section): React.CSSProperties => ({
    padding: '9px 16px', border: 'none', borderRadius: 8, cursor: 'pointer',
    fontSize: 13, fontWeight: 700, fontFamily: 'Barlow, sans-serif', letterSpacing: 0.3,
    background: activeTab === key ? '#0F1B2D' : 'transparent',
    color: activeTab === key ? '#fff' : '#6B7280',
    transition: 'all 0.15s',
  });

  const hero = content.hero;
  const problem = content.problem;
  const platform = content.platform;
  const why = content.why;
  const services = content.services;
  const roadmap = content.roadmap;
  const cta = content.cta;
  const footer = content.footer;

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', fontFamily: 'Inter, sans-serif' }}>
      {/* Top bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #F3F4F6', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 30, height: 30, background: '#FFCE00', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 14 }}>SF</span>
            <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: 18, textTransform: 'uppercase' }}>StayFlow</span>
            <span style={{ fontSize: 12, color: '#9CA3AF', background: '#F3F4F6', padding: '2px 8px', borderRadius: 100, marginLeft: 4 }}>Admin</span>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <a href="/" target="_blank" rel="noopener" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', border: '1.5px solid #E5E7EB', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#374151', background: '#fff' }}>
              <Eye size={14} /> Preview Site
            </a>
            <button onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', border: 'none', borderRadius: 8, background: '#F9FAFB', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#6B7280' }}>
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        {/* DB error banner */}
        {dbError && (
          <div style={{ background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: 10, padding: '14px 18px', marginBottom: 24, fontSize: 14 }}>
            <strong>Supabase not connected.</strong> You are editing default content. Changes will not persist until you set your <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> env vars and run the DB setup SQL. See the Setup Guide.
          </div>
        )}

        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, gap: 10, color: '#9CA3AF' }}>
            <RefreshCw size={18} className="spin" /> Loading content...
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 24, alignItems: 'start' }}>
            {/* Sidebar tabs */}
            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #F3F4F6', padding: '10px 8px', position: 'sticky', top: 80 }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: '#9CA3AF', letterSpacing: 1.5, textTransform: 'uppercase', padding: '4px 10px', marginBottom: 6 }}>Sections</p>
              {TABS.map(t => (
                <button key={t.key} onClick={() => setActiveTab(t.key)} style={tabStyle(t.key)}>
                  {t.label}
                  {saveState[t.key] === 'saved' && <span style={{ marginLeft: 6, color: '#22C55E', fontSize: 12 }}>✓</span>}
                </button>
              ))}
            </div>

            {/* Editor panel */}
            <div>
              {/* HERO */}
              {activeTab === 'hero' && (
                <SectionCard title="Hero Section" onSave={() => saveSection('hero')} saving={saveState.hero === 'saving'} saved={saveState.hero === 'saved'}>
                  <Field label="Badge text" value={hero.badge} onChange={v => updateSection('hero', { badge: v })} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <Field label="Headline line 1" value={hero.headline_line1} onChange={v => updateSection('hero', { headline_line1: v })} />
                    <Field label="Headline line 2" value={hero.headline_line2} onChange={v => updateSection('hero', { headline_line2: v })} />
                  </div>
                  <Field label="Headline accent (yellow)" value={hero.headline_accent} onChange={v => updateSection('hero', { headline_accent: v })} />
                  <Field label="Subtext" value={hero.subtext} onChange={v => updateSection('hero', { subtext: v })} multiline rows={3} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <Field label="Demo CTA button text" value={hero.cta_demo} onChange={v => updateSection('hero', { cta_demo: v })} />
                    <Field label="Audit CTA button text" value={hero.cta_audit} onChange={v => updateSection('hero', { cta_audit: v })} />
                  </div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 1, marginTop: 4 }}>Stats</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                    <Field label="Stat 1 value" value={hero.stat1_val} onChange={v => updateSection('hero', { stat1_val: v })} />
                    <Field label="Stat 1 label" value={hero.stat1_label} onChange={v => updateSection('hero', { stat1_label: v })} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                    <Field label="Stat 2 value" value={hero.stat2_val} onChange={v => updateSection('hero', { stat2_val: v })} />
                    <Field label="Stat 2 label" value={hero.stat2_label} onChange={v => updateSection('hero', { stat2_label: v })} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                    <Field label="Stat 3 value" value={hero.stat3_val} onChange={v => updateSection('hero', { stat3_val: v })} />
                    <Field label="Stat 3 label" value={hero.stat3_label} onChange={v => updateSection('hero', { stat3_label: v })} />
                  </div>
                </SectionCard>
              )}

              {/* PROBLEM */}
              {activeTab === 'problem' && (
                <SectionCard title="Problem Section" onSave={() => saveSection('problem')} saving={saveState.problem === 'saving'} saved={saveState.problem === 'saved'}>
                  <Field label="Section label" value={problem.section_label} onChange={v => updateSection('problem', { section_label: v })} />
                  <Field label="Headline" value={problem.headline} onChange={v => updateSection('problem', { headline: v })} multiline rows={2} />
                  <Field label="Subtext" value={problem.subtext} onChange={v => updateSection('problem', { subtext: v })} multiline rows={2} />
                  <CardListEditor
                    label="Problem cards"
                    items={problem.cards}
                    onChange={cards => updateSection('problem', { cards })}
                  />
                </SectionCard>
              )}

              {/* PLATFORM */}
              {activeTab === 'platform' && (
                <SectionCard title="Platform Section" onSave={() => saveSection('platform')} saving={saveState.platform === 'saving'} saved={saveState.platform === 'saved'}>
                  <Field label="Section label" value={platform.section_label} onChange={v => updateSection('platform', { section_label: v })} />
                  <Field label="Headline" value={platform.headline} onChange={v => updateSection('platform', { headline: v })} multiline rows={2} />
                  <Field label="Subtext" value={platform.subtext} onChange={v => updateSection('platform', { subtext: v })} multiline rows={2} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {platform.modules.map((mod, i) => (
                      <div key={i} style={{ background: '#F9FAFB', borderRadius: 12, padding: '16px 18px', border: '1px solid #F3F4F6' }}>
                        <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 14, fontFamily: 'Barlow, sans-serif', fontWeight: 700, letterSpacing: 1 }}>MODULE {i + 1}</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                          <Field label="Module title" value={mod.title} onChange={v => {
                            const next = [...platform.modules]; next[i] = { ...next[i], title: v };
                            updateSection('platform', { modules: next });
                          }} />
                          <Field label="Phase badge" value={mod.phase} onChange={v => {
                            const next = [...platform.modules]; next[i] = { ...next[i], phase: v };
                            updateSection('platform', { modules: next });
                          }} />
                        </div>
                        <Field label="Description" value={mod.desc} onChange={v => {
                          const next = [...platform.modules]; next[i] = { ...next[i], desc: v };
                          updateSection('platform', { modules: next });
                        }} multiline rows={2} />
                        <div style={{ marginTop: 12 }}>
                          <StringListEditor
                            label="Features (4 bullet points)"
                            items={mod.features}
                            onChange={features => {
                              const next = [...platform.modules]; next[i] = { ...next[i], features };
                              updateSection('platform', { modules: next });
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              )}

              {/* WHY */}
              {activeTab === 'why' && (
                <SectionCard title="Why StayFlow Section" onSave={() => saveSection('why')} saving={saveState.why === 'saving'} saved={saveState.why === 'saved'}>
                  <Field label="Section label" value={why.section_label} onChange={v => updateSection('why', { section_label: v })} />
                  <Field label="Headline" value={why.headline} onChange={v => updateSection('why', { headline: v })} multiline rows={2} />
                  <Field label="Subtext" value={why.subtext} onChange={v => updateSection('why', { subtext: v })} multiline rows={2} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {why.points.map((pt, i) => (
                      <div key={i} style={{ background: '#F9FAFB', borderRadius: 10, padding: '14px 16px', border: '1px solid #F3F4F6' }}>
                        <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 10, fontFamily: 'Barlow, sans-serif', fontWeight: 700, letterSpacing: 1 }}>POINT {i + 1}</p>
                        <Field label="Title" value={pt.title} onChange={v => { const next = [...why.points]; next[i] = { ...next[i], title: v }; updateSection('why', { points: next }); }} />
                        <div style={{ marginTop: 10 }}>
                          <Field label="Description" value={pt.desc} onChange={v => { const next = [...why.points]; next[i] = { ...next[i], desc: v }; updateSection('why', { points: next }); }} multiline rows={2} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <Field label="ROI card title" value={why.roi_title} onChange={v => updateSection('why', { roi_title: v })} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {why.roi_rows.map((row, i) => (
                      <div key={i} style={{ background: '#F9FAFB', borderRadius: 10, padding: '14px 16px', border: '1px solid #F3F4F6' }}>
                        <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 10, fontFamily: 'Barlow, sans-serif', fontWeight: 700, letterSpacing: 1 }}>ROI ROW {i + 1}</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                          <Field label="Metric" value={row.metric} onChange={v => { const next = [...why.roi_rows]; next[i] = { ...next[i], metric: v }; updateSection('why', { roi_rows: next }); }} />
                          <Field label="Label" value={row.label} onChange={v => { const next = [...why.roi_rows]; next[i] = { ...next[i], label: v }; updateSection('why', { roi_rows: next }); }} />
                        </div>
                        <div style={{ marginTop: 10 }}>
                          <Field label="Sub-label" value={row.sub} onChange={v => { const next = [...why.roi_rows]; next[i] = { ...next[i], sub: v }; updateSection('why', { roi_rows: next }); }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              )}

              {/* SERVICES */}
              {activeTab === 'services' && (
                <SectionCard title="Services Section" onSave={() => saveSection('services')} saving={saveState.services === 'saving'} saved={saveState.services === 'saved'}>
                  <Field label="Section label" value={services.section_label} onChange={v => updateSection('services', { section_label: v })} />
                  <Field label="Headline" value={services.headline} onChange={v => updateSection('services', { headline: v })} multiline rows={2} />
                  <Field label="Subtext" value={services.subtext} onChange={v => updateSection('services', { subtext: v })} multiline rows={2} />
                  <CardListEditor label="Service cards" items={services.cards} onChange={cards => updateSection('services', { cards })} />
                </SectionCard>
              )}

              {/* ROADMAP */}
              {activeTab === 'roadmap' && (
                <SectionCard title="Roadmap Section" onSave={() => saveSection('roadmap')} saving={saveState.roadmap === 'saving'} saved={saveState.roadmap === 'saved'}>
                  <Field label="Section label" value={roadmap.section_label} onChange={v => updateSection('roadmap', { section_label: v })} />
                  <Field label="Headline" value={roadmap.headline} onChange={v => updateSection('roadmap', { headline: v })} multiline rows={2} />
                  {roadmap.phases.map((ph, i) => (
                    <div key={i} style={{ background: '#F9FAFB', borderRadius: 12, padding: '16px 18px', border: '1px solid #F3F4F6' }}>
                      <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 14, fontFamily: 'Barlow, sans-serif', fontWeight: 700, letterSpacing: 1 }}>PHASE {i + 1}</p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 12 }}>
                        <Field label="Phase name" value={ph.phase} onChange={v => { const next = [...roadmap.phases]; next[i] = { ...next[i], phase: v }; updateSection('roadmap', { phases: next }); }} />
                        <Field label="Timeline" value={ph.timeline} onChange={v => { const next = [...roadmap.phases]; next[i] = { ...next[i], timeline: v }; updateSection('roadmap', { phases: next }); }} />
                        <Field label="Note" value={ph.note} onChange={v => { const next = [...roadmap.phases]; next[i] = { ...next[i], note: v }; updateSection('roadmap', { phases: next }); }} />
                      </div>
                      <StringListEditor label="Deliverables" items={ph.items} onChange={items => { const next = [...roadmap.phases]; next[i] = { ...next[i], items }; updateSection('roadmap', { phases: next }); }} />
                    </div>
                  ))}
                </SectionCard>
              )}

              {/* CTA */}
              {activeTab === 'cta' && (
                <SectionCard title="Final CTA Section" onSave={() => saveSection('cta')} saving={saveState.cta === 'saving'} saved={saveState.cta === 'saved'}>
                  <Field label="Section label" value={cta.section_label} onChange={v => updateSection('cta', { section_label: v })} />
                  <Field label="Headline line 1" value={cta.headline_line1} onChange={v => updateSection('cta', { headline_line1: v })} />
                  <Field label="Headline line 2" value={cta.headline_line2} onChange={v => updateSection('cta', { headline_line2: v })} />
                  <Field label="Headline accent (yellow)" value={cta.headline_accent} onChange={v => updateSection('cta', { headline_accent: v })} />
                  <Field label="Subtext" value={cta.subtext} onChange={v => updateSection('cta', { subtext: v })} multiline rows={2} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                    <Field label="Demo button text" value={cta.cta_demo} onChange={v => updateSection('cta', { cta_demo: v })} />
                    <Field label="Audit button text" value={cta.cta_audit} onChange={v => updateSection('cta', { cta_audit: v })} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {cta.steps.map((step, i) => (
                      <div key={i} style={{ background: '#F9FAFB', borderRadius: 10, padding: '14px 16px', border: '1px solid #F3F4F6' }}>
                        <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 10, fontFamily: 'Barlow, sans-serif', fontWeight: 700, letterSpacing: 1 }}>STEP {i + 1}</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: 10 }}>
                          <Field label="Number" value={step.num} onChange={v => { const next = [...cta.steps]; next[i] = { ...next[i], num: v }; updateSection('cta', { steps: next }); }} />
                          <Field label="Title" value={step.title} onChange={v => { const next = [...cta.steps]; next[i] = { ...next[i], title: v }; updateSection('cta', { steps: next }); }} />
                          <Field label="Subline" value={step.sub} onChange={v => { const next = [...cta.steps]; next[i] = { ...next[i], sub: v }; updateSection('cta', { steps: next }); }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              )}

              {/* FOOTER */}
              {activeTab === 'footer' && (
                <SectionCard title="Footer" onSave={() => saveSection('footer')} saving={saveState.footer === 'saving'} saved={saveState.footer === 'saved'}>
                  <Field label="Tagline" value={footer.tagline} onChange={v => updateSection('footer', { tagline: v })} />
                  <Field label="Copyright text" value={footer.copyright} onChange={v => updateSection('footer', { copyright: v })} />
                </SectionCard>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 700px) {
          .admin-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
