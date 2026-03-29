'use client'

import { useState } from 'react'

const c = { cream: '#F5F0E8', gold: '#C9A96E', black: '#0e0e0e', muted: '#8a7e6e', border: '#DDD8CE', surface: '#EDE8DF' }

const s = {
  page: { padding: 'clamp(28px, 4vw, 48px)', maxWidth: 1100 },
  pageTitle: { fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400, color: c.black, marginBottom: 4 },
  pageSubtitle: { fontFamily: 'var(--font-body), sans-serif', fontSize: 14, color: c.muted, marginBottom: 36 },
  card: { background: '#fff', border: `1px solid ${c.border}`, borderRadius: 16, padding: '24px 28px' },
  input: { fontFamily: 'var(--font-body)', fontSize: 14, padding: '10px 14px', border: `1px solid ${c.border}`, borderRadius: 8, background: c.cream, color: c.black, outline: 'none', width: '100%' },
  label: { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: c.muted, marginBottom: 6, display: 'block' },
  btn: { fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, background: c.gold, color: c.black, border: 'none', borderRadius: 8, padding: '10px 20px', cursor: 'pointer' },
}

const promos = [
  { date: '20 Mar', type: 'Shoutout', platform: 'Instagram', partner: '@creator_tips', spent: 150, gained: 28, converted: 14, note: 'Micro influencer in OF tips niche. High conversion.' },
  { date: '15 Mar', type: 'Reddit', platform: 'Reddit', partner: 'r/onlyfans101', spent: 0, gained: 42, converted: 8, note: 'Free post. Decent reach, low conversion as expected.' },
  { date: '10 Mar', type: 'Collab', platform: 'OnlyFans', partner: '@creator_rose', spent: 0, gained: 19, converted: 11, note: 'Mutual shoutout. Good ROI.' },
  { date: '5 Mar', type: 'Shoutout', platform: 'Twitter/X', partner: '@x_creator', spent: 80, gained: 11, converted: 2, note: 'Poor conversion. Twitter audience doesn\'t convert well.' },
  { date: '1 Mar', type: 'Reddit', platform: 'Reddit', partner: 'r/onlyfansadvice', spent: 0, gained: 31, converted: 5, note: 'Free post. Solid reach.' },
]

const typeColor = { Shoutout: '#eaf0f8', Reddit: '#fdf3e6', Collab: '#eaf5ee' }
const typeText = { Shoutout: '#4a6fa8', Reddit: '#a07828', Collab: '#4a8a5f' }

