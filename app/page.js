'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Playfair_Display, Inter } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-display' })
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body' })

const s = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '20px 48px',
    background: 'rgba(245, 240, 232, 0.9)',
    backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid #DDD8CE',
  },
  logo: { fontFamily: 'var(--font-display), Georgia, serif', fontSize: 22, fontWeight: 500, letterSpacing: '0.2em', color: '#0e0e0e', textDecoration: 'none' },
  navSignIn: { fontFamily: 'var(--font-body), sans-serif', fontSize: 13, fontWeight: 500, color: '#8a7e6e', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.04em' },
  navBtn: { fontFamily: 'var(--font-body), sans-serif', fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', background: '#C9A96E', color: '#0e0e0e', border: 'none', borderRadius: 100, padding: '10px 24px', cursor: 'pointer', transition: 'background 0.2s', whiteSpace: 'nowrap' },
  hero: { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '140px 24px 100px', textAlign: 'center', position: 'relative' },
  heroLabel: { fontFamily: 'var(--font-body), sans-serif', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 24, border: '1px solid #C9A96E', borderRadius: 100, padding: '6px 16px', display: 'inline-block' },
  h1: { fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(40px, 6.5vw, 88px)', fontWeight: 400, lineHeight: 1.06, letterSpacing: '-0.03em', color: '#0e0e0e', maxWidth: 960, marginBottom: 24 },
  heroSub: { fontFamily: 'var(--font-body), sans-serif', fontSize: 'clamp(16px, 2vw, 19px)', color: '#8a7e6e', lineHeight: 1.7, maxWidth: 560, marginBottom: 48 },
  section: { padding: 'clamp(60px, 10vw, 120px) clamp(24px, 6vw, 96px)', maxWidth: 1200, margin: '0 auto' },
  sectionLabel: { fontFamily: 'var(--font-body), sans-serif', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 16 },
  h2: { fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(30px, 4.5vw, 60px)', fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#0e0e0e', marginBottom: 16 },
  sectionSub: { fontFamily: 'var(--font-body), sans-serif', fontSize: 17, color: '#8a7e6e', lineHeight: 1.65, maxWidth: 520, marginBottom: 56 },
  featureGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 },
  featureCard: { padding: '36px 32px', border: '1px solid #DDD8CE', borderRadius: 16, background: 'rgba(255,255,255,0.5)', transition: 'border-color 0.2s, transform 0.2s', cursor: 'default' },
  featureNum: { fontFamily: 'var(--font-display), Georgia, serif', fontSize: 44, fontWeight: 300, color: '#DDD8CE', lineHeight: 1, marginBottom: 20 },
  featureTitle: { fontFamily: 'var(--font-display), Georgia, serif', fontSize: 21, fontWeight: 400, marginBottom: 10, color: '#0e0e0e' },
  featureBody: { fontFamily: 'var(--font-body), sans-serif', fontSize: 14, color: '#8a7e6e', lineHeight: 1.65 },
  stepsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 0, border: '1px solid #DDD8CE', borderRadius: 16, overflow: 'hidden' },
  step: { padding: '40px 32px', borderRight: '1px solid #DDD8CE' },
  stepNum: { fontFamily: 'var(--font-body), sans-serif', fontSize: 11, letterSpacing: '0.15em', color: '#C9A96E', marginBottom: 16, textTransform: 'uppercase' },
  stepTitle: { fontFamily: 'var(--font-display), Georgia, serif', fontSize: 22, fontWeight: 400, marginBottom: 10, color: '#0e0e0e' },
  stepBody: { fontFamily: 'var(--font-body), sans-serif', fontSize: 14, color: '#8a7e6e', lineHeight: 1.65 },
  pricingWrap: { background: '#0e0e0e', borderRadius: 24, padding: 'clamp(40px, 6vw, 72px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48, alignItems: 'center' },
  pricingH2: { fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 300, color: '#F5F0E8', lineHeight: 1.1, marginBottom: 16, letterSpacing: '-0.02em' },
  pricingBody: { fontFamily: 'var(--font-body), sans-serif', fontSize: 16, color: '#8a7e6e', lineHeight: 1.65, marginBottom: 32 },
  price: { fontFamily: 'var(--font-display), Georgia, serif', fontSize: 72, fontWeight: 300, color: '#C9A96E', lineHeight: 1, marginBottom: 4 },
  priceSub: { fontFamily: 'var(--font-body), sans-serif', fontSize: 13, color: '#8a7e6e', marginBottom: 32 },
  pricingBtn: { fontFamily: 'var(--font-body), sans-serif', fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', background: '#C9A96E', color: '#0e0e0e', border: 'none', borderRadius: 100, padding: '14px 32px', cursor: 'pointer', transition: 'background 0.2s' },
  pricingFeatureList: { display: 'flex', flexDirection: 'column', gap: 14 },
  pricingFeatureItem: { display: 'flex', alignItems: 'flex-start', gap: 12 },
  pricingCheck: { color: '#C9A96E', fontSize: 14, flexShrink: 0, marginTop: 2 },
  pricingFeatureText: { fontFamily: 'var(--font-body), sans-serif', fontSize: 15, color: '#8a7e6e', lineHeight: 1.5 },
  footer: { maxWidth: 1200, margin: '0 auto', padding: '32px clamp(24px, 6vw, 96px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 },
  footerLogo: { fontFamily: 'var(--font-display), Georgia, serif', fontSize: 18, fontWeight: 500, letterSpacing: '0.2em', color: '#0e0e0e' },
  footerLink: { fontFamily: 'var(--font-body), sans-serif', fontSize: 13, color: '#8a7e6e', textDecoration: 'none' },
  footerCopy: { fontFamily: 'var(--font-body), sans-serif', fontSize: 12, color: '#b5aa99', width: '100%' },
}

const problems = [
  { icon: ' ', title: 'Spreadsheets everywhere', body: 'One sheet per creator, per month, per platform. Nothing joins up and something is always out of date.' },
  { icon: ' ', title: 'No real earnings view', body: 'You know roughly what each creator earns but you can\'t see it all in one place. Reconciling takes hours every month.' },
  { icon: ' ', title: 'Missed reporting deadlines', body: 'Clients ask for numbers you don\'t have ready. You\'re always scrambling instead of advising.' },
]

const features = [
  { num: '01', title: 'Roster management', body: 'Every creator on your books. Status, platform, agency cut, monthly goals — all in one place.' },
  { num: '02', title: 'Earnings tracking', body: 'Log subscriptions, PPV and tips per creator. Filter, search, and export in seconds.' },
  { num: '03', title: 'Analytics dashboard', body: 'Real revenue breakdowns, top earners, and trends — wired to your actual data.' },
  { num: '04', title: 'Content scheduler', body: 'Plan posts across creators with a shared calendar.', soon: true },
  { num: '05', title: 'Fan CRM', body: 'Track your top fans, notes, and renewal dates.', soon: true },
  { num: '06', title: 'Client reporting', body: 'One-click reports you can send directly to creators.', soon: true },
]

const pricingFeatures = [
  'Unlimited creators on your roster',
  'Earnings tracking and analytics',
  'Content scheduler with calendar view',
  'Fan CRM with templates and notes',
  'Promotion tracker with ROI logging',
  'Client-ready reporting',
  'Cancel anytime',
]

const stats = [
  { value: '10x', label: 'Faster than spreadsheets' },
  { value: '100%', label: 'Data visibility' },
  { value: '0', label: 'Missed reporting deadlines' },
]

export default function Home() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className={`${playfair.variable} ${inter.variable}`}>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #F5F0E8; }
        .nav-links { display: flex; align-items: center; gap: 32px; }
        .hamburger { display: none; background: none; border: none; cursor: pointer; padding: 4px; flex-direction: column; gap: 5px; }
        .hamburger span { display: block; width: 22px; height: 1.5px; background: #0e0e0e; border-radius: 2px; }
        .mobile-menu { position: fixed; top: 65px; left: 0; right: 0; z-index: 49; background: rgba(245,240,232,0.98); backdrop-filter: blur(12px); border-bottom: 1px solid #DDD8CE; flex-direction: column; padding: 24px; gap: 20px; display: none; }
        .mobile-menu.open { display: flex; }
        .mobile-menu a { font-family: var(--font-body), sans-serif; font-size: 16px; color: #8a7e6e; text-decoration: none; padding: 6px 0; border-bottom: 1px solid #DDD8CE; }
        .mobile-menu button { width: 100%; padding: 14px; font-size: 14px; margin-top: 4px; }
        @media (max-width: 640px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
          .landing-nav { padding: 16px 20px !important; }
        }
        .fade-up { opacity: 0; transform: translateY(20px); animation: fadeUp 0.6s ease forwards; }
        .fade-up-1 { animation-delay: 0.1s; }
        .fade-up-2 { animation-delay: 0.2s; }
        .fade-up-3 { animation-delay: 0.35s; }
        .fade-up-4 { animation-delay: 0.5s; }
        @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* NAV */}
      <nav style={s.nav} className="landing-nav">
        <span style={s.logo}>MODL</span>
        <div className="nav-links">
          <a href="#features" style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: 13, color: '#8a7e6e', textDecoration: 'none' }}>Features</a>
          <a href="#pricing" style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: 13, color: '#8a7e6e', textDecoration: 'none' }}>Pricing</a>
          <button style={s.navSignIn} onClick={() => router.push('/login')}>Sign in</button>
          <button style={s.navBtn} onClick={() => router.push('/login')}
            onMouseEnter={e => e.currentTarget.style.background = '#a8843e'}
            onMouseLeave={e => e.currentTarget.style.background = '#C9A96E'}>
            Get started
          </button>
        </div>
        <button className="hamburger" onClick={() => setMobileMenuOpen(v => !v)} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${mobileMenuOpen ? ' open' : ''}`}>
        <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
        <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
        <button style={s.navSignIn} onClick={() => router.push('/login')}>Sign in</button>
        <button style={s.navBtn} onClick={() => router.push('/login')}>Get started</button>
      </div>

      {/* HERO */}
      <section style={s.hero}>
        <div style={{ position: 'absolute', top: '15%', right: '8%', width: 320, height: 320, borderRadius: '50%', border: '1px solid #DDD8CE', opacity: 0.5, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20%', right: '11%', width: 200, height: 200, borderRadius: '50%', border: '1px solid #C9A96E', opacity: 0.2, pointerEvents: 'none' }} />

        <p className="fade-up fade-up-1" style={s.heroLabel}>For creator management agencies</p>
        <h1 className="fade-up fade-up-2" style={s.h1}>The all-in-one platform<br />for agencies.</h1>
        <p className="fade-up fade-up-3" style={s.heroSub}>
          Roster management, earnings tracking, and analytics for every creator on your books — in one dashboard. Stop managing in spreadsheets.
        </p>

        <div className="fade-up fade-up-4" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => router.push('/login')}
            style={{ ...s.navBtn, fontSize: 14, padding: '14px 32px', borderRadius: 100 }}
            onMouseEnter={e => e.currentTarget.style.background = '#a8843e'}
            onMouseLeave={e => e.currentTarget.style.background = '#C9A96E'}
          >
            Start for free
          </button>
          <button
            onClick={() => router.push('/login')}
            style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: 14, fontWeight: 500, color: '#0e0e0e', background: 'none', border: '1px solid #DDD8CE', borderRadius: 100, padding: '14px 32px', cursor: 'pointer' }}
          >
            Sign in →
          </button>
        </div>

        <p className="fade-up fade-up-4" style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: 12, color: '#b5aa99', marginTop: 16 }}>
          Billed monthly by invoice · Cancel anytime
        </p>

        {/* Dashboard preview mockup */}
        <div className="fade-up fade-up-4" style={{ marginTop: 64, width: '100%', maxWidth: 960, position: 'relative' }}>
          <div style={{
            background: '#e8e3db', borderRadius: '14px 14px 0 0',
            padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8,
            border: '1px solid #DDD8CE', borderBottom: 'none',
          }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f5c0bc' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f5dea3' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#b5d9b5' }} />
            </div>
            <div style={{
              flex: 1, maxWidth: 260, margin: '0 auto',
              background: 'rgba(255,255,255,0.6)', borderRadius: 6,
              padding: '4px 12px', textAlign: 'center',
              fontFamily: 'var(--font-body), sans-serif', fontSize: 11, color: '#8a7e6e',
            }}>
              app.modl.com/dashboard/analytics
            </div>
          </div>
          <div style={{ border: '1px solid #DDD8CE', borderRadius: '0 0 14px 14px', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.12)' }}>
            <img src="/dashboard-preview.png" alt="MODL dashboard" style={{ width: '100%', display: 'block' }} />
          </div>
        </div>

        <div className="fade-up fade-up-4" style={{ display: 'flex', gap: 48, marginTop: 80, flexWrap: 'wrap', justifyContent: 'center' }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: 40, fontWeight: 400, color: '#C9A96E', lineHeight: 1 }}>{stat.value}</p>
              <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: 12, color: '#b5aa99', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 6 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM */}
      <div style={{ background: '#EDE8DF' }}>
        <div style={{ ...s.section, paddingBottom: 0 }}>
          <p style={s.sectionLabel}>The problem</p>
          <h2 style={s.h2}>Managing creators at scale<br />is broken.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
          {problems.map((p, i) => (
            <div key={i} style={{ background: '#EDE8DF', padding: '40px 36px', borderRight: i < problems.length - 1 ? '2px solid #F5F0E8' : 'none' }}>
              <div style={{ fontSize: 28, color: '#C9A96E', marginBottom: 20 }}>{p.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: 22, fontWeight: 400, marginBottom: 12, color: '#0e0e0e' }}>{p.title}</h3>
              <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: 15, color: '#8a7e6e', lineHeight: 1.65 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section id="features" style={{ ...s.section, paddingTop: 'clamp(80px, 12vw, 140px)' }}>
        <p style={s.sectionLabel}>What you get</p>
        <h2 style={s.h2}>Everything your agency needs.<br />One platform.</h2>
        <p style={s.sectionSub}>Six tools built for agencies managing multiple creators. Replace your patchwork of spreadsheets, shared docs, and DMs with a single source of truth.</p>
        <div style={s.featureGrid}>
          {features.map((f, i) => (
            <div key={i} style={{ ...s.featureCard, opacity: f.soon ? 0.6 : 1 }}
              onMouseEnter={e => { if (!f.soon) { e.currentTarget.style.borderColor = '#C9A96E'; e.currentTarget.style.transform = 'translateY(-4px)' } }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#DDD8CE'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div style={s.featureNum}>{f.num}</div>
                {f.soon && (
                  <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A96E', border: '1px solid #C9A96E', borderRadius: 100, padding: '3px 10px' }}>
                    Coming soon
                  </span>
                )}
              </div>
              <h3 style={s.featureTitle}>{f.title}</h3>
              <p style={s.featureBody}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={s.section}>
        <p style={s.sectionLabel}>How it works</p>
        <h2 style={{ ...s.h2, marginBottom: 48 }}>Your whole agency<br />up and running in a day.</h2>
        <div style={s.stepsGrid}>
          {[
            { num: 'Step 01', title: 'Create your account', body: 'Sign up in 60 seconds. No credit card required to get started. We\'ll send your first invoice at the end of the month.' },
            { num: 'Step 02', title: 'Add your roster', body: 'Add every creator you manage. Set their profile, platform, and agency cut. Everything is separated so nothing gets mixed up.' },
            { num: 'Step 03', title: 'Run better for your clients', body: 'Use real analytics to advise creators, prove your value, and make decisions based on data — not gut feel.' },
          ].map((step, i) => (
            <div key={i} style={{ ...s.step, borderRight: i < 2 ? '1px solid #DDD8CE' : 'none' }}>
              <p style={s.stepNum}>{step.num}</p>
              <h3 style={s.stepTitle}>{step.title}</h3>
              <p style={s.stepBody}>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section style={{ ...s.section, paddingTop: 0 }}>
        <div style={{ background: '#EDE8DF', borderRadius: 24, padding: 'clamp(40px, 6vw, 72px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48, alignItems: 'center' }}>
          <div>
            <p style={s.sectionLabel}>Who it&apos;s for</p>
            <h2 style={{ ...s.h2, fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: 16 }}>Built for agencies<br />ready to scale properly.</h2>
            <p style={{ ...s.sectionSub, marginBottom: 0 }}>Whether you manage 5 creators or 50, MODL gives you the infrastructure to grow without the chaos.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Agencies currently managing creators across spreadsheets and shared docs',
              'Agencies that want to offer creators transparent, data-backed reporting',
              'Growing agencies onboarding new creators and losing track of operations',
              'Solo managers ready to take on more clients without burning out',
              'Established agencies that want one tool instead of ten',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ color: '#C9A96E', fontSize: 14, marginTop: 2, flexShrink: 0 }}>→</span>
                <span style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: 15, color: '#555', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={s.section}>
        <div style={s.pricingWrap}>
          <div>
            <p style={{ ...s.sectionLabel, color: '#8a7e6e' }}>Pricing</p>
            <h2 style={s.pricingH2}>One flat price.<br />Unlimited creators.</h2>
            <p style={s.pricingBody}>No per-seat fees, no percentage cuts, no surprises. One monthly invoice covers your whole agency.</p>
            <div style={s.price}>$99</div>
            <p style={s.priceSub}>per month · unlimited creators · cancel anytime</p>
            <button
              style={s.pricingBtn}
              onClick={() => router.push('/login')}
              onMouseEnter={e => e.currentTarget.style.background = '#a8843e'}
              onMouseLeave={e => e.currentTarget.style.background = '#C9A96E'}
            >
              Get started
            </button>
          </div>
          <div style={s.pricingFeatureList}>
            {pricingFeatures.map((item, i) => (
              <div key={i} style={s.pricingFeatureItem}>
                <span style={s.pricingCheck}>✓</span>
                <span style={s.pricingFeatureText}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ ...s.section, textAlign: 'center', paddingTop: 0 }}>
        <p style={s.sectionLabel}>Start today</p>
        <h2 style={{ ...s.h2, maxWidth: 600, margin: '0 auto 16px' }}>Your agency.<br />One dashboard.</h2>
        <p style={{ ...s.sectionSub, margin: '0 auto 40px' }}>
          Create your account in 60 seconds. We&apos;ll send your first invoice at the end of the month.
        </p>
        <button
          onClick={() => router.push('/login')}
          style={{ ...s.pricingBtn, background: '#0e0e0e', color: '#F5F0E8', fontSize: 14, padding: '16px 40px' }}
          onMouseEnter={e => e.currentTarget.style.background = '#1a1a1a'}
          onMouseLeave={e => e.currentTarget.style.background = '#0e0e0e'}
        >
          Create your account →
        </button>
        <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: 12, color: '#b5aa99', marginTop: 16 }}>
          Billed monthly by invoice · No card required · Cancel anytime
        </p>
      </section>

      {/* FOOTER */}
      <div style={{ borderTop: '1px solid #DDD8CE' }}>
<footer style={s.footer}>
  <span style={s.footerLogo}>MODL</span>
  <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
    <a href="#features" style={s.footerLink}>Features</a>
    <a href="#pricing" style={s.footerLink}>Pricing</a>
    <a href="/terms" style={s.footerLink}>Terms</a>
    <a href="/privacy" style={s.footerLink}>Privacy</a>
    <button onClick={() => router.push('/login')} style={{ ...s.footerLink, background: 'none', border: 'none', cursor: 'pointer' }}>Sign in</button>
  </div>
  <p style={s.footerCopy}>© {new Date().getFullYear()} MODL. Creator agency management software.</p>
</footer>
      </div>

    </div>
  )
}