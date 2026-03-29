'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const c = {
  cream: '#F5F0E8', gold: '#C9A96E',
  black: '#0e0e0e', muted: '#8a7e6e', border: '#DDD8CE',
  surface: '#EDE8DF', white: '#fff', red: '#c05050',
}

const s = {
  page: { padding: 'clamp(28px, 4vw, 48px)', maxWidth: 680 },
  pageTitle: { fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400, color: c.black, marginBottom: 4 },
  pageSubtitle: { fontFamily: 'var(--font-body), sans-serif', fontSize: 14, color: c.muted, marginBottom: 48 },
  section: { marginBottom: 36 },
  sectionTitle: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase',
    color: c.muted, marginBottom: 16, fontWeight: 500,
    paddingBottom: 12, borderBottom: `1px solid ${c.border}`,
  },
  card: { background: c.white, border: `1px solid ${c.border}`, borderRadius: 16, overflow: 'hidden' },
  row: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: `1px solid ${c.border}`, gap: 16, flexWrap: 'wrap' },
  rowLast: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', gap: 16, flexWrap: 'wrap' },
  rowLeft: { flex: 1, minWidth: 0 },
  rowLabel: { fontFamily: 'var(--font-body), sans-serif', fontSize: 14, color: c.black, fontWeight: 500, marginBottom: 2 },
  rowSub: { fontFamily: 'var(--font-body), sans-serif', fontSize: 12, color: c.muted },
  input: {
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: 14, padding: '10px 14px',
    border: `1px solid ${c.border}`, borderRadius: 8,
    background: c.cream, color: c.black,
    outline: 'none', width: 210,
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  btnGold: {
    fontFamily: 'var(--font-body), sans-serif', fontSize: 12, fontWeight: 500,
    background: c.gold, color: c.black, border: 'none', borderRadius: 8,
    padding: '10px 18px', cursor: 'pointer', whiteSpace: 'nowrap',
    transition: 'opacity 0.15s',
  },
  btnDark: {
    fontFamily: 'var(--font-body), sans-serif', fontSize: 12, fontWeight: 500,
    background: c.black, color: c.cream, border: 'none', borderRadius: 8,
    padding: '10px 18px', cursor: 'pointer', whiteSpace: 'nowrap',
  },
  btnRed: {
    fontFamily: 'var(--font-body), sans-serif', fontSize: 12, fontWeight: 500,
    background: 'rgba(192,80,80,0.08)', color: c.red,
    border: `1px solid rgba(192,80,80,0.2)`, borderRadius: 8,
    padding: '10px 18px', cursor: 'pointer', whiteSpace: 'nowrap',
  },
}

function Toast({ message, type }) {
  if (!message) return null
  return (
    <>
      <style>{`@keyframes toastIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }`}</style>
      <div style={{
        position: 'fixed', bottom: 28, right: 28, zIndex: 999,
        fontFamily: 'var(--font-body), sans-serif', fontSize: 13,
        padding: '12px 20px', borderRadius: 10,
        background: type === 'error' ? c.red : c.black,
        color: c.cream, boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        animation: 'toastIn 0.3s ease',
      }}>
        {message}
      </div>
    </>
  )
}

const inputFocus = (e) => { e.target.style.borderColor = '#C9A96E'; e.target.style.boxShadow = '0 0 0 3px rgba(201,169,110,0.12)' }
const inputBlur  = (e) => { e.target.style.borderColor = '#DDD8CE'; e.target.style.boxShadow = 'none' }

