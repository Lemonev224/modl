'use client'

import { useState } from 'react'

import { Playfair_Display, Inter } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
})

const s = {
  // Nav
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '20px 48px',
    borderBottom: '1px solid transparent',
    background: 'rgba(245, 240, 232, 0.85)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
  },
  logo: {
    fontFamily: 'var(--font-display), Georgia, serif',
    fontSize: 22, fontWeight: 500, letterSpacing: '0.2em',
    color: '#0e0e0e', textDecoration: 'none',
  },
  navBtn: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 13, fontWeight: 500, letterSpacing: '0.06em',
    background: '#0e0e0e', color: '#F5F0E8',
    border: 'none', borderRadius: 100,
    padding: '10px 24px', cursor: 'pointer',
    transition: 'background 0.2s',
  },

  // Hero
  hero: {
    minHeight: '100vh',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    padding: '120px 24px 80px',
    textAlign: 'center',
    position: 'relative',
  },
  heroLabel: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
    color: '#C9A96E', marginBottom: 24,
    border: '1px solid #C9A96E', borderRadius: 100,
    padding: '6px 16px', display: 'inline-block',
  },
  h1: {
    fontFamily: 'var(--font-display), Georgia, serif',
    fontSize: 'clamp(42px, 7vw, 96px)',
    fontWeight: 400, lineHeight: 1.05,
    letterSpacing: '-0.035em', color: '#0e0e0e',
    maxWidth: 900, marginBottom: 24,
  },
  heroSub: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 'clamp(16px, 2vw, 20px)',
    color: '#8a7e6e', lineHeight: 1.6,
    maxWidth: 520, marginBottom: 48,
  },

  // Waitlist form
  form: {
    display: 'flex', gap: 8, width: '100%', maxWidth: 440,
    flexWrap: 'wrap', justifyContent: 'center',
  },
  input: {
    flex: 1, minWidth: 200,
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 14, padding: '14px 20px',
    border: '1px solid #DDD8CE', borderRadius: 100,
    background: 'rgba(255,255,255,0.6)',
    color: '#0e0e0e', outline: 'none',
  },
  submitBtn: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 13, fontWeight: 500, letterSpacing: '0.06em',
    background: '#C9A96E', color: '#0e0e0e',
    border: 'none', borderRadius: 100,
    padding: '14px 28px', cursor: 'pointer',
    transition: 'background 0.2s, transform 0.1s',
    whiteSpace: 'nowrap',
  },
  socialProof: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 12, color: '#b5aa99', marginTop: 16,
  },

  // Section shared
  section: {
    padding: 'clamp(60px, 10vw, 120px) clamp(24px, 6vw, 96px)',
    maxWidth: 1200, margin: '0 auto',
  },
  sectionLabel: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
    color: '#C9A96E', marginBottom: 16,
  },
  h2: {
    fontFamily: 'var(--font-display), Georgia, serif',
    fontSize: 'clamp(32px, 5vw, 64px)',
    fontWeight: 300, lineHeight: 1.1,
    letterSpacing: '-0.02em', color: '#0e0e0e',
    marginBottom: 16,
  },
  sectionSub: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 17, color: '#8a7e6e', lineHeight: 1.6,
    maxWidth: 520, marginBottom: 56,
  },

  // Problem cards
  problemGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 2,
  },
  problemCard: {
    background: '#EDE8DF',
    padding: '40px 36px',
    borderRadius: 0,
  },
  problemIcon: {
    fontSize: 28, marginBottom: 20,
  },
  problemTitle: {
    fontFamily: 'var(--font-display), Georgia, serif',
    fontSize: 22, fontWeight: 400, marginBottom: 12, color: '#0e0e0e',
  },
  problemBody: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 15, color: '#8a7e6e', lineHeight: 1.65,
  },

  // Features
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: 24,
  },
  featureCard: {
    padding: '36px 32px',
    border: '1px solid #DDD8CE',
    borderRadius: 16,
    background: 'rgba(255,255,255,0.4)',
    transition: 'border-color 0.2s, transform 0.2s',
    cursor: 'default',
  },
  featureNum: {
    fontFamily: 'var(--font-display), Georgia, serif',
    fontSize: 48, fontWeight: 300, color: '#DDD8CE',
    lineHeight: 1, marginBottom: 20,
  },
  featureTitle: {
    fontFamily: 'var(--font-display), Georgia, serif',
    fontSize: 22, fontWeight: 400, marginBottom: 12, color: '#0e0e0e',
  },
  featureBody: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 14, color: '#8a7e6e', lineHeight: 1.65,
  },

  // Steps
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 0,
    border: '1px solid #DDD8CE',
    borderRadius: 16,
    overflow: 'hidden',
  },
  step: {
    padding: '40px 32px',
    borderRight: '1px solid #DDD8CE',
  },
  stepNum: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 11, letterSpacing: '0.15em', color: '#C9A96E',
    marginBottom: 16, textTransform: 'uppercase',
  },
  stepTitle: {
    fontFamily: 'var(--font-display), Georgia, serif',
    fontSize: 22, fontWeight: 400, marginBottom: 10, color: '#0e0e0e',
  },
  stepBody: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 14, color: '#8a7e6e', lineHeight: 1.65,
  },

  // Pricing