export default function PromotionsPage() {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ date: '', type: 'Shoutout', platform: '', partner: '', spent: '', gained: '', converted: '', note: '' })

  const totalSpent = promos.reduce((a, b) => a + b.spent, 0)
  const totalGained = promos.reduce((a, b) => a + b.gained, 0)
  const totalConverted = promos.reduce((a, b) => a + b.converted, 0)
  const roi = totalSpent > 0 ? ((totalConverted * 25) / totalSpent * 100).toFixed(0) : '∞'

  const bestPromo = [...promos].sort((a, b) => b.converted - a.converted)[0]

  return (
    <div style={s.page}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
        <div>
          <p style={s.pageTitle}>Promotions</p>
          <p style={s.pageSubtitle}>Track what works. Stop wasting money.</p>
        </div>
        <button style={s.btn} onClick={() => setShowForm(v => !v)}>
          {showForm ? 'Cancel' : '+ Log promotion'}
        </button>
      </div>

      {/* Log form */}
      {showForm && (
        <div style={{ ...s.card, marginBottom: 24, background: c.surface }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, color: c.black, marginBottom: 16 }}>New promotion</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
            <div>
              <label style={s.label}>Date</label>
              <input type="date" style={s.input} value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            </div>
            <div>
              <label style={s.label}>Type</label>
              <select style={s.input} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                <option>Shoutout</option><option>Reddit</option><option>Collab</option>
              </select>
            </div>
            <div>
              <label style={s.label}>Platform</label>
              <input style={s.input} placeholder="Instagram, Reddit..." value={form.platform} onChange={e => setForm(f => ({ ...f, platform: e.target.value }))} />
            </div>
            <div>
              <label style={s.label}>Partner / Post</label>
              <input style={s.input} placeholder="@handle or r/sub" value={form.partner} onChange={e => setForm(f => ({ ...f, partner: e.target.value }))} />
            </div>
            <div>
              <label style={s.label}>Amount spent (£)</label>
              <input type="number" style={s.input} placeholder="0" value={form.spent} onChange={e => setForm(f => ({ ...f, spent: e.target.value }))} />
            </div>
            <div>
              <label style={s.label}>New followers</label>
              <input type="number" style={s.input} placeholder="0" value={form.gained} onChange={e => setForm(f => ({ ...f, gained: e.target.value }))} />
            </div>
            <div>
              <label style={s.label}>Converted to subs</label>
              <input type="number" style={s.input} placeholder="0" value={form.converted} onChange={e => setForm(f => ({ ...f, converted: e.target.value }))} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={s.label}>Notes</label>
              <input style={s.input} placeholder="Did it work? Would you do it again?" value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} />
            </div>
          </div>
          <button style={{ ...s.btn, marginTop: 16 }}>Save promotion</button>
        </div>
      )}

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Total spent', value: `£${totalSpent}` },
          { label: 'Followers gained', value: totalGained },
          { label: 'Converted to subs', value: totalConverted },
          { label: 'Est. ROI', value: `${roi}%` },
        ].map((stat, i) => (
          <div key={i} style={s.card}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: c.muted, display: 'block', marginBottom: 8 }}>{stat.label}</span>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 400, color: i === 3 ? '#4a8a5f' : c.black, lineHeight: 1 }}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 28 }}>
        {/* Best performer */}
        <div style={{ ...s.card, background: c.black }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a7e6e', marginBottom: 8 }}>Best performer</p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#F5F0E8', marginBottom: 4 }}>{bestPromo.partner}</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#8a7e6e', marginBottom: 20 }}>{bestPromo.platform} · {bestPromo.type}</p>
          <div style={{ display: 'flex', gap: 20 }}>
            {[
              { label: 'Spent', value: bestPromo.spent > 0 ? `£${bestPromo.spent}` : 'Free' },
              { label: 'Gained', value: bestPromo.gained },
              { label: 'Converted', value: bestPromo.converted },
            ].map((s, i) => (
              <div key={i}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: c.gold, lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#8a7e6e' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion by type */}
        <div style={s.card}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, color: c.black, marginBottom: 16 }}>Conversion by type</p>
          {['Shoutout', 'Reddit', 'Collab'].map(type => {
            const items = promos.filter(p => p.type === type)
            const gained = items.reduce((a, b) => a + b.gained, 0)
            const converted = items.reduce((a, b) => a + b.converted, 0)
            const rate = gained > 0 ? ((converted / gained) * 100).toFixed(0) : 0
            return (
              <div key={type} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.black }}>{type}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted }}>{rate}% conversion</span>
                </div>
                <div style={{ height: 6, borderRadius: 4, background: c.border, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${rate}%`, background: typeColor[type] ? typeText[type] : c.gold, borderRadius: 4, opacity: 0.8 }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Promotions table */}
      <div style={s.card}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 400, color: c.black, marginBottom: 20 }}>All promotions</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
            <thead>
              <tr>
                {['Date', 'Type', 'Partner', 'Spent', 'Gained', 'Converted', 'Rate', 'Notes'].map(h => (
                  <th key={h} style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: c.muted, textAlign: 'left', padding: '0 12px 12px 0', fontWeight: 400, whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {promos.map((row, i) => {
                const rate = row.gained > 0 ? ((row.converted / row.gained) * 100).toFixed(0) : 0
                return (
                  <tr key={i} style={{ borderTop: `1px solid ${c.border}` }}>
                    <td style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted, padding: '12px 12px 12px 0', whiteSpace: 'nowrap' }}>{row.date}</td>
                    <td style={{ padding: '12px 12px 12px 0' }}>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, padding: '3px 8px', borderRadius: 10, background: typeColor[row.type], color: typeText[row.type] }}>{row.type}</span>
                    </td>
                    <td style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.black, padding: '12px 12px 12px 0', whiteSpace: 'nowrap' }}>{row.partner}</td>
                    <td style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.black, padding: '12px 12px 12px 0' }}>{row.spent > 0 ? `£${row.spent}` : '—'}</td>
                    <td style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.black, padding: '12px 12px 12px 0' }}>{row.gained}</td>
                    <td style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.black, padding: '12px 12px 12px 0' }}>{row.converted}</td>
                    <td style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: rate >= 40 ? '#4a8a5f' : rate >= 20 ? c.gold : '#c05050', padding: '12px 12px 12px 0', fontWeight: 500 }}>{rate}%</td>
                    <td style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: c.muted, padding: '12px 0', maxWidth: 200 }}>{row.note}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}