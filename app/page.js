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
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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
  pricingFeatureList: {
    display: 'flex', flexDirection: 'column', gap: 16,
  },
  pricingFeatureItem: {
    display: 'flex', alignItems: 'flex-start', gap: 12,
  },
  pricingCheck: {
    color: '#C9A96E', fontSize: 14, flexShrink: 0, marginTop: 2,
  },
  pricingFeatureText: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 15, color: '#8a7e6e', lineHeight: 1.5,
  },
 
  // Footer
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
  footerLinks: {
    display: 'flex', gap: 32, flexWrap: 'wrap',
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
 
// ─── Data ────────────────────────────────────────────────────────────────────
 
const problems = [
  {
    icon: '✕',
    title: 'They take 30–50% forever',
    body: 'Management agencies pocket up to half of everything you earn — every month, indefinitely. That\'s thousands leaving your account before you\'ve even seen it.',
  },
  {
    icon: '✕',
    title: 'They hold your account hostage',
    body: 'Agencies demand your login credentials then use account access as leverage. When you want to leave, they make it as painful as possible.',
  },
  {
    icon: '✕',
    title: 'You\'re kept in the dark',
    body: 'No real analytics, no subscriber data, no visibility into your own business. Agencies hide the numbers because informed creators are harder to exploit.',
  },
]
 
const features = [
  {
    num: '01',
    title: 'Earnings Tracker',
    body: 'Every pound in one place. Subscription income, PPV, and tips broken out separately. Projected earnings, expense tracking, and your real profit — all visible.',
  },
  {
    num: '02',
    title: 'Content Scheduler',
    body: 'Plan weeks of content in advance. Calendar view, upload queue, and notes on every post. No more scrambling daily or paying someone else to manage it for you.',
  },
  {
    num: '03',
    title: 'Fan CRM',
    body: 'Message templates for common interactions, notes on who\'s who, and high-spender flagging for priority attention. Manage your top fans without burning out.',
  },
  {
    num: '04',
    title: 'Promotion Tracker',
    body: 'Log every shoutout, collab, and Reddit promo. Track what you spent, what growth it drove, and what converted. Stop wasting money on promotions that don\'t work.',
  },
  {
    num: '05',
    title: 'Analytics Dashboard',
    body: 'Subscriber growth, best-performing content, optimal posting times, churn rate, and average fan value. The data agencies hide from you — fully visible and yours.',
  },
]
 
const pricingFeatures = [
  'Earnings tracker — subscriptions, PPV, and tips',
  'Content scheduler with calendar view',
  'Fan CRM with message templates and notes',
  'Promotion tracker with ROI logging',
  'Full analytics dashboard',
  'No commission on earnings. Ever.',
  'Your data stays yours — always',
  'Cancel anytime',
]
 
// ─── Waitlist Form Component ──────────────────────────────────────────────────
 
function WaitlistForm({ dark = false }) {
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
        ✓ You&apos;re on the list. We&apos;ll be in touch soon.
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
 
// ─── Page ─────────────────────────────────────────────────────────────────────
 
export default function Home() {
  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
  }
 
  return (
    <div className={`${playfair.variable} ${inter.variable}`}>
 
      {/* NAV */}
      <nav style={s.nav}>
        <span style={s.logo}>MODL</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <a href="#features" style={{ ...s.footerLink, color: '#8a7e6e', fontSize: 13 }}>Features</a>
          <a href="#pricing" style={{ ...s.footerLink, color: '#8a7e6e', fontSize: 13 }}>Pricing</a>

<button
  style={s.navBtn}
  onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
>
  Join Waitlist
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
 


<h1 className="fade-up fade-up-2" style={s.h1}>
  You don&apos;t need<br />an agency.
</h1>
<p className="fade-up fade-up-3" style={s.heroSub}>
  Everything your agency does. $30 a month.<br />Keep 100% of your earnings.
</p>
        <div
          className="fade-up fade-up-4"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, width: '100%', maxWidth: 440 }}
        >
          <WaitlistForm />
          <p style={s.socialProof}>No spam · One email when we launch · Cancel anytime</p>
        </div>
      </section>
 
      {/* PROBLEM */}
      <div style={{ background: '#EDE8DF', padding: '0' }}>
        <div style={{ ...s.section, paddingBottom: 0 }}>
          <p style={s.sectionLabel}>The problem</p>
          <h2 style={s.h2}>Why creators are done<br />with management agencies</h2>
        </div>
        <div style={{ ...s.problemGrid, marginTop: 0 }}>
          {problems.map((p, i) => (
            <div key={i} style={{
              ...s.problemCard,
              borderRadius: 0,
              borderRight: i < problems.length - 1 ? '2px solid #F5F0E8' : 'none',
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
        <h2 style={s.h2}>Everything your agency does.<br />For £25 a month.</h2>
        <p style={s.sectionSub}>Five tools that replace your management agency. You keep every penny and stay in full control of your account.</p>
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
              title: 'Sign up and connect',
              body: 'Create your MODL account and set up your creator profile. No agency access required — your OnlyFans login stays yours, always.',
            },
            {
              num: 'Step 02',
              title: 'Add your data',
              body: 'Log your earnings, schedule your content, and import your fan list. Everything in one dashboard from day one.',
            },
            {
              num: 'Step 03',
              title: 'Run your business',
              body: 'Track what\'s working, manage your top fans, and grow without giving 30–50% to someone who isn\'t doing much anyway.',
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
              Built for creators who are done being managed
            </h2>
            <p style={{ ...s.sectionSub, marginBottom: 0 }}>
              Whether you&apos;re currently signed with an agency or considering one — MODL is the tool that makes going independent easy.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Creators currently signed with a management agency',
              'Creators who feel underpaid or underserved by their agency',
              'Solo creators overwhelmed by managing everything alone',
              'Creators who have heard the horror stories and want to avoid agencies entirely',
              'Anyone who wants their earnings data visible and owned by them',
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
            <p style={s.pricingBody}>
              Everything you need to run your creator career like a business. No agency taking their cut month after month.
            </p>
            <div style={s.price}>$30</div>
            <p style={s.priceSub}>per month · cancel anytime</p>
            <button
              style={s.pricingBtn}
              onClick={scrollToWaitlist}
              onMouseEnter={e => e.currentTarget.style.background = '#a8843e'}
              onMouseLeave={e => e.currentTarget.style.background = '#C9A96E'}
            >
              Join the Waitlist
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
      <section id="waitlist" style={{ ...s.section, textAlign: 'center', paddingTop: 0 }}>
        <p style={s.sectionLabel}>Early access</p>
        <h2 style={{ ...s.h2, maxWidth: 600, margin: '0 auto 16px' }}>
          Be one of the first<br />10 creators on MODL
        </h2>
        <p style={{ ...s.sectionSub, margin: '0 auto 40px' }}>
          We&apos;re onboarding our first creators manually and treating them like gold. Get in early and shape the product.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
          <WaitlistForm />
          <p style={s.socialProof}>No spam · One email when we launch · Cancel anytime</p>
        </div>
      </section>
 
      {/* FOOTER */}
      <div style={{ borderTop: '1px solid #DDD8CE' }}>
        <footer style={s.footer}>
          <span style={s.footerLogo}>MODL</span>
          <div style={s.footerLinks}>
            <a href="#features" style={s.footerLink}>Features</a>
            <a href="#pricing" style={s.footerLink}>Pricing</a>
          </div>
          <p style={s.footerCopy}>© {new Date().getFullYear()} MODL. Creator management software.</p>
        </footer>
      </div>
 
    </div>
  )
}