pricingWrap: {
  background: '#0e0e0e',
  borderRadius: 24,
  padding: 'clamp(40px, 6vw, 72px)',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', // was '1fr 1fr'
  gap: 48,
  alignItems: 'center',
},
  pricingLeft: {},
  pricingH2: {
    fontFamily: 'var(--font-display), Georgia, serif',
    fontSize: 'clamp(28px, 4vw, 52px)',
    fontWeight: 300, color: '#F5F0E8',
    lineHeight: 1.1, marginBottom: 16,
    letterSpacing: '-0.02em',
  },
  pricingBody: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 16, color: '#8a7e6e', lineHeight: 1.65, marginBottom: 32,
  },
  price: {
    fontFamily: 'var(--font-display), Georgia, serif',
    fontSize: 72, fontWeight: 300, color: '#C9A96E',
    lineHeight: 1, marginBottom: 4,
  },
  priceSub: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 13, color: '#555', marginBottom: 32,
  },
  featureList: {
    listStyle: 'none',
    display: 'flex', flexDirection: 'column', gap: 12,
  },
  featureItem: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 14, color: '#b5aa99',
    display: 'flex', alignItems: 'center', gap: 10,
  },
  checkmark: {
    color: '#C9A96E', fontSize: 14, flexShrink: 0,
  },
  pricingBtn: {
    marginTop: 32,
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 13, fontWeight: 500, letterSpacing: '0.06em',
    background: '#C9A96E', color: '#0e0e0e',
    border: 'none', borderRadius: 100,
    padding: '14px 32px', cursor: 'pointer',
    transition: 'background 0.2s',
    display: 'inline-block',
  },

  // Dark CTA section
  ctaSection: {
    background: '#0e0e0e',
    padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 96px)',
    textAlign: 'center',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center',
  },
  ctaH2: {
    fontFamily: 'var(--font-display), Georgia, serif',
    fontSize: 'clamp(36px, 6vw, 80px)',
    fontWeight: 300, color: '#F5F0E8',
    lineHeight: 1.05, letterSpacing: '-0.02em',
    maxWidth: 800, marginBottom: 24,
  },
  ctaSub: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 17, color: '#8a7e6e', lineHeight: 1.6,
    maxWidth: 480, marginBottom: 48,
  },

  // Footer
  footer: {
    background: '#0e0e0e',
    borderTop: '1px solid #1e1e1e',
    padding: '32px 48px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    flexWrap: 'wrap', gap: 16,
  },
  footerLogo: {
    fontFamily: 'var(--font-display), Georgia, serif',
    fontSize: 18, fontWeight: 500, letterSpacing: '0.2em', color: '#F5F0E8',
  },
  footerLinks: {
    display: 'flex', gap: 24, flexWrap: 'wrap',
  },
  footerLink: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 12, color: '#555', textDecoration: 'none',
    transition: 'color 0.2s',
    letterSpacing: '0.04em',
  },
  footerRight: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 12, color: '#333',
  },
}

 function WaitlistForm({ which }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const dark = which === 'cta'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p style={{ ...s.socialProof, color: '#C9A96E', fontSize: 15 }}>
        ✓ You're on the list. We'll be in touch soon.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={s.form}>
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={{
          ...s.input,
          background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.6)',
          color: dark ? '#F5F0E8' : '#0e0e0e',
          border: dark ? '1px solid #2a2a2a' : '1px solid #DDD8CE',
        }}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        style={{ ...s.submitBtn, opacity: status === 'loading' ? 0.7 : 1 }}
      >
        {status === 'loading' ? 'Joining...' : 'Reserve My Spot'}
      </button>
      {status === 'error' && (
        <p style={{ ...s.socialProof, color: '#e55', width: '100%', textAlign: 'center' }}>
          Something went wrong. Try again.
        </p>
      )}
    </form>
  )
}

const features = [
  {
    num: '01',
    title: 'Your Comp Card',
    body: 'A beautiful shareable link with your portfolio, measurements, and rates. Send it directly to brands and photographers like a pro.',
  },
  {
    num: '02',
    title: 'Verified Castings',
    body: 'Browse jobs from verified brands only. Every client is checked before they can post. No scammers, no fake castings, ever.',
  },
  {
    num: '03',
    title: 'Auto Contracts',
    body: 'Fill in the job details and we generate a professional contract automatically. Never get stiffed on a payment again.',
  },
  {
    num: '04',
    title: 'Escrow Payments',
    body: 'Clients pay through MODL before the shoot. Money releases to your account when you confirm the job is done.',
  },
]