export default function SettingsPage() {
  const router = useRouter()
  const [user, setUser]               = useState(null)
  const [displayName, setDisplayName] = useState('')
  const [newEmail, setNewEmail]       = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [toast, setToast]             = useState({ message: '', type: 'success' })
  const [loading, setLoading]         = useState({})
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [deleteInput, setDeleteInput] = useState('')

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push('/login'); return }
      setUser(user)
      setNewEmail(user.email ?? '')
      setDisplayName(user.user_metadata?.display_name ?? '')
    })
  }, [router])

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast({ message: '', type: 'success' }), 3500)
  }

  const setLoad = (key, val) => setLoading(l => ({ ...l, [key]: val }))

  // ── Display name ──────────────────────────────────────────
  const saveDisplayName = async () => {
    if (!displayName.trim()) return showToast('Name cannot be empty', 'error')
    setLoad('name', true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({
      data: { display_name: displayName.trim() }
    })
    setLoad('name', false)
    error ? showToast(error.message, 'error') : showToast('Display name updated ✓')
  }

  // ── Email ─────────────────────────────────────────────────
  const saveEmail = async () => {
    if (!newEmail || newEmail === user?.email)
      return showToast('Enter a different email address', 'error')
    setLoad('email', true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ email: newEmail })
    setLoad('email', false)
    error ? showToast(error.message, 'error') : showToast('Confirmation sent — check both inboxes ✓')
  }

  // ── Password ──────────────────────────────────────────────
  const savePassword = async () => {
    if (!newPassword || newPassword.length < 8)
      return showToast('Password must be at least 8 characters', 'error')
    setLoad('password', true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setLoad('password', false)
    if (error) {
      showToast(error.message, 'error')
    } else {
      showToast('Password updated ✓')
      setNewPassword('')
    }
  }

  // ── Sign out ──────────────────────────────────────────────
  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  // ── Delete account ────────────────────────────────────────
  // Requires a Supabase Edge Function — see supabase/functions/delete-account/index.ts below
  const handleDelete = async () => {
    if (deleteInput !== user?.email)
      return showToast('Email does not match', 'error')
    setLoad('delete', true)
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/delete-account`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    )
    setLoad('delete', false)
    if (res.ok) {
      await supabase.auth.signOut()
      router.push('/')
    } else {
      const body = await res.json().catch(() => ({}))
      showToast(body.error ?? 'Failed to delete account', 'error')
    }
  }

  if (!user) return null

  return (
    <div style={s.page}>
      <p style={s.pageTitle}>Settings</p>
      <p style={s.pageSubtitle}>Manage your account.</p>

      {/* ── Profile ── */}
      <div style={s.section}>
        <p style={s.sectionTitle}>Profile</p>
        <div style={s.card}>
          <div style={s.rowLast}>
            <div style={s.rowLeft}>
              <p style={s.rowLabel}>Display name</p>
              <p style={s.rowSub}>Shown to brands and clients</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                style={s.input}
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                placeholder="Your name"
                onFocus={inputFocus}
                onBlur={inputBlur}
                onKeyDown={e => e.key === 'Enter' && saveDisplayName()}
              />
              <button
                style={{ ...s.btnGold, opacity: loading.name ? 0.6 : 1 }}
                onClick={saveDisplayName}
                disabled={loading.name}
              >
                {loading.name ? '…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Account ── */}
      <div style={s.section}>
        <p style={s.sectionTitle}>Account</p>
        <div style={s.card}>

          {/* Email */}
          <div style={s.row}>
            <div style={s.rowLeft}>
              <p style={s.rowLabel}>Email address</p>
              <p style={s.rowSub}>
                Current: <strong style={{ color: c.black }}>{user.email}</strong>
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                style={s.input}
                type="email"
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                placeholder="new@email.com"
                onFocus={inputFocus}
                onBlur={inputBlur}
                onKeyDown={e => e.key === 'Enter' && saveEmail()}
              />
              <button
                style={{ ...s.btnGold, opacity: loading.email ? 0.6 : 1 }}
                onClick={saveEmail}
                disabled={loading.email}
              >
                {loading.email ? '…' : 'Update'}
              </button>
            </div>
          </div>

          {/* Password */}
          <div style={s.rowLast}>
            <div style={s.rowLeft}>
              <p style={s.rowLabel}>Password</p>
              <p style={s.rowSub}>Minimum 8 characters</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                style={{ ...s.input, width: 180 }}
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                onFocus={inputFocus}
                onBlur={inputBlur}
                onKeyDown={e => e.key === 'Enter' && savePassword()}
              />
              <button
                style={{ ...s.btnGold, opacity: loading.password ? 0.6 : 1 }}
                onClick={savePassword}
                disabled={loading.password}
              >
                {loading.password ? '…' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Session ── */}
      <div style={s.section}>
        <p style={s.sectionTitle}>Session</p>
        <div style={s.card}>
          <div style={s.rowLast}>
            <div style={s.rowLeft}>
              <p style={s.rowLabel}>Sign out</p>
              <p style={s.rowSub}>Sign out of your account on this device</p>
            </div>
            <button style={s.btnDark} onClick={handleSignOut}>Sign out</button>
          </div>
        </div>
      </div>

      {/* ── Danger zone ── */}
      <div style={s.section}>
        <p style={{ ...s.sectionTitle, color: 'rgba(192,80,80,0.6)', borderBottomColor: 'rgba(192,80,80,0.15)' }}>
          Danger zone
        </p>
        <div style={s.card}>
          {!deleteConfirm ? (
            <div style={s.rowLast}>
              <div style={s.rowLeft}>
                <p style={{ ...s.rowLabel, color: c.red }}>Delete account</p>
                <p style={s.rowSub}>Permanently deletes your account and all data. Cannot be undone.</p>
              </div>
              <button style={s.btnRed} onClick={() => setDeleteConfirm(true)}>
                Delete account
              </button>
            </div>
          ) : (
            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <p style={{ ...s.rowLabel, color: c.red, marginBottom: 4 }}>Are you sure?</p>
                <p style={s.rowSub}>
                  Type <strong style={{ color: c.black }}>{user.email}</strong> to confirm. This cannot be undone.
                </p>
              </div>
              <input
                style={{
                  ...s.input, width: '100%',
                  background: 'rgba(192,80,80,0.04)',
                  borderColor: 'rgba(192,80,80,0.2)',
                }}
                type="email"
                placeholder={user.email}
                value={deleteInput}
                onChange={e => setDeleteInput(e.target.value)}
                onFocus={e => { e.target.style.borderColor = c.red; e.target.style.boxShadow = '0 0 0 3px rgba(192,80,80,0.1)' }}
                onBlur={inputBlur}
              />
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  style={{ ...s.btnRed, opacity: (loading.delete || deleteInput !== user.email) ? 0.5 : 1 }}
                  onClick={handleDelete}
                  disabled={loading.delete || deleteInput !== user.email}
                >
                  {loading.delete ? 'Deleting…' : 'Yes, delete my account'}
                </button>
                <button
                  style={s.btnDark}
                  onClick={() => { setDeleteConfirm(false); setDeleteInput('') }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Toast message={toast.message} type={toast.type} />
    </div>
  )
}