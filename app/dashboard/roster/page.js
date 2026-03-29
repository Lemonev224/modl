'use client'

import { useState } from 'react'

const c = { cream: '#F5F0E8', gold: '#C9A96E', black: '#0e0e0e', muted: '#8a7e6e', border: '#DDD8CE', surface: '#EDE8DF' }

const s = {
  page: { padding: 'clamp(28px, 4vw, 48px)', maxWidth: 1100 },
  pageTitle: { fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400, color: c.black, marginBottom: 4 },
  pageSubtitle: { fontFamily: 'var(--font-body), sans-serif', fontSize: 14, color: c.muted, marginBottom: 36 },
  card: { background: '#fff', border: `1px solid ${c.border}`, borderRadius: 16, padding: '24px 28px' },
  label: { fontFamily: 'var(--font-body), sans-serif', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: c.muted, marginBottom: 8, display: 'block' },
  value: { fontFamily: 'var(--font-display), Georgia, serif', fontSize: 36, fontWeight: 400, color: c.black, lineHeight: 1 },
  tag: (color) => ({
    fontFamily: 'var(--font-body)', fontSize: 11, padding: '3px 10px', borderRadius: 20,
    background: color === 'green' ? '#eaf5ee' : color === 'blue' ? '#eaf0f8' : '#fdf3e6',
    color: color === 'green' ? '#4a8a5f' : color === 'blue' ? '#4a6fa8' : '#a07828',
  }),
  input: { fontFamily: 'var(--font-body)', fontSize: 14, padding: '10px 14px', border: `1px solid ${c.border}`, borderRadius: 8, background: c.cream, color: c.black, outline: 'none', width: '100%' },
  btn: { fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, background: c.gold, color: c.black, border: 'none', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', whiteSpace: 'nowrap' },
}

// Creators on the roster — in production these come from your DB
const rosterCreators = [
  { id: 1, name: 'Scarlett R.', handle: '@scarlettrose', cut: 35 },
  { id: 2, name: 'Luna M.', handle: '@lunamoon', cut: 30 },
  { id: 3, name: 'Jade K.', handle: '@jadekiss', cut: 30 },
  { id: 4, name: 'Nova B.', handle: '@novabella', cut: 40 },
]

const initialEntries = [
  { id: 1, date: '29 Mar', creatorId: 1, creator: 'Scarlett R.', type: 'Subscription', amount: 1200, cut: 35 },
  { id: 2, date: '29 Mar', creatorId: 2, creator: 'Luna M.', type: 'PPV', amount: 480, cut: 30 },
  { id: 3, date: '28 Mar', creatorId: 1, creator: 'Scarlett R.', type: 'Tips', amount: 320, cut: 35 },
  { id: 4, date: '27 Mar', creatorId: 3, creator: 'Jade K.', type: 'Subscription', amount: 600, cut: 30 },
  { id: 5, date: '26 Mar', creatorId: 4, creator: 'Nova B.', type: 'Subscription', amount: 220, cut: 40 },
  { id: 6, date: '25 Mar', creatorId: 2, creator: 'Luna M.', type: 'Tips', amount: 150, cut: 30 },
]

const typeColor = { Subscription: 'blue', Tips: 'green', PPV: 'amber' }

const months = [
  { month: 'Jan', total: 5800 },
  { month: 'Feb', total: 7200 },
  { month: 'Mar', total: 9700 },
]
const maxMonth = Math.max(...months.map(m => m.total))

export default function EarningsPage() {
  const [entries, setEntries] = useState(initialEntries)
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState('All')
  const [creatorFilter, setCreatorFilter] = useState('All')
  const [form, setForm] = useState({ date: '', creatorId: '', type: 'Subscription', amount: '' })

  // Auto-fill cut from selected creator
  const selectedCreator = rosterCreators.find(c => c.id === parseInt(form.creatorId))

  const addEntry = () => {
    if (!form.date || !form.creatorId || !form.amount) return
    const creator = rosterCreators.find(c => c.id === parseInt(form.creatorId))
    const newEntry = {
      id: Date.now(),
      date: form.date,
      creatorId: creator.id,
      creator: creator.name,
      type: form.type,
      amount: parseFloat(form.amount),
      cut: creator.cut,
    }
    setEntries(prev => [newEntry, ...prev])
    setForm({ date: '', creatorId: '', type: 'Subscription', amount: '' })
    setShowForm(false)
  }

  // Filtering
  const filtered = entries.filter(e => {
    const matchType = filter === 'All' || e.type === filter
    const matchCreator = creatorFilter === 'All' || e.creator === creatorFilter
    return matchType && matchCreator
  })

  // Totals
  const totalRevenue = entries.reduce((a, b) => a + b.amount, 0)
  const agencyRevenue = entries.reduce((a, b) => a + (b.amount * b.cut / 100), 0)
  const creatorRevenue = totalRevenue - agencyRevenue

  return (
    <div style={s.page}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
        <div>
          <p style={s.pageTitle}>Earnings</p>
          <p style={s.pageSubtitle}>All creator revenue. Agency splits calculated automatically.</p>
        </div>
        <button style={s.btn} onClick={() => setShowForm(v => !v)}>
          {showForm ? 'Cancel' : '+ Log earnings'}
        </button>
      </div>

      {/* Log form */}
      {showForm && (
        <div style={{ ...s.card, marginBottom: 24, background: c.surface }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, color: c.black, marginBottom: 16 }}>New entry</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
            <div>
              <label style={s.label}>Date</label>
              <input type="date" style={s.input} value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            </div>
            <div>
              <label style={s.label}>Creator</label>
              <select style={s.input} value={form.creatorId} onChange={e => setForm(f => ({ ...f, creatorId: e.target.value }))}>
                <option value="">Select creator</option>
                {rosterCreators.map(cr => (
                  <option key={cr.id} value={cr.id}>{cr.name} ({cr.handle})</option>
                ))}
              </select>
            </div>
            <div>
              <label style={s.label}>Type</label>
              <select style={s.input} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                <option>Subscription</option><option>PPV</option><option>Tips</option>
              </select>
            </div>
            <div>
              <label style={s.label}>Amount (£)</label>
              <input type="number" style={s.input} placeholder="0.00" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} />
            </div>
          </div>

          {/* Live split preview */}
          {selectedCreator && form.amount && (
            <div style={{ marginTop: 16, padding: '14px 16px', background: '#fff', border: `1px solid ${c.border}`, borderRadius: 10, display: 'flex', gap: 28 }}>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: c.muted, marginBottom: 2 }}>Agency receives</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: c.gold }}>£{(parseFloat(form.amount) * selectedCreator.cut / 100).toFixed(2)}</p>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: c.muted, marginBottom: 2 }}>Creator receives</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: c.black }}>£{(parseFloat(form.amount) * (1 - selectedCreator.cut / 100)).toFixed(2)}</p>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: c.muted, marginBottom: 2 }}>Rate</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: c.muted }}>{selectedCreator.cut}%</p>
              </div>
            </div>
          )}

          <button style={{ ...s.btn, marginTop: 16 }} onClick={addEntry}>Save entry</button>
        </div>
      )}

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Total creator revenue', value: `£${totalRevenue.toLocaleString()}` },
          { label: 'Agency revenue', value: `£${Math.round(agencyRevenue).toLocaleString()}` },
          { label: 'Creator payouts', value: `£${Math.round(creatorRevenue).toLocaleString()}` },
          { label: 'Entries logged', value: entries.length },
        ].map((stat, i) => (
          <div key={i} style={{ ...s.card, borderColor: i === 1 ? c.gold : c.border }}>
            <span style={s.label}>{stat.label}</span>
            <p style={{ ...s.value, color: i === 1 ? c.gold : c.black }}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 28 }}>

        {/* Monthly trend */}
        <div style={s.card}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, color: c.black, marginBottom: 20 }}>Monthly roster revenue</p>
          <div style={{ display: 'flex', gap: 20, height: 100, alignItems: 'flex-end' }}>
            {months.map((m, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ height: `${(m.total / maxMonth) * 90}px`, background: i === months.length - 1 ? c.gold : c.border, borderRadius: '4px 4px 0 0', marginBottom: 8 }} />
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: c.muted }}>{m.month}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: c.black, fontWeight: 500 }}>£{m.total.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Per-creator breakdown */}
        <div style={s.card}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, color: c.black, marginBottom: 16 }}>By creator</p>
          {rosterCreators.map(cr => {
            const crEntries = entries.filter(e => e.creatorId === cr.id)
            const crTotal = crEntries.reduce((a, b) => a + b.amount, 0)
            const crCut = crEntries.reduce((a, b) => a + (b.amount * b.cut / 100), 0)
            const pct = totalRevenue > 0 ? (crTotal / totalRevenue) * 100 : 0
            return (
              <div key={cr.id} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.black }}>{cr.name}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted }}>
                    £{crTotal.toLocaleString()} · <span style={{ color: c.gold }}>£{Math.round(crCut).toLocaleString()}</span>
                  </span>
                </div>
                <div style={{ height: 6, borderRadius: 4, background: c.border, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: c.gold, borderRadius: 4 }} />
                </div>
              </div>
            )
          })}
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: c.muted, marginTop: 8 }}>
            Revenue · <span style={{ color: c.gold }}>Agency cut</span>
          </p>
        </div>
      </div>

      {/* Entries table */}
      <div style={s.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, color: c.black }}>All entries</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <select
              style={{ ...s.input, width: 'auto', fontSize: 12, padding: '5px 10px' }}
              value={creatorFilter}
              onChange={e => setCreatorFilter(e.target.value)}
            >
              <option value="All">All creators</option>
              {rosterCreators.map(cr => <option key={cr.id}>{cr.name}</option>)}
            </select>
            {['All', 'Subscription', 'PPV', 'Tips'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                fontFamily: 'var(--font-body)', fontSize: 12, padding: '5px 12px', borderRadius: 20,
                border: `1px solid ${filter === f ? c.gold : c.border}`,
                background: filter === f ? c.gold : 'transparent',
                color: filter === f ? c.black : c.muted, cursor: 'pointer',
              }}>{f}</button>
            ))}
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Date', 'Creator', 'Type', 'Total', 'Agency cut', 'Creator payout'].map(h => (
                <th key={h} style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: c.muted, textAlign: 'left', padding: '0 0 12px', fontWeight: 400 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => {
              const agencyCut = row.amount * row.cut / 100
              const creatorPayout = row.amount - agencyCut
              return (
                <tr key={row.id} style={{ borderTop: `1px solid ${c.border}` }}>
                  <td style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted, padding: '12px 0' }}>{row.date}</td>
                  <td style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.black, padding: '12px 12px 12px 0' }}>{row.creator}</td>
                  <td style={{ padding: '12px 12px 12px 0' }}><span style={s.tag(typeColor[row.type])}>{row.type}</span></td>
                  <td style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: c.black, padding: '12px 12px 12px 0' }}>£{row.amount.toLocaleString()}</td>
                  <td style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: c.gold, padding: '12px 12px 12px 0' }}>£{Math.round(agencyCut).toLocaleString()}</td>
                  <td style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: c.muted, padding: '12px 0' }}>£{Math.round(creatorPayout).toLocaleString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}