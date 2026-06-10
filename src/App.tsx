import { useState } from 'react';
import Navbar from './components/Navbar';
import DemoForm from './components/DemoForm';
import type { FormType } from './types';
import { useContent } from './hooks/useContent';
import { ArrowRight, CheckCircle, ChevronRight } from 'lucide-react';

const dHead = (size: string, mb = 16, col = '#0A0A0A'): React.CSSProperties => ({
  fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900,
  textTransform:'uppercase', letterSpacing:'-0.5px', lineHeight:0.95,
  fontSize:size, marginBottom:mb, color:col,
});
const secLabel = (col='#9CA3AF'): React.CSSProperties => ({
  fontSize:11, fontWeight:700, letterSpacing:3, textTransform:'uppercase',
  color:col, marginBottom:14, fontFamily:'Barlow,sans-serif', display:'block',
});
const body: React.CSSProperties = { fontSize:16, color:'#6B7280', lineHeight:1.75, fontFamily:'Inter,sans-serif' };
const yBtn: React.CSSProperties = { padding:'14px 28px', background:'#FFCE00', border:'none', borderRadius:8, fontSize:14, fontWeight:800, cursor:'pointer', fontFamily:'Barlow,sans-serif', color:'#0A0A0A', letterSpacing:0.5, textTransform:'uppercase', display:'inline-flex', alignItems:'center', gap:8 };
const dBtn: React.CSSProperties = { padding:'14px 28px', background:'#0F1B2D', border:'none', borderRadius:8, fontSize:14, fontWeight:800, cursor:'pointer', fontFamily:'Barlow,sans-serif', color:'#fff', letterSpacing:0.5, textTransform:'uppercase' };
const oBtn: React.CSSProperties = { ...dBtn, background:'transparent', border:'1.5px solid rgba(255,255,255,0.25)' };

