'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setError('')
    const supabase = createClient()

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) { setError(error.message); setStatus('error') }
      else router.push('/dashboard/analytics')
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: name.trim() } }
      })
      if (error) { setError(error.message); setStatus('error') }
      else setStatus('success')
    }
  }

  const handleForgot = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) { setError(error.message); setStatus('error') }
    else setStatus('forgot-sent')
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .auth-root {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-family: 'DM Sans', sans-serif;
          background: #0a0a0a;
        }

        @media (max-width: 768px) {
          .auth-root { grid-template-columns: 1fr; }
          .auth-left { display: none !important; }
          .auth-right { padding: 48px 28px !important; }
        }

        .auth-left {
          position: relative;
          background: #0e0e0e;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 52px 56px;
          overflow: hidden;
          border-right: 1px solid #1a1a1a;
        }

        .auth-left-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 20% 80%, rgba(201,169,110,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 80% 20%, rgba(201,169,110,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .auth-left-grain {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.6;
        }

        .auth-brand { position: relative; z-index: 1; }

        .auth-brand-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 400;
          letter-spacing: 0.3em;
          color: #F5F0E8;
        }

        .auth-brand-tagline {
          font-size: 12px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #C9A96E;
          margin-top: 8px;
          font-weight: 300;
        }

        .auth-left-content { position: relative; z-index: 1; }

        .auth-left-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 3.5vw, 44px);
          font-weight: 300;
          font-style: italic;
          color: #F5F0E8;
          line-height: 1.25;
          letter-spacing: -0.01em;
          margin-bottom: 28px;
        }

        .auth-left-quote em { color: #C9A96E; font-style: normal; }
        .auth-left-stats { display: flex; gap: 40px; }

        .auth-stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          font-weight: 400;
          color: #C9A96E;
          line-height: 1;
        }

        .auth-stat-label {
          font-size: 11px;
          color: #555;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: 4px;
        }

        .auth-left-bottom {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .auth-avatar-stack { display: flex; }

        .auth-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid #0e0e0e;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          font-weight: 500;
          margin-left: -8px;
          color: #0e0e0e;
        }

        .auth-avatar:first-child { margin-left: 0; }
        .auth-social-proof { font-size: 12px; color: #555; line-height: 1.5; }
        .auth-social-proof strong { color: #8a7e6e; font-weight: 500; }

        .auth-right {
          background: #F5F0E8;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 64px 72px;
        }

        .auth-form-wrap {
          width: 100%;
          max-width: 360px;
          opacity: 0;
          transform: translateY(16px);
          animation: authFadeUp 0.5s ease 0.1s forwards;
        }

        @keyframes authFadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        .auth-form-header { margin-bottom: 40px; }

        .auth-form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 400;
          color: #0e0e0e;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: 8px;
        }

        .auth-form-sub { font-size: 14px; color: #8a7e6e; font-weight: 300; }
        .auth-field { margin-bottom: 14px; }

        .auth-label {
          display: block;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #8a7e6e;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .auth-input {
          width: 100%;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          padding: 14px 18px;
          border: 1px solid #DDD8CE;
          border-radius: 10px;
          background: rgba(255,255,255,0.7);
          color: #0e0e0e;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          -webkit-appearance: none;
        }

        .auth-input:focus {
          border-color: #C9A96E;
          box-shadow: 0 0 0 3px rgba(201,169,110,0.12);
        }

        .auth-input::placeholder { color: #b5aa99; }

        .auth-error {
          font-size: 13px;
          color: #c05050;
          background: rgba(192,80,80,0.08);
          border: 1px solid rgba(192,80,80,0.15);
          border-radius: 8px;
          padding: 10px 14px;
          margin-bottom: 14px;
        }

        .auth-success-msg {
          font-size: 13px;
          color: #4a8a5f;
          background: rgba(74,138,95,0.08);
          border: 1px solid rgba(74,138,95,0.2);
          border-radius: 8px;
          padding: 10px 14px;
          margin-top: 12px;
        }

        .auth-btn {
          width: 100%;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: #0e0e0e;
          color: #F5F0E8;
          border: none;
          border-radius: 10px;
          padding: 16px;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
          margin-top: 8px;
          position: relative;
          overflow: hidden;
        }

        .auth-btn:hover { background: #1a1a1a; }
        .auth-btn:active { transform: scale(0.99); }
        .auth-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .auth-btn-gold { background: #C9A96E; color: #0e0e0e; margin-top: 6px; }
        .auth-btn-gold:hover { background: #b8944f; }

        .auth-switch {
          text-align: center;
          margin-top: 28px;
          font-size: 13px;
          color: #8a7e6e;
        }

        .auth-switch-btn {
          background: none;
          border: none;
          color: #C9A96E;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          padding: 0;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .auth-success { text-align: center; padding: 48px 0; }

        .auth-success-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(201,169,110,0.15);
          border: 1px solid rgba(201,169,110,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          font-size: 22px;
        }

        .auth-success-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 400;
          color: #0e0e0e;
          margin-bottom: 10px;
        }

        .auth-success-body { font-size: 14px; color: #8a7e6e; line-height: 1.6; }

        .auth-terms {
          margin-top: 24px;
          font-size: 11px;
          color: #b5aa99;
          text-align: center;
          line-height: 1.6;
        }
      `}</style>

      <div className="auth-root">

        {/* ── Left panel ── */}
        <div className="auth-left">
          <div className="auth-left-bg" />
          <div className="auth-left-grain" />

          <div className="auth-brand">
            <div className="auth-brand-logo">MODL</div>
            <div className="auth-brand-tagline">Creator agency software</div>
          </div>

          <div className="auth-left-content">
            <p className="auth-left-quote">
              Your entire roster.<br />
              Every dollar tracked.<br />
              <em>One dashboard.</em>
            </p>
            <div className="auth-left-stats">
              <div>
                <div className="auth-stat-value">∞</div>
                <div className="auth-stat-label">Creators</div>
              </div>
              <div>
                <div className="auth-stat-value">$99</div>
                <div className="auth-stat-label">Per month</div>
              </div>
              <div>
                <div className="auth-stat-value">0</div>
                <div className="auth-stat-label">Spreadsheets</div>
              </div>
            </div>
          </div>

          <div className="auth-left-bottom">
            <div className="auth-avatar-stack">
              {[
                { bg: '#C9A96E', letter: 'A' },
                { bg: '#a8843e', letter: 'S' },
                { bg: '#8a7e6e', letter: 'M' },
              ].map((a, i) => (
                <div key={i} className="auth-avatar" style={{ background: a.bg }}>{a.letter}</div>
              ))}
            </div>
            <div className="auth-social-proof">
              <strong>Agencies already running on MODL</strong><br />
              Replace your spreadsheets. Know your numbers.
            </div>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="auth-right">
          <div className="auth-form-wrap">

            {status === 'success' ? (
              <div className="auth-success">
                <div className="auth-success-icon">✉️</div>
                <p className="auth-success-title">Check your inbox</p>
                <p className="auth-success-body">
                  We sent a confirmation link to<br />
                  <strong style={{ color: '#0e0e0e' }}>{email}</strong>
                </p>
              </div>

            ) : mode === 'forgot' ? (
              <>
                <div className="auth-form-header">
                  <h1 className="auth-form-title">Reset password.</h1>
                  <p className="auth-form-sub">Enter your email and we&apos;ll send a reset link.</p>
                </div>

                <form onSubmit={handleForgot}>
                  <div className="auth-field">
                    <label className="auth-label">Email</label>
                    <input className="auth-input" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
                  </div>

                  {error && <div className="auth-error">{error}</div>}

                  {status === 'forgot-sent' ? (
                    <div className="auth-success-msg">✓ Reset link sent — check your inbox.</div>
                  ) : (
                    <button type="submit" className="auth-btn" disabled={status === 'loading'}>
                      {status === 'loading' ? 'Sending…' : 'Send reset link'}
                    </button>
                  )}
                </form>

                <div className="auth-switch">
                  <button type="button" className="auth-switch-btn" onClick={() => { setMode('login'); setError(''); setStatus('idle') }}>
                    ← Back to sign in
                  </button>
                </div>
              </>

            ) : (
              <>
                <div className="auth-form-header">
                  <h1 className="auth-form-title">
                    {mode === 'login' ? 'Welcome back.' : 'Get started.'}
                  </h1>
                  <p className="auth-form-sub">
                    {mode === 'login'
                      ? 'Sign in to your MODL dashboard.'
                      : 'Create your agency account. No card required.'}
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  {mode === 'signup' && (
                    <div className="auth-field">
                      <label className="auth-label">Agency / your name</label>
                      <input className="auth-input" type="text" placeholder="e.g. Apex Management" value={name} onChange={e => setName(e.target.value)} required autoComplete="name" />
                    </div>
                  )}

                  <div className="auth-field">
                    <label className="auth-label">Email</label>
                    <input className="auth-input" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
                  </div>

                  <div className="auth-field">
                    <label className="auth-label">Password</label>
                    <input className="auth-input" type="password" placeholder={mode === 'login' ? '••••••••' : 'Min. 8 characters'} value={password} onChange={e => setPassword(e.target.value)} required autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
                  </div>

                  {error && <div className="auth-error">{error}</div>}

                  <button type="submit" className={`auth-btn ${mode === 'signup' ? 'auth-btn-gold' : ''}`} disabled={status === 'loading'}>
                    {status === 'loading' ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
                  </button>
                </form>

                {mode === 'login' && (
                  <p className="auth-terms">
                    <button type="button" style={{ background: 'none', border: 'none', color: '#b5aa99', fontSize: 11, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', textDecoration: 'underline', textUnderlineOffset: 2 }}
                      onClick={() => { setMode('forgot'); setError(''); setStatus('idle') }}>
                      Forgot password?
                    </button>
                  </p>
                )}

                <div className="auth-switch">
                  {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                  <button type="button" className="auth-switch-btn" onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); setStatus('idle') }}>
                    {mode === 'login' ? 'Sign up free' : 'Sign in'}
                  </button>
                </div>

                {mode === 'signup' && (
                  <p className="auth-terms">
                    By creating an account you agree to our Terms of Service and Privacy Policy. Billed monthly by invoice.
                  </p>
                )}
              </>
            )}

          </div>
        </div>
      </div>
    </>
  )
}