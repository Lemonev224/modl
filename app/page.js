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
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '20px 48px',
    background: 'rgba(245, 240, 232, 0.9)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid #DDD8CE',
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
  navLink: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 13, color: '#8a7e6e', textDecoration: 'none',
  },
  hero: {
    minHeight: '100vh',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    padding: '140px 24px 100px',
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
    fontSize: 'clamp(40px, 6.5vw, 88px)',
    fontWeight: 400, lineHeight: 1.06,
    letterSpacing: '-0.03em', color: '#0e0e0e',
    maxWidth: 960, marginBottom: 24,
  },
  heroSub: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 'clamp(16px, 2vw, 19px)',
    color: '#8a7e6e', lineHeight: 1.7,
    maxWidth: 560, marginBottom: 48,
  },
  form: {
    display: 'flex', gap: 8, width: '100%', maxWidth: 460,
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
    transition: 'background 0.2s',
    whiteSpace: 'nowrap',
  },
  socialProof: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 12, color: '#b5aa99', marginTop: 16,
  },
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
    fontSize: 'clamp(30px, 4.5vw, 60px)',
    fontWeight: 300, lineHeight: 1.1,
    letterSpacing: '-0.02em', color: '#0e0e0e',
    marginBottom: 16,
  },
  sectionSub: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 17, color: '#8a7e6e', lineHeight: 1.65,
    maxWidth: 520, marginBottom: 56,
  },
  card: {
    background: '#fff',
    border: '1px solid #DDD8CE',
    borderRadius: 16,
    padding: '32px 28px',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: 20,
  },
  featureCard: {
    padding: '36px 32px',
    border: '1px solid #DDD8CE',
    borderRadius: 16,
    background: 'rgba(255,255,255,0.5)',
    transition: 'border-color 0.2s, transform 0.2s',
    cursor: 'default',
  },
  featureNum: {
    fontFamily: 'var(--font-display), Georgia, serif',
    fontSize: 44, fontWeight: 300, color: '#DDD8CE',
    lineHeight: 1, marginBottom: 20,
  },
  featureTitle: {
    fontFamily: 'var(--font-display), Georgia, serif',
    fontSize: 21, fontWeight: 400, marginBottom: 10, color: '#0e0e0e',
  },
  featureBody: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 14, color: '#8a7e6e', lineHeight: 1.65,
  },
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
  pricingWrap: {
    background: '#0e0e0e',
    borderRadius: 24,
    padding: 'clamp(40px, 6vw, 72px)',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 48,
    alignItems: 'center',
  },
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
    fontSize: 13, color: '#8a7e6e', marginBottom: 32,
  },
  pricingBtn: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 13, fontWeight: 500, letterSpacing: '0.06em',
    background: '#C9A96E', color: '#0e0e0e',
    border: 'none', borderRadius: 100,
    padding: '14px 32px', cursor: 'pointer',
    transition: 'background 0.2s',
  },
  pricingFeatureList: { display: 'flex', flexDirection: 'column', gap: 14 },
  pricingFeatureItem: { display: 'flex', alignItems: 'flex-start', gap: 12 },
  pricingCheck: { color: '#C9A96E', fontSize: 14, flexShrink: 0, marginTop: 2 },
  pricingFeatureText: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 15, color: '#8a7e6e', lineHeight: 1.5,
  },
  footer: {
    borderTop: '1px solid #DDD8CE',
    padding: '40px clamp(24px, 6vw, 96px)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    flexWrap: 'wrap', gap: 16,
    maxWidth: 1200, margin: '0 auto',
  },
  footerLogo: {
    fontFamily: 'var(--font-display), Georgia, serif',
    fontSize: 18, fontWeight: 500, letterSpacing: '0.2em', color: '#0e0e0e',
  },
  footerLink: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 13, color: '#8a7e6e', textDecoration: 'none',
  },
  footerCopy: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 12, color: '#b5aa99',
  },
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const problems = [
  {
    icon: '✕',
    title: 'Spreadsheets don\'t scale',
    body: 'Tracking earnings, schedules, and fan notes across spreadsheets for 10+ creators is a full-time job in itself. Mistakes slip through, data goes stale, and nothing talks to anything else.',
  },
  {
    icon: '✕',
    title: 'No visibility across your roster',
    body: 'You can\'t see at a glance which creators are growing, who\'s churning fans, or where revenue is coming from. Making good decisions for your clients requires data you don\'t have.',
  },
  {
    icon: '✕',
    title: 'Clients don\'t trust what they can\'t see',
    body: 'Creators want transparency. When you can\'t show them real numbers and clear reporting, they start to wonder whether they need you at all.',
  },
]