export default function App() {
  const [formType, setFormType] = useState<FormType>(null);
  const { content } = useContent();
  const { hero, problem, platform, why, services, roadmap, cta, footer } = content;

  return (
    <div style={{ background:'#FFFFFF', color:'#0A0A0A' }}>
      <Navbar onCTA={setFormType} />
      {formType && <DemoForm type={formType} onClose={() => setFormType(null)} />}

      {/* HERO */}
      <section style={{ paddingTop:120, paddingBottom:80, paddingLeft:'7%', paddingRight:'7%', background:'#FFFFFF' }}>
        <div style={{ maxWidth:1160, margin:'0 auto' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#FFF9E0', border:'1px solid #FFCE00', borderRadius:100, padding:'5px 14px', marginBottom:32 }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:'#FFCE00', display:'block' }}/>
            <span style={{ fontSize:11, fontWeight:700, color:'#92780A', letterSpacing:1.5, textTransform:'uppercase', fontFamily:'Barlow,sans-serif' }}>{hero.badge}</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'minmax(0,1.1fr) minmax(0,0.9fr)', gap:64, alignItems:'center' }} className="hero-grid">
            <div>
              <h1 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, textTransform:'uppercase', letterSpacing:'-1px', lineHeight:0.92, fontSize:'clamp(60px,8vw,100px)', color:'#0A0A0A', marginBottom:32 }}>
                {hero.headline_line1}<br/>{hero.headline_line2}<br/>
                <span style={{ color:'#FFCE00' }}>{hero.headline_accent}</span>
              </h1>
              <p style={{ ...body, maxWidth:480, marginBottom:36 }}>{hero.subtext}</p>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <button onClick={() => setFormType('demo')} style={yBtn}>{hero.cta_demo} <ArrowRight size={16}/></button>
                <button onClick={() => setFormType('audit')} style={dBtn}>{hero.cta_audit}</button>
              </div>
              <div style={{ display:'flex', gap:40, marginTop:52, paddingTop:40, borderTop:'1px solid #F3F4F6', flexWrap:'wrap' }}>
                {[{val:hero.stat1_val,label:hero.stat1_label},{val:hero.stat2_val,label:hero.stat2_label},{val:hero.stat3_val,label:hero.stat3_label}].map(s=>(
                  <div key={s.val}>
                    <p style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:32, color:'#0A0A0A', letterSpacing:-0.5 }}>{s.val}</p>
                    <p style={{ fontSize:12, color:'#9CA3AF', marginTop:2 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background:'#0F1B2D', borderRadius:20, padding:'28px 28px 24px', boxShadow:'0 32px 80px rgba(15,27,45,0.2)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:22 }}>
                <span style={{ color:'#9CA3AF', fontSize:12 }}>{hero.dashboard_title}</span>
                <span style={{ background:'#22C55E', color:'#fff', fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:100, fontFamily:'Barlow,sans-serif', letterSpacing:1 }}>LIVE</span>
              </div>
              {[{label:'Direct Bookings Today',val:'₹1,84,000',change:'+18%'},{label:'OTA Commission Saved',val:'₹42,600',change:'vs last week'},{label:'Occupancy Rate',val:'87%',change:'+6pp'},{label:'Revenue Per Guest',val:'₹8,450',change:'+12%'}].map(r=>(
                <div key={r.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'13px 0', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color:'#9CA3AF', fontSize:13 }}>{r.label}</span>
                  <div style={{ textAlign:'right' }}>
                    <p style={{ color:'#fff', fontSize:15, fontWeight:700, fontFamily:'Barlow,sans-serif' }}>{r.val}</p>
                    <p style={{ color:'#22C55E', fontSize:11, marginTop:1 }}>▲ {r.change}</p>
                  </div>
                </div>
              ))}
              <div style={{ marginTop:20, background:'#FFCE00', borderRadius:10, padding:'14px 16px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontWeight:700, fontSize:13, color:'#0A0A0A', fontFamily:'Barlow,sans-serif' }}>This Month's Savings</span>
                <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:24, fontWeight:900, color:'#0A0A0A' }}>₹12.4L</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section style={{ background:'#F9FAFB', padding:'90px 7%' }}>
        <div style={{ maxWidth:1160, margin:'0 auto' }}>
          <span style={secLabel()}>{problem.section_label}</span>
          <h2 style={{ ...dHead('clamp(36px,5vw,60px)',14), maxWidth:640 }}>{problem.headline}</h2>
          <p style={{ ...body, maxWidth:560, marginBottom:56 }}>{problem.subtext}</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'#E5E7EB' }} className="problem-grid">
            {problem.cards.map((c,i)=>(
              <div key={i} style={{ background:'#fff', padding:'28px 24px' }}>
                <p style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:18, textTransform:'uppercase', letterSpacing:0.3, marginBottom:10 }}>{c.title}</p>
                <p style={{ fontSize:14, color:'#6B7280', lineHeight:1.65, fontFamily:'Inter,sans-serif' }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORM */}
      <section id="platform" style={{ background:'#0F1B2D', padding:'90px 7%' }}>
        <div style={{ maxWidth:1160, margin:'0 auto' }}>
          <span style={secLabel('#FFCE00')}>{platform.section_label}</span>
          <h2 style={{ ...dHead('clamp(36px,5vw,60px)',14,'#fff'), maxWidth:640 }}>{platform.headline}</h2>
          <p style={{ ...body, color:'#6B7280', maxWidth:540, marginBottom:56 }}>{platform.subtext}</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }} className="platform-grid">
            {platform.modules.map((m,i)=>(
              <div key={i} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:14, padding:'26px 22px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
                  <p style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:18, textTransform:'uppercase', letterSpacing:0.3, color:'#fff' }}>{m.title}</p>
                  <span style={{ fontSize:10, fontWeight:700, letterSpacing:1.5, color:'#FFCE00', background:'rgba(255,206,0,0.1)', padding:'4px 10px', borderRadius:100, fontFamily:'Barlow,sans-serif', whiteSpace:'nowrap', marginLeft:10 }}>{m.phase}</span>
                </div>
                <p style={{ fontSize:13, color:'#9CA3AF', lineHeight:1.65, marginBottom:18, fontFamily:'Inter,sans-serif' }}>{m.desc}</p>
                <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:7 }}>
                  {m.features.map(f=>(
                    <li key={f} style={{ display:'flex', alignItems:'flex-start', gap:8, fontSize:12, color:'#D1D5DB', fontFamily:'Inter,sans-serif' }}>
                      <CheckCircle size={13} color="#22C55E" strokeWidth={2.5} style={{ flexShrink:0, marginTop:1 }}/>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section id="why" style={{ background:'#fff', padding:'90px 7%' }}>
        <div style={{ maxWidth:1160, margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:72, alignItems:'start' }} className="why-grid">
            <div>
              <span style={secLabel()}>{why.section_label}</span>
              <h2 style={{ ...dHead('clamp(36px,4vw,52px)',20), maxWidth:480 }}>{why.headline}</h2>
              <p style={{ ...body, marginBottom:40 }}>{why.subtext}</p>
              <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
                {why.points.map(pt=>(
                  <div key={pt.title} style={{ display:'flex', gap:16 }}>
                    <div style={{ width:4, background:'#FFCE00', borderRadius:4, flexShrink:0 }}/>
                    <div>
                      <p style={{ fontFamily:'Barlow,sans-serif', fontWeight:800, fontSize:15, marginBottom:5 }}>{pt.title}</p>
                      <p style={{ fontSize:13, color:'#6B7280', lineHeight:1.65, fontFamily:'Inter,sans-serif' }}>{pt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background:'#F9FAFB', borderRadius:16, padding:'32px 28px', border:'1px solid #F3F4F6' }}>
              <p style={{ fontFamily:'Barlow,sans-serif', fontWeight:800, fontSize:14, textTransform:'uppercase', letterSpacing:0.5, marginBottom:28 }}>{why.roi_title}</p>
              {why.roi_rows.map(r=>(
                <div key={r.metric} style={{ display:'flex', gap:16, marginBottom:18, paddingBottom:18, borderBottom:'1px solid #F3F4F6' }}>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:28, fontWeight:900, color:'#0A0A0A', minWidth:80, lineHeight:1, paddingTop:2 }}>{r.metric}</div>
                  <div>
                    <p style={{ fontFamily:'Barlow,sans-serif', fontWeight:700, fontSize:14 }}>{r.label}</p>
                    <p style={{ color:'#9CA3AF', fontSize:12, marginTop:3, fontFamily:'Inter,sans-serif' }}>{r.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ background:'#F9FAFB', padding:'90px 7%' }}>
        <div style={{ maxWidth:1160, margin:'0 auto' }}>
          <span style={secLabel()}>{services.section_label}</span>
          <h2 style={{ ...dHead('clamp(36px,4vw,52px)',14), maxWidth:560 }}>{services.headline}</h2>
          <p style={{ ...body, maxWidth:520, marginBottom:56 }}>{services.subtext}</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }} className="services-grid">
            {services.cards.map(c=>(
              <div key={c.title} style={{ background:'#fff', borderRadius:12, padding:'24px 22px', border:'1px solid #F3F4F6' }}>
                <p style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:17, textTransform:'uppercase', letterSpacing:0.3, marginBottom:8 }}>{c.title}</p>
                <p style={{ fontSize:13, color:'#6B7280', lineHeight:1.65, fontFamily:'Inter,sans-serif' }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" style={{ background:'#fff', padding:'90px 7%' }}>
        <div style={{ maxWidth:1160, margin:'0 auto' }}>
          <span style={secLabel()}>{roadmap.section_label}</span>
          <h2 style={{ ...dHead('clamp(36px,4vw,52px)',56) }}>{roadmap.headline}</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }} className="roadmap-grid">
            {roadmap.phases.map((p,i)=>{
              const bgs=['#FFCE00','#0F1B2D','#F9FAFB'];
              const txts=['#0A0A0A','#fff','#0A0A0A'];
              const subs=['#374151','#9CA3AF','#6B7280'];
              return (
                <div key={p.phase} style={{ background:bgs[i], borderRadius:16, padding:'28px 24px', border:i===2?'1px solid #F3F4F6':'none' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20 }}>
                    <div>
                      <p style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:22, textTransform:'uppercase', color:txts[i] }}>{p.phase}</p>
                      <p style={{ fontSize:12, color:subs[i], marginTop:4, fontFamily:'Inter,sans-serif' }}>{p.timeline}</p>
                    </div>
                    <span style={{ fontSize:11, fontWeight:600, opacity:0.55, color:txts[i], fontFamily:'Inter,sans-serif', textAlign:'right', marginLeft:8 }}>{p.note}</span>
                  </div>
                  <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:10 }}>
                    {p.items.map(item=>(
                      <li key={item} style={{ display:'flex', alignItems:'flex-start', gap:8, fontSize:13, color:i===1?'#D1D5DB':'#374151', fontFamily:'Inter,sans-serif', lineHeight:1.5 }}>
                        <ChevronRight size={14} style={{ flexShrink:0, marginTop:2, opacity:0.6 }}/>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:'#0F1B2D', padding:'100px 7%', textAlign:'center' }}>
        <div style={{ maxWidth:680, margin:'0 auto' }}>
          <span style={secLabel('#FFCE00')}>{cta.section_label}</span>
          <h2 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, textTransform:'uppercase', fontSize:'clamp(40px,6vw,68px)', lineHeight:0.95, letterSpacing:-0.5, color:'#fff', marginBottom:20 }}>
            {cta.headline_line1}<br/>{cta.headline_line2}<br/><span style={{ color:'#FFCE00' }}>{cta.headline_accent}</span>
          </h2>
          <p style={{ ...body, color:'#6B7280', marginBottom:48 }}>{cta.subtext}</p>
          <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <button onClick={() => setFormType('demo')} style={{ ...yBtn, padding:'16px 32px', fontSize:15 }}>{cta.cta_demo} <ArrowRight size={17}/></button>
            <button onClick={() => setFormType('audit')} style={{ ...oBtn, padding:'16px 32px', fontSize:15 }}>{cta.cta_audit}</button>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:24, marginTop:72 }} className="steps-grid">
            {cta.steps.map(s=>(
              <div key={s.num}>
                <p style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:36, color:'#FFCE00', lineHeight:1 }}>{s.num}</p>
                <p style={{ fontFamily:'Barlow,sans-serif', fontWeight:800, fontSize:14, color:'#fff', marginTop:8, textTransform:'uppercase', letterSpacing:0.3 }}>{s.title}</p>
                <p style={{ fontSize:12, color:'#6B7280', marginTop:4, fontFamily:'Inter,sans-serif', lineHeight:1.5 }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:'#0A0A0A', padding:'36px 7%', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ width:30, height:30, background:'#FFCE00', borderRadius:7, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Barlow Condensed,sans-serif', fontWeight:900, fontSize:14 }}>SF</span>
          <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:18, color:'#fff', textTransform:'uppercase', letterSpacing:0.5 }}>StayFlow</span>
          <span style={{ color:'#374151', fontSize:13 }}>{footer.tagline}</span>
        </div>
        <p style={{ color:'#374151', fontSize:13 }}>{footer.copyright}</p>
      </footer>

      <style>{`
        @media(max-width:900px){
          .hero-grid,.why-grid{grid-template-columns:1fr !important;}
          .problem-grid,.platform-grid,.services-grid{grid-template-columns:1fr 1fr !important;}
          .roadmap-grid{grid-template-columns:1fr !important;}
        }
        @media(max-width:600px){
          .problem-grid,.platform-grid,.services-grid{grid-template-columns:1fr !important;}
          .steps-grid{grid-template-columns:1fr 1fr !important;}
        }
      `}</style>
    </div>
  );
}
