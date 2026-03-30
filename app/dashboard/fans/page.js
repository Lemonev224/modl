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

const fans = [
  { handle: 'fan_x99', spent: 284, subMonths: 8, flagged: true, priority: true, note: 'Big tipper — sends $25+ regularly. Always responds to PPV.', lastActive: '2h ago', tags: ['big tipper', 'PPV buyer'] },
  { handle: 'fan_blue22', spent: 156, subMonths: 5, flagged: false, priority: true, note: 'Buys every PPV. Prefers photo sets.', lastActive: '1d ago', tags: ['PPV buyer'] },
  { handle: 'fan_rose7', spent: 132, subMonths: 4, flagged: false, priority: false, note: '', lastActive: '3d ago', tags: [] },
  { handle: 'fan_nova3', spent: 96, subMonths: 3, flagged: false, priority: false, note: 'Mentioned he\'s a nurse — night shift. Post later in the evening.', lastActive: '5d ago', tags: [] },
  { handle: 'fan_dark11', spent: 84, subMonths: 6, flagged: true, priority: false, note: 'Sometimes rude. Keep interactions brief.', lastActive: '1d ago', tags: ['handle with care'] },
  { handle: 'fan_zee', spent: 60, subMonths: 2, flagged: false, priority: false, note: '', lastActive: '2d ago', tags: [] },
]

const templates = [
  { label: 'Welcome new sub', text: 'Hey! So glad you\'re here 🖤 Let me know if you have any requests — I love hearing from my fans.' },
  { label: 'PPV follow-up', text: 'Hope you enjoyed that one! I have more dropping soon — keep an eye out 👀' },
  { label: 'Re-engage lapsed fan', text: 'Hey, missed you! I have some really good content this week if you want to check it out.' },
  { label: 'Thank you tip', text: 'That tip honestly made my day, thank you so much! You\'re one of my favourites 🙏' },
]

export default function FansPage() {
  const [selectedFan, setSelectedFan] = useState(null)
  const [search, setSearch] = useState('')
  const [showTemplates, setShowTemplates] = useState(false)
  const [copiedIdx, setCopiedIdx] = useState(null)

  const filtered = fans.filter(f => f.handle.includes(search.toLowerCase()))
  const fan = selectedFan !== null ? fans.find(f => f.handle === selectedFan) : null

  const copyTemplate = (text, i) => {
    navigator.clipboard.writeText(text)
    setCopiedIdx(i)
    setTimeout(() => setCopiedIdx(null), 1500)
  }

  return (
    <div style={s.page}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
        <div>
          <p style={s.pageTitle}>Fan CRM</p>
          <p style={s.pageSubtitle}>Know your fans. Never burn out.</p>
        </div>
        <button style={s.btn} onClick={() => setShowTemplates(v => !v)}>
          {showTemplates ? 'Hide templates' : 'Message templates'}
        </button>
      </div>

      {/* Templates panel */}
      {showTemplates && (
        <div style={{ ...s.card, marginBottom: 24, background: c.surface }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, color: c.black, marginBottom: 16 }}>Message templates</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
            {templates.map((t, i) => (
              <div key={i} style={{ background: '#fff', border: `1px solid ${c.border}`, borderRadius: 10, padding: '14px 16px' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: c.muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>{t.label}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.black, lineHeight: 1.5, marginBottom: 10 }}>{t.text}</p>
                <button
                  onClick={() => copyTemplate(t.text, i)}
                  style={{ fontFamily: 'var(--font-body)', fontSize: 11, padding: '5px 12px', borderRadius: 6, border: `1px solid ${c.border}`, background: 'transparent', color: copiedIdx === i ? '#4a8a5f' : c.muted, cursor: 'pointer' }}
                >
                  {copiedIdx === i ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Total fans', value: fans.length },
          { label: 'Priority fans', value: fans.filter(f => f.priority).length },
          { label: 'Flagged', value: fans.filter(f => f.flagged).length },
          { label: 'Avg spend', value: `$${Math.round(fans.reduce((a, b) => a + b.spent, 0) / fans.length)}` },
        ].map((stat, i) => (
          <div key={i} style={s.card}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: c.muted, display: 'block', marginBottom: 6 }}>{stat.label}</span>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 400, color: c.black }}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: fan ? '1fr 340px' : '1fr', gap: 20 }}>
        {/* Fan list */}
        <div style={s.card}>
          <div style={{ marginBottom: 16 }}>
            <input
              style={s.input}
              placeholder="Search fans..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {filtered.map((f, i) => (
              <div
                key={f.handle}
                onClick={() => setSelectedFan(f.handle === selectedFan ? null : f.handle)}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '14px 12px', borderRadius: 10, cursor: 'pointer',
                  background: selectedFan === f.handle ? '#fff8ef' : 'transparent',
                  border: `1px solid ${selectedFan === f.handle ? c.gold : 'transparent'}`,
                  marginBottom: 4,
                  transition: 'background 0.15s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: f.priority ? c.gold : c.surface,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: f.priority ? c.black : c.muted, fontWeight: 500 }}>
                      {f.handle.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: c.black, margin: '0 0 2px', display: 'flex', alignItems: 'center', gap: 6 }}>
                      {f.handle}
                      {f.priority && <span style={{ fontSize: 10, color: c.gold }}>★ Priority</span>}
                      {f.flagged && <span style={{ fontSize: 10, color: '#c05050', background: '#fde8e8', padding: '1px 6px', borderRadius: 10 }}>⚠ Flagged</span>}
                    </p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: c.muted, margin: 0 }}>
                      {f.subMonths} months · Last active {f.lastActive}
                    </p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: c.black, margin: '0 0 2px' }}>${f.spent}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: c.muted, margin: 0 }}>total spent</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fan detail panel */}
        {fan && (
          <div style={s.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 400, color: c.black, marginBottom: 2 }}>{fan.handle}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: c.muted }}>Active {fan.lastActive}</p>
              </div>
              <button onClick={() => setSelectedFan(null)} style={{ background: 'none', border: 'none', color: c.muted, cursor: 'pointer', fontSize: 18, lineHeight: 1 }}>×</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              {[
                { label: 'Total spent', value: `$${fan.spent}` },
                { label: 'Subscribed', value: `${fan.subMonths} months` },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${c.border}` }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: c.muted }}>{row.label}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: c.black }}>{row.value}</span>
                </div>
              ))}
            </div>

            {fan.tags.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: c.muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Tags</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {fan.tags.map((tag, i) => (
                    <span key={i} style={{ fontFamily: 'var(--font-body)', fontSize: 11, padding: '3px 10px', borderRadius: 20, background: c.surface, color: c.muted }}>{tag}</span>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginBottom: 20 }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: c.muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Notes</p>
              <textarea
                defaultValue={fan.note}
                placeholder="Add a note about this fan..."
                style={{ ...s.input, height: 90, resize: 'none', lineHeight: 1.5 }}
              />
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button style={s.btn}>Save note</button>
              <button style={{ ...s.btn, background: 'transparent', border: `1px solid ${c.border}`, color: c.muted }}>
                {fan.priority ? 'Remove priority' : '★ Mark priority'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}