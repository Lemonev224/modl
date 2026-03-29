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
}

const entries = [
  { date: '29 Mar', type: 'Subscription', fan: 'fan_blue22', amount: 12.00 },
  { date: '29 Mar', type: 'Tip', fan: 'fan_x99', amount: 25.00 },
  { date: '28 Mar', type: 'PPV', fan: 'fan_rose7', amount: 18.00 },
  { date: '28 Mar', type: 'Subscription', fan: 'fan_dark11', amount: 12.00 },
  { date: '27 Mar', type: 'Tip', fan: 'fan_x99', amount: 50.00 },
  { date: '27 Mar', type: 'PPV', fan: 'fan_nova3', amount: 8.00 },
  { date: '26 Mar', type: 'Subscription', fan: 'fan_zee', amount: 12.00 },
  { date: '25 Mar', type: 'PPV', fan: 'fan_blue22', amount: 18.00 },
]

const typeColor = { Subscription: 'blue', Tip: 'green', PPV: 'amber' }

const months = [
  { month: 'Jan', subs: 980, ppv: 420, tips: 140 },
  { month: 'Feb', subs: 1100, ppv: 560, tips: 210 },
  { month: 'Mar', subs: 1620, ppv: 840, tips: 380 },
]

export default function EarningsPage() {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ date: '', type: 'Subscription', fan: '', amount: '' })
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? entries : entries.filter(e => e.type === filter)
  const total = entries.reduce((a, b) => a + b.amount, 0)
  const subs = entries.filter(e => e.type === 'Subscription').reduce((a, b) => a + b.amount, 0)
  const ppv = entries.filter(e => e.type === 'PPV').reduce((a, b) => a + b.amount, 0)
  const tips = entries.filter(e => e.type === 'Tip').reduce((a, b) => a + b.amount, 0)

  return (
    <div style={s.page}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
        <div>
          <p style={s.pageTitle}>Earnings</p>
          <p style={s.pageSubtitle}>Every pound in one place.</p>
        </div>
        <button style={s.btn} onClick={() => setShowForm(v => !v)}>
          {showForm ? 'Cancel' : '+ Log earning'}
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
              <label style={s.label}>Type</label>
              <select style={s.input} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                <option>Subscription</option><option>PPV</option><option>Tip</option>
              </select>
            </div>
            <div>
              <label style={s.label}>Fan handle</label>
              <input style={s.input} placeholder="fan_name" value={form.fan} onChange={e => setForm(f => ({ ...f, fan: e.target.value }))} />
            </div>
            <div>
              <label style={s.label}>Amount (£)</label>
              <input type="number" style={s.input} placeholder="0.00" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} />
            </div>
          </div>
          <button style={{ ...s.btn, marginTop: 16 }}>Save entry</button>
        </div>
      )}

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Total (this month)', value: `£${total.toFixed(2)}` },
          { label: 'Subscriptions', value: `£${subs.toFixed(2)}` },
          { label: 'Pay-per-view', value: `£${ppv.toFixed(2)}` },
          { label: 'Tips', value: `£${tips.toFixed(2)}` },
        ].map((stat, i) => (
          <div key={i} style={s.card}>
            <span style={s.label}>{stat.label}</span>
            <p style={s.value}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 28 }}>
        {/* Monthly trend */}
        <div style={s.card}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, color: c.black, marginBottom: 20 }}>Monthly trend</p>
          <div style={{ display: 'flex', gap: 20 }}>
            {months.map((m, i) => {
              const total = m.subs + m.ppv + m.tips
              const max = 2840
              return (
                <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ height: 100, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 2, marginBottom: 8 }}>
                    <div style={{ height: `${(m.tips / max) * 100}%`, background: '#f0c070', borderRadius: '2px 2px 0 0' }} />
                    <div style={{ height: `${(m.ppv / max) * 100}%`, background: c.gold }} />
                    <div style={{ height: `${(m.subs / max) * 100}%`, background: '#5a8a6f' }} />
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: c.muted }}>{m.month}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: c.black, fontWeight: 500 }}>£{total}</p>
                </div>
              )
            })}
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            {[{ label: 'Subs', color: '#5a8a6f' }, { label: 'PPV', color: c.gold }, { label: 'Tips', color: '#f0c070' }].map((l, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: l.color }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: c.muted }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Projected */}
        <div style={{ ...s.card, background: c.black }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, color: '#F5F0E8', marginBottom: 8 }}>Projected earnings</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#8a7e6e', marginBottom: 24 }}>Based on current growth rate</p>
          {[
            { label: 'Next month', value: '£3,180' },
            { label: '3 months', value: '£10,200' },
            { label: '12 months', value: '£45,600' },
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < 2 ? '1px solid #1e1e1e' : 'none' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#8a7e6e' }}>{row.label}</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: c.gold }}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Entries table */}
      <div style={s.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, color: c.black }}>Entries</p>
          <div style={{ display: 'flex', gap: 6 }}>
            {['All', 'Subscription', 'PPV', 'Tip'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                fontFamily: 'var(--font-body)', fontSize: 12, padding: '5px 12px', borderRadius: 20,
                border: `1px solid ${filter === f ? c.gold : c.border}`,
                background: filter === f ? c.gold : 'transparent',
                color: filter === f ? c.black : c.muted, cursor: 'pointer',
              }}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Date', 'Type', 'Fan', 'Amount'].map(h => (
                <th key={h} style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: c.muted, textAlign: 'left', padding: '0 0 12px', fontWeight: 400 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i} style={{ borderTop: `1px solid ${c.border}` }}>
                <td style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted, padding: '12px 0' }}>{row.date}</td>
                <td style={{ padding: '12px 0' }}><span style={s.tag(typeColor[row.type])}>{row.type}</span></td>
                <td style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.black, padding: '12px 0' }}>{row.fan}</td>
                <td style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: c.black, padding: '12px 0', textAlign: 'right' }}>£{row.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}