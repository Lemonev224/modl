'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleReset = async (e) => {
    e.preventDefault()
    if (password.length < 8) return setError('Password must be at least 8 characters')
    if (password !== confirm) return setError('Passwords do not match')
    setStatus('loading')
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })
    if (error) { setError(error.message); setStatus('error') }
    else {
      setStatus('success')
      setTimeout(() => router.push('/dashboard'), 2000)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #F5F0E8; }
        .wrap {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 24px;
          background: #F5F0E8;
        }
        .card {
          width: 100%;
          max-width: 380px;
          background: #fff;
          border: 1px solid #DDD8CE;
          border-radius: 20px;
          padding: 48px 40px;
        }
        .title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          font-weight: 400;
          color: #0e0e0e;
          margin-bottom: 8px;
        }
        .sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #8a7e6e;
          margin-bottom: 32px;
        }
        .label {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #8a7e6e;
          margin-bottom: 8px;
        }
        .input {
          width: 100%;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          padding: 14px 18px;
          border: 1px solid #DDD8CE;
          border-radius: 10px;
          background: rgba(255,255,255,0.7);
          color: #0e0e0e;
          outline: none;
          margin-bottom: 16px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input:focus {
          border-color: #C9A96E;
          box-shadow: 0 0 0 3px rgba(201,169,110,0.12);
        }
        .btn {
          width: 100%;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: #C9A96E;
          color: #0e0e0e;
          border: none;
          border-radius: 10px;
          padding: 16px;
          cursor: pointer;
          margin-top: 8px;
          transition: background 0.2s;
        }
        .btn:hover { background: #b8944f; }
        .btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .error {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #c05050;
          background: rgba(192,80,80,0.08);
          border: 1px solid rgba(192,80,80,0.15);
          border-radius: 8px;
          padding: 10px 14px;
          margin-bottom: 16px;
        }
        .success {
          text-align: center;
          padding: 16px 0;
        }
        .success-icon {
          font-size: 36px;
          margin-bottom: 16px;
        }
        .success-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px;
          color: #0e0e0e;
          margin-bottom: 8px;
        }
        .success-body {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #8a7e6e;
        }
      `}</style>

      <div className="wrap">
        <div className="card">
          {status === 'success' ? (
            <div className="success">
              <div className="success-icon">✓</div>
              <p className="success-title">Password updated.</p>
              <p className="success-body">Redirecting you to your dashboard…</p>
            </div>
          ) : (
            <>
              <h1 className="title">New password.</h1>
              <p className="sub">Choose a new password for your account.</p>

              <form onSubmit={handleReset}>
                <label className="label">New password</label>
                <input
                  className="input"
                  type="password"
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />

                <label className="label">Confirm password</label>
                <input
                  className="input"
                  type="password"
                  placeholder="Repeat password"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  required
                />

                {error && <div className="error">{error}</div>}

                <button
                  type="submit"
                  className="btn"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Updating…' : 'Set new password'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  )
}