const pricingFeatures = [
  'Shareable comp card and portfolio',
  'Unlimited casting call applications',
  'Auto-generated contracts and invoices',
  'Escrow payments on every booking',
  'Direct messaging with verified clients',
  'Privacy mode for content creators',
  'Booking and earnings dashboard',
  'Cancel anytime',
]

export default function Home() {
  const [email, setEmail] = useState('')
  const [ctaEmail, setCtaEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [ctaStatus, setCtaStatus] = useState('idle')

  const handleSubmit = async (e, which) => {
    e.preventDefault()
    const val = which === 'hero' ? email : ctaEmail
    const setter = which === 'hero' ? setStatus : setCtaStatus
    if (!val) return

    setter('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: val }),
      })
      if (res.ok) {
        setter('success')
        which === 'hero' ? setEmail('') : setCtaEmail('')
      } else {
        setter('error')
      }
    } catch {
      setter('error')
    }
  }



  return (
    <div className={`${playfair.variable} ${inter.variable}`}>
      {/* NAV */}
      <nav style={s.nav}>
        <span style={s.logo}>MODL</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <a href="#features" style={{ ...s.footerLink, color: '#8a7e6e', fontSize: 13 }}>Features</a>
          <a href="#pricing" style={{ ...s.footerLink, color: '#8a7e6e', fontSize: 13 }}>Pricing</a>
          <a href="#waitlist">
            <button style={s.navBtn}>Join Waitlist</button>
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section style={s.hero}>
        {/* Decorative circle */}
        <div style={{
          position: 'absolute', top: '15%', right: '8%',
          width: 320, height: 320, borderRadius: '50%',
          border: '1px solid #DDD8CE', opacity: 0.5,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '20%', right: '11%',
          width: 200, height: 200, borderRadius: '50%',
          border: '1px solid #C9A96E', opacity: 0.2,
          pointerEvents: 'none',
        }} />

        <p className="fade-up fade-up-1" style={s.heroLabel}>The Agency Alternative</p>
        <h1 className="fade-up fade-up-2" style={s.h1}>
          You don't need<br />an agency.
        </h1>
        <p className="fade-up fade-up-3" style={s.heroSub}>
          MODL gives every model a professional comp card, verified casting calls, automatic contracts and payments — for $30 a month. Keep 100% of your earnings.
        </p>
        <div className="fade-up fade-up-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, width: '100%', maxWidth: 440 }}>
          <WaitlistForm which="hero" />
          <p style={s.socialProof}>No spam · One email when we launch · Cancel anytime</p>
        </div>
      </section>

      {/* PROBLEM */}
      <div style={{ background: '#EDE8DF', padding: '0' }}>
        <div style={{ ...s.section, paddingBottom: 0 }}>
          <p style={s.sectionLabel}>The problem</p>
          <h2 style={s.h2}>Why models are done<br />with agencies</h2>
        </div>
        <div style={{ ...s.problemGrid, marginTop: 0 }}>
          {[
            {
              icon: '✕',
              title: 'They take 20% forever',
              body: 'The average agency takes a fifth of every booking for as long as you\'re signed. That\'s thousands of dollars a year leaving your pocket.',
            },
            {
              icon: '✕',
              title: 'They control who sees you',
              body: 'Agencies decide which clients you meet and which jobs you\'re submitted for. You have zero visibility into what\'s happening with your career.',
            },
            {
              icon: '✕',
              title: 'They charge you upfront',
              body: 'Portfolios, comp cards, training, registration fees. Legitimate agencies don\'t charge models — but most of them do anyway.',
            },
          ].map((p, i) => (
            <div key={i} style={{
              ...s.problemCard,
              borderRadius: 0,
              borderRight: i < 2 ? '2px solid #F5F0E8' : 'none',
            }}>
              <div style={{ ...s.problemIcon, color: '#C9A96E' }}>{p.icon}</div>
              <h3 style={s.problemTitle}>{p.title}</h3>
              <p style={s.problemBody}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section id="features" style={{ ...s.section, paddingTop: 'clamp(80px, 12vw, 140px)' }}>
        <p style={s.sectionLabel}>What you get</p>
        <h2 style={s.h2}>Everything your agency does.<br />For $30 a month.</h2>
        <p style={s.sectionSub}>One subscription replaces your agency, your comp card printer, your contract lawyer, and your accountant.</p>
        <div style={s.featureGrid}>
          {features.map((f, i) => (
            <div
              key={i}
              style={s.featureCard}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#C9A96E'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#DDD8CE'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={s.featureNum}>{f.num}</div>
              <h3 style={s.featureTitle}>{f.title}</h3>
              <p style={s.featureBody}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ ...s.section }}>
        <p style={s.sectionLabel}>How it works</p>
        <h2 style={{ ...s.h2, marginBottom: 48 }}>Up and running<br />in 10 minutes</h2>
        <div style={s.stepsGrid}>
          {[
            {
              num: 'Step 01',
              title: 'Create your profile',
              body: 'Add your photos, measurements, and rates. We build your comp card automatically — ready to share in minutes.',
            },
            {
              num: 'Step 02',
              title: 'Apply to castings',
              body: 'Browse verified jobs and apply directly. No agency decides for you. Full transparency on every application.',
            },
            {
              num: 'Step 03',
              title: 'Get booked, get paid',
              body: 'Client pays through the platform before the shoot. You confirm the job done. Money hits your account within 24 hours.',
            },
          ].map((step, i) => (
            <div key={i} style={{
              ...s.step,
              borderRight: i < 2 ? '1px solid #DDD8CE' : 'none',
            }}>
              <p style={s.stepNum}>{step.num}</p>
              <h3 style={s.stepTitle}>{step.title}</h3>
              <p style={s.stepBody}>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOR WHO */}
      <section style={{ ...s.section, paddingTop: 0 }}>
        <div style={{
          background: '#EDE8DF', borderRadius: 24,
          padding: 'clamp(40px, 6vw, 72px)',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 48, alignItems: 'center',
        }}>
          <div>
            <p style={s.sectionLabel}>Who it's for</p>
            <h2 style={{ ...s.h2, fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: 16 }}>
              Built for models who run their own career
            </h2>
            <p style={{ ...s.sectionSub, marginBottom: 0 }}>
              Whether you're just starting out or walking away from a bad agency — MODL is your professional foundation.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Aspiring models building their first portfolio',
              'Freelance models managing their own bookings',
              'Models leaving agencies and going independent',
              'Content creators expanding into brand work',
              'Models who value their privacy above everything',
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
          <div style={s.pricingLeft}>
            <p style={{ ...s.sectionLabel, color: '#8a7e6e' }}>Pricing</p>
            <h2 style={s.pricingH2}>One plan.<br />No hidden fees.</h2>
            <p style={s.pricingBody}>Everything you need to run your modeling career like a business. No agency taking their cut month after month.</p>
            <div style={s.price}>$30</div>
            <p style={s.priceSub}>per month · cancel anytime</p>
            <button style={s.pricingBtn}
              onMouseEnter={e => e.currentTarget.style.background = '#a8843e'}
              onMouseLeave={e => e.currentTarget.style.background = '#C9A96E'}
            >
              <a href="#waitlist" style={{ color: 'inherit', textDecoration: 'none' }}>Join the Waitlist</a>
            </button>
            <p style={{ ...s.priceSub, marginTop: 16 }}>
              + 10% commission on completed bookings only. Nothing else, ever.
            </p>
          </div>
          <ul style={s.featureList}>
            {pricingFeatures.map((item, i) => (
              <li key={i} style={s.featureItem}>
                <span style={s.checkmark}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="waitlist" style={s.ctaSection}>
        <div style={{
          position: 'absolute', opacity: 0.05,
          fontFamily: 'var(--font-display), Georgia, serif',
          fontSize: 'clamp(80px, 15vw, 200px)',
          fontWeight: 300, color: '#F5F0E8',
          userSelect: 'none', pointerEvents: 'none',
          letterSpacing: '0.2em',
        }}>MODL</div>
        <p style={{ ...s.sectionLabel, color: '#8a7e6e' }}>Early access</p>
        <h2 style={s.ctaH2}>Be first.<br />Launch is coming soon.</h2>
        <p style={s.ctaSub}>Join the waitlist and get 3 months free when we launch. We're onboarding the first 500 models personally.</p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, width: '100%', maxWidth: 440 }}>
          <WaitlistForm which="cta" />
          <p style={{ ...s.socialProof, color: '#333' }}>No spam · Just one email when we launch</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={s.footer}>
        <span style={s.footerLogo}>MODL</span>
        <div style={s.footerLinks}>
          <a href="#" style={s.footerLink}>Privacy Policy</a>
          <a href="#" style={s.footerLink}>Terms of Service</a>
          <a href="mailto:hello@modl.so" style={s.footerLink}>Contact</a>
        </div>
        <span style={s.footerRight}>© 2025 MODL</span>
      </footer>

      {/* Mobile responsive overrides */}
      <style>{`
        @media (max-width: 768px) {
          nav { padding: 16px 20px !important; }
          nav a { display: none; }
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
  </div>
)
}