const features = [
  {
    num: '01',
    title: 'Creator Roster',
    body: 'Manage every creator on your roster from one place. See their status, earnings, and activity at a glance. Add notes, tags, and priority flags per creator.',
  },
  {
    num: '02',
    title: 'Earnings Tracking',
    body: 'Log and categorise income across subscriptions, PPV, and tips for every creator. See totals, breakdowns, and trends — per creator or across your whole roster.',
  },
  {
    num: '03',
    title: 'Analytics Dashboard',
    body: 'Subscriber growth, churn rate, best-performing content, and optimal posting times. Real data that helps you give better advice and prove your value to clients.',
  },
  {
    num: '04',
    title: 'Content Scheduler',
    body: 'Plan and track content for every creator on your books. Calendar view, upload queue, and per-post notes. Never miss a posting window again.',
  },
  {
    num: '05',
    title: 'Fan CRM',
    body: 'Message templates, high-spender flags, and notes on every fan — per creator. Your team can manage interactions without burning out or losing context.',
  },
  {
    num: '06',
    title: 'Promotion Tracker',
    body: 'Log every shoutout, collab, and campaign across your roster. Track spend, follower gains, and conversions. Know exactly what\'s working and what\'s not.',
  },
]

const pricingFeatures = [
  'Unlimited creators on your roster',
  'Earnings tracking across all creators',
  'Full analytics dashboard per creator',
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

// ─── Waitlist / Demo Form ──────────────────────────────────────────────────────

function DemoForm({ dark = false }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

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
      if (res.ok) { setStatus('success'); setEmail('') }
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p style={{ ...s.socialProof, color: '#C9A96E', fontSize: 15 }}>
        ✓ We&apos;ll be in touch to arrange your demo.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={s.form}>
      <input
        type="email"
        placeholder="agency@email.com"
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
        {status === 'loading' ? 'Sending…' : 'Book a Demo'}
      </button>
      {status === 'error' && (
        <p style={{ ...s.socialProof, color: '#e55', width: '100%', textAlign: 'center' }}>
          Something went wrong. Try again.
        </p>
      )}
    </form>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className={`${playfair.variable} ${inter.variable}`}>

      {/* NAV */}
      <nav style={s.nav}>
        <span style={s.logo}>MODL</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <a href="#features" style={s.navLink}>Features</a>
          <a href="#pricing" style={s.navLink}>Pricing</a>
          <a href="/login" style={s.navLink}>Sign in</a>
          <button
            style={s.navBtn}
            onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Book a Demo
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={s.hero}>
        {/* Decorative circles */}
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

        <p className="fade-up fade-up-1" style={s.heroLabel}>For creator management agencies</p>

        <h1 className="fade-up fade-up-2" style={s.h1}>
          The operating system<br />for your agency.
        </h1>
        <p className="fade-up fade-up-3" style={s.heroSub}>
          Roster management, earnings tracking, and analytics for every creator on your books — in one dashboard. Stop managing in spreadsheets.
        </p>

        <div
          className="fade-up fade-up-4"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 460 }}
        >
          <DemoForm />
          <p style={s.socialProof}>No commitment · We&apos;ll walk you through the platform</p>
        </div>

        {/* Stats bar */}
        <div className="fade-up fade-up-4" style={{
          display: 'flex', gap: 48, marginTop: 80,
          flexWrap: 'wrap', justifyContent: 'center',
        }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: 'var(--font-display), Georgia, serif',
                fontSize: 40, fontWeight: 400, color: '#C9A96E', lineHeight: 1,
              }}>{stat.value}</p>
              <p style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: 12, color: '#b5aa99', letterSpacing: '0.1em',
                textTransform: 'uppercase', marginTop: 6,
              }}>{stat.label}</p>
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
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 2, marginTop: 0,
        }}>
          {problems.map((p, i) => (
            <div key={i} style={{
              background: '#EDE8DF',
              padding: '40px 36px',
              borderRight: i < problems.length - 1 ? '2px solid #F5F0E8' : 'none',
            }}>
              <div style={{ fontSize: 28, color: '#C9A96E', marginBottom: 20 }}>{p.icon}</div>
              <h3 style={{
                fontFamily: 'var(--font-display), Georgia, serif',
                fontSize: 22, fontWeight: 400, marginBottom: 12, color: '#0e0e0e',
              }}>{p.title}</h3>
              <p style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: 15, color: '#8a7e6e', lineHeight: 1.65,
              }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section id="features" style={{ ...s.section, paddingTop: 'clamp(80px, 12vw, 140px)' }}>
        <p style={s.sectionLabel}>What you get</p>
        <h2 style={s.h2}>Everything your agency needs.<br />One platform.</h2>
        <p style={s.sectionSub}>
          Six tools built for agencies managing multiple creators. Replace your patchwork of spreadsheets, shared docs, and DMs with a single source of truth.
        </p>
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
      <section style={s.section}>
        <p style={s.sectionLabel}>How it works</p>
        <h2 style={{ ...s.h2, marginBottom: 48 }}>Your whole agency<br />up and running in a day.</h2>
        <div style={s.stepsGrid}>
          {[
            {
              num: 'Step 01',
              title: 'Set up your roster',
              body: 'Create your agency account and add every creator you manage. Set their profile, platform links, and billing details in minutes.',
            },
            {
              num: 'Step 02',
              title: 'Start logging data',
              body: 'Add earnings, schedule content, and log promotions for each creator. Everything is separated by creator so nothing gets mixed up.',
            },
            {
              num: 'Step 03',
              title: 'Run better for your clients',
              body: 'Use real analytics to advise creators, prove your value, and make decisions based on data — not gut feel and guesswork.',
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
            <p style={s.sectionLabel}>Who it&apos;s for</p>
            <h2 style={{ ...s.h2, fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: 16 }}>
              Built for agencies<br />ready to scale properly.
            </h2>
            <p style={{ ...s.sectionSub, marginBottom: 0 }}>
              Whether you manage 5 creators or 50, MODL gives you the infrastructure to grow without the chaos.
            </p>
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
                <span style={{
                  fontFamily: 'var(--font-body), sans-serif',
                  fontSize: 15, color: '#555', lineHeight: 1.5,
                }}>{item}</span>
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
            <p style={s.pricingBody}>
              No per-seat fees, no percentage cuts, no surprises. One monthly price covers your whole agency.
            </p>
            <div style={s.price}>£99</div>
            <p style={s.priceSub}>per month · unlimited creators · cancel anytime</p>
            <button
              style={s.pricingBtn}
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              onMouseEnter={e => e.currentTarget.style.background = '#a8843e'}
              onMouseLeave={e => e.currentTarget.style.background = '#C9A96E'}
            >
              Book a Demo
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
      <section id="demo" style={{ ...s.section, textAlign: 'center', paddingTop: 0 }}>
        <p style={s.sectionLabel}>Get started</p>
        <h2 style={{ ...s.h2, maxWidth: 600, margin: '0 auto 16px' }}>
          See MODL running<br />your agency in 20 minutes.
        </h2>
        <p style={{ ...s.sectionSub, margin: '0 auto 40px' }}>
          Book a demo and we&apos;ll walk you through the platform with your actual roster in mind.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <DemoForm />
          <p style={s.socialProof}>No commitment · We&apos;ll reach out within 24 hours</p>
        </div>
      </section>

      {/* FOOTER */}
      <div style={{ borderTop: '1px solid #DDD8CE' }}>
        <footer style={s.footer}>
          <span style={s.footerLogo}>MODL</span>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            <a href="#features" style={s.footerLink}>Features</a>
            <a href="#pricing" style={s.footerLink}>Pricing</a>
            <a href="/login" style={s.footerLink}>Sign in</a>
          </div>
          <p style={s.footerCopy}>© {new Date().getFullYear()} MODL. Creator agency management software.</p>
        </footer>
      </div>

    </div>
  )
}