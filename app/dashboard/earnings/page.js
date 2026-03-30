'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

const c = { cream: '#F5F0E8', gold: '#C9A96E', black: '#0e0e0e', muted: '#8a7e6e', border: '#DDD8CE', surface: '#EDE8DF' }

const s = {
  page: { padding: 'clamp(28px, 4vw, 48px)', maxWidth: 1200 },
  pageTitle: { fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400, color: c.black, marginBottom: 4 },
  pageSubtitle: { fontFamily: 'var(--font-body), sans-serif', fontSize: 14, color: c.muted, marginBottom: 36 },
  card: { background: '#fff', border: `1px solid ${c.border}`, borderRadius: 16, padding: '24px 28px' },
  label: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: c.muted, marginBottom: 8, display: 'block' },
  value: { fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(20px, 3vw, 34px)', fontWeight: 400, color: c.black, lineHeight: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  input: {
    fontFamily: 'var(--font-body)', fontSize: 14, padding: '10px 14px',
    border: `1px solid ${c.border}`, borderRadius: 8, background: c.cream,
    color: c.black, outline: 'none', width: '100%',
  },
  btn: {
    fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
    background: c.gold, color: c.black, border: 'none', borderRadius: 8,
    padding: '10px 20px', cursor: 'pointer', whiteSpace: 'nowrap',
  },
  tag: (color) => ({
    fontFamily: 'var(--font-body)', fontSize: 11, padding: '3px 10px', borderRadius: 20,
    background: color === 'green' ? '#eaf5ee' : color === 'blue' ? '#eaf0f8' : '#fdf3e6',
    color: color === 'green' ? '#4a8a5f' : color === 'blue' ? '#4a6fa8' : '#a07828',
  }),
}

const typeColor = { Subscription: 'blue', Tip: 'green', PPV: 'amber' }

function Toast({ message, type }) {
  if (!message) return null
  return (
    <div style={{
      position: 'fixed', bottom: 28, right: 28, zIndex: 999,
      fontFamily: 'var(--font-body)', fontSize: 13,
      padding: '12px 20px', borderRadius: 10,
      background: type === 'error' ? '#c05050' : c.black,
      color: c.cream, boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    }}>
      {message}
    </div>
  )
}

export default function EarningsPage() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [filterCreator, setFilterCreator] = useState('All')
  const [filterType, setFilterType] = useState('All')
  const [deleteConfirm, setDeleteConfirm] = useState(null) // entry id awaiting confirm
  const [toast, setToast] = useState({ message: '', type: 'success' })
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    creator: '',
    type: 'Subscription',
    fan: '',
    amount: '',
  })

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast({ message: '', type: 'success' }), 3500)
  }

const fetchEarnings = async () => {
  setLoading(true)
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) { setLoading(false); return }
  const { data, error } = await supabase
    .from('earnings')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false })
    if (error) showToast('Failed to load earnings', 'error')
    else setEntries(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchEarnings() }, [])

  const handleSave = async () => {
    if (!form.creator.trim()) return showToast('Creator name is required', 'error')
    if (!form.fan.trim()) return showToast('Fan handle is required', 'error')
    if (!form.amount || isNaN(parseFloat(form.amount))) return showToast('Enter a valid amount', 'error')
    setSaving(true)
    const supabase = createClient()
const { data: { user } } = await supabase.auth.getUser()
const { error } = await supabase.from('earnings').insert([{
  date: form.date,
  creator: form.creator.trim(),
  type: form.type,
  fan: form.fan.trim(),
  amount: parseFloat(form.amount),
  user_id: user.id,
}])
    setSaving(false)
    if (error) {
      showToast(error.message, 'error')
    } else {
      showToast('Entry saved ✓')
      setForm({ date: new Date().toISOString().split('T')[0], creator: form.creator, type: 'Subscription', fan: '', amount: '' })
      setShowForm(false)
      fetchEarnings()
    }
  }

  const handleDelete = async (id) => {
    const supabase = createClient()
    const { error } = await supabase.from('earnings').delete().eq('id', id)
    if (error) {
      showToast('Failed to delete entry', 'error')
    } else {
      showToast('Entry deleted')
      setDeleteConfirm(null)
      fetchEarnings()
    }
  }

  const formatDate = (dateStr) => {
    const d = new Date(dateStr + 'T00:00:00')
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
  }

  // ── Derived data ────────────────────────────────────────────────────────────

  const creators = ['All', ...Array.from(new Set(entries.map(e => e.creator))).sort()]

  const filtered = entries.filter(e => {
    const matchCreator = filterCreator === 'All' || e.creator === filterCreator
    const matchType = filterType === 'All' || e.type === filterType
    return matchCreator && matchType
  })

  const grandTotal = entries.reduce((a, b) => a + parseFloat(b.amount), 0)
  const grandSubs  = entries.filter(e => e.type === 'Subscription').reduce((a, b) => a + parseFloat(b.amount), 0)
  const grandPPV   = entries.filter(e => e.type === 'PPV').reduce((a, b) => a + parseFloat(b.amount), 0)
  const grandTips  = entries.filter(e => e.type === 'Tip').reduce((a, b) => a + parseFloat(b.amount), 0)

  const creatorBreakdown = Array.from(new Set(entries.map(e => e.creator)))
    .map(creator => {
      const rows = entries.filter(e => e.creator === creator)
      return {
        creator,
        total: rows.reduce((a, b) => a + parseFloat(b.amount), 0),
        subs:  rows.filter(e => e.type === 'Subscription').reduce((a, b) => a + parseFloat(b.amount), 0),
        ppv:   rows.filter(e => e.type === 'PPV').reduce((a, b) => a + parseFloat(b.amount), 0),
        tips:  rows.filter(e => e.type === 'Tip').reduce((a, b) => a + parseFloat(b.amount), 0),
        entries: rows.length,
      }
    })
    .sort((a, b) => b.total - a.total)

  const topEarner = creatorBreakdown[0] ?? null

  return (
    <div style={s.page}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
        <div>
          <p style={s.pageTitle}>Earnings</p>
          <p style={s.pageSubtitle}>Every pound across your whole roster.</p>
        </div>
        <button style={s.btn} onClick={() => setShowForm(v => !v)}>
          {showForm ? 'Cancel' : '+ Log earning'}
        </button>
      </div>

      {/* ── Log form ── */}
      {showForm && (
        <div style={{ ...s.card, marginBottom: 24, background: c.surface }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, color: c.black, marginBottom: 16 }}>New entry</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
            <div>
              <label style={s.label}>Date</label>
              <input type="date" style={s.input} value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            </div>
            <div>
              <label style={s.label}>Creator</label>
              <input style={s.input} placeholder="@creator_name" value={form.creator}
                onChange={e => setForm(f => ({ ...f, creator: e.target.value }))} />
            </div>
            <div>
              <label style={s.label}>Type</label>
              <select style={s.input} value={form.type}
                onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                <option>Subscription</option>
                <option>PPV</option>
                <option>Tip</option>
              </select>
            </div>
            <div>
              <label style={s.label}>Fan handle</label>
              <input style={s.input} placeholder="fan_name" value={form.fan}
                onChange={e => setForm(f => ({ ...f, fan: e.target.value }))} />
            </div>
            <div>
              <label style={s.label}>Amount ($)</label>
              <input type="number" min="0" step="0.01" style={s.input} placeholder="0.00"
                value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} />
            </div>
          </div>
          <button
            style={{ ...s.btn, marginTop: 16, opacity: saving ? 0.6 : 1 }}
            onClick={handleSave} disabled={saving}
          >
            {saving ? 'Saving…' : 'Save entry'}
          </button>
        </div>
      )}

      {/* ── Grand total cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Total revenue', value: `$${grandTotal.toFixed(2)}` },
          { label: 'Subscriptions', value: `$${grandSubs.toFixed(2)}` },
          { label: 'Pay-per-view', value: `$${grandPPV.toFixed(2)}` },
          { label: 'Tips', value: `$${grandTips.toFixed(2)}` },
          { label: 'Creators tracked', value: creatorBreakdown.length },
          { label: 'Total entries', value: entries.length },
        ].map((stat, i) => (
          <div key={i} style={s.card}>
            <span style={s.label}>{stat.label}</span>
            <p style={s.value}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* ── Per-creator breakdown + top earner ── */}
      {creatorBreakdown.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, marginBottom: 28, alignItems: 'start' }}>

          <div style={s.card}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 400, color: c.black, marginBottom: 20 }}>
              Revenue by creator
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Creator', 'Subscriptions', 'PPV', 'Tips', 'Total', 'Entries'].map(h => (
                    <th key={h} style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: c.muted, textAlign: 'left', padding: '0 16px 12px 0', fontWeight: 400 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {creatorBreakdown.map((row, i) => (
                  <tr
                    key={i}
                    style={{ borderTop: `1px solid ${c.border}`, cursor: 'pointer' }}
                    onClick={() => setFilterCreator(filterCreator === row.creator ? 'All' : row.creator)}
                  >
                    <td style={{ padding: '14px 16px 14px 0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: '50%',
                          background: i === 0 ? c.gold : c.surface,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                          <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: i === 0 ? c.black : c.muted, fontWeight: 500 }}>
                            {row.creator.replace('@', '').slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: c.black, margin: 0 }}>{row.creator}</p>
                          {i === 0 && <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: c.gold, margin: 0 }}>★ Top earner</p>}
                        </div>
                      </div>
                    </td>
                    <td style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted, padding: '14px 16px 14px 0' }}>${row.subs.toFixed(2)}</td>
                    <td style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted, padding: '14px 16px 14px 0' }}>${row.ppv.toFixed(2)}</td>
                    <td style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted, padding: '14px 16px 14px 0' }}>${row.tips.toFixed(2)}</td>
                    <td style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: c.black, padding: '14px 16px 14px 0', fontWeight: 400 }}>${row.total.toFixed(2)}</td>
                    <td style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted, padding: '14px 0' }}>{row.entries}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filterCreator !== 'All' && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${c.border}` }}>
                <button
                  onClick={() => setFilterCreator('All')}
                  style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: c.gold, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  ← Show all creators
                </button>
              </div>
            )}
          </div>

          {topEarner && (
            <div style={{ ...s.card, background: c.black, minWidth: 220 }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a7e6e', marginBottom: 8 }}>
                Top earner
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#F5F0E8', marginBottom: 4 }}>{topEarner.creator}</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 3vw, 36px)', color: c.gold, lineHeight: 1, marginBottom: 20, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                ${topEarner.total.toFixed(2)}
              </p>
              {[
                { label: 'Subs', value: `$${topEarner.subs.toFixed(2)}` },
                { label: 'PPV', value: `$${topEarner.ppv.toFixed(2)}` },
                { label: 'Tips', value: `$${topEarner.tips.toFixed(2)}` },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 2 ? '1px solid #1e1e1e' : 'none' }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#8a7e6e' }}>{row.label}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#F5F0E8' }}>{row.value}</span>
                </div>
              ))}
              <div style={{ marginTop: 16, padding: '10px 12px', background: '#1a1a1a', borderRadius: 8 }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#8a7e6e', margin: 0 }}>
                  {grandTotal > 0 ? `${((topEarner.total / grandTotal) * 100).toFixed(0)}% of total agency revenue` : '—'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Entries table ── */}
      <div style={s.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, color: c.black }}>
            {filterCreator !== 'All' ? `${filterCreator} — entries` : 'All entries'}
            {filtered.length > 0 && (
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted, fontWeight: 400, marginLeft: 8 }}>
                ({filtered.length})
              </span>
            )}
          </p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {creators.map(cr => (
              <button key={cr} onClick={() => setFilterCreator(cr)} style={{
                fontFamily: 'var(--font-body)', fontSize: 12, padding: '5px 12px', borderRadius: 20,
                border: `1px solid ${filterCreator === cr ? c.gold : c.border}`,
                background: filterCreator === cr ? c.gold : 'transparent',
                color: filterCreator === cr ? c.black : c.muted, cursor: 'pointer',
              }}>
                {cr}
              </button>
            ))}
            {creators.length > 1 && <div style={{ width: 1, background: c.border, margin: '0 4px' }} />}
            {['All', 'Subscription', 'PPV', 'Tip'].map(f => (
              <button key={f} onClick={() => setFilterType(f)} style={{
                fontFamily: 'var(--font-body)', fontSize: 12, padding: '5px 12px', borderRadius: 20,
                border: `1px solid ${filterType === f ? '#8a7e6e' : c.border}`,
                background: filterType === f ? '#8a7e6e' : 'transparent',
                color: filterType === f ? '#fff' : c.muted, cursor: 'pointer',
              }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: c.muted, padding: '24px 0', textAlign: 'center' }}>Loading…</p>
        ) : filtered.length === 0 ? (
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: c.muted, padding: '24px 0', textAlign: 'center' }}>
            {entries.length === 0 ? 'No entries yet. Log your first earning above.' : 'No entries match this filter.'}
          </p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Date', 'Creator', 'Type', 'Fan', 'Amount', ''].map((h, i) => (
                  <th key={i} style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: c.muted, textAlign: i === 4 ? 'right' : 'left', padding: '0 0 12px', fontWeight: 400 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id} style={{ borderTop: `1px solid ${c.border}` }}>
                  <td style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted, padding: '12px 12px 12px 0', whiteSpace: 'nowrap' }}>{formatDate(row.date)}</td>
                  <td style={{ padding: '12px 12px 12px 0' }}>
                    <button
                      onClick={() => setFilterCreator(row.creator)}
                      style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.black, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: filterCreator === row.creator ? 'underline' : 'none' }}
                    >
                      {row.creator}
                    </button>
                  </td>
                  <td style={{ padding: '12px 12px 12px 0' }}>
                    <span style={s.tag(typeColor[row.type])}>{row.type}</span>
                  </td>
                  <td style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted, padding: '12px 12px 12px 0' }}>{row.fan}</td>
                  <td style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: c.black, padding: '12px 12px 12px 0', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    ${parseFloat(row.amount).toFixed(2)}
                  </td>
                  {/* ── Delete cell ── */}
                  <td style={{ padding: '12px 0', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    {deleteConfirm === row.id ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <button
                          onClick={() => handleDelete(row.id)}
                          style={{
                            fontFamily: 'var(--font-body)', fontSize: 11, padding: '4px 10px',
                            background: '#c05050', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer',
                          }}
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          style={{
                            fontFamily: 'var(--font-body)', fontSize: 11, padding: '4px 10px',
                            background: 'transparent', color: c.muted, border: `1px solid ${c.border}`, borderRadius: 6, cursor: 'pointer',
                          }}
                        >
                          Cancel
                        </button>
                      </span>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(row.id)}
                        title="Delete entry"
                        style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          color: c.border, padding: '4px 6px', borderRadius: 6,
                          fontSize: 14, lineHeight: 1,
                          transition: 'color 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#c05050'}
                        onMouseLeave={e => e.currentTarget.style.color = c.border}
                      >
                        ✕
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            {filtered.length > 1 && (
              <tfoot>
                <tr style={{ borderTop: `2px solid ${c.border}` }}>
                  <td colSpan={4} style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: c.muted, padding: '12px 0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {filterCreator !== 'All' ? `${filterCreator} total` : 'Filtered total'}
                  </td>
                  <td style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: c.black, padding: '12px 12px 12px 0', textAlign: 'right' }}>
                    ${filtered.reduce((a, b) => a + parseFloat(b.amount), 0).toFixed(2)}
                  </td>
                  <td />
                </tr>
              </tfoot>
            )}
          </table>
        )}
      </div>

      <Toast message={toast.message} type={toast.type} />
    </div>
  )
}