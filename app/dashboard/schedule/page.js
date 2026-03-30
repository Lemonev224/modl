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

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const scheduled = {
  1: [{ title: 'BTS photo set', time: '7:00 PM', status: 'scheduled' }],
  3: [{ title: 'Exclusive video drop', time: '6:00 PM', status: 'scheduled' }, { title: 'Story update', time: '9:00 PM', status: 'scheduled' }],
  5: [{ title: 'Behind the scenes reel', time: '5:30 PM', status: 'scheduled' }],
  6: [{ title: 'Weekend special PPV', time: '8:00 PM', status: 'scheduled' }],
  10: [{ title: 'Morning photo set', time: '10:00 AM', status: 'draft' }],
  13: [{ title: 'Fan request content', time: '7:00 PM', status: 'scheduled' }],
}

const queue = [
  { title: 'BTS photo set', date: 'Mon 1 Apr', time: '7:00 PM', type: 'Photo', note: 'High engagement expected' },
  { title: 'Exclusive video drop', date: 'Wed 3 Apr', time: '6:00 PM', type: 'Video', note: '' },
  { title: 'Story update', date: 'Wed 3 Apr', time: '9:00 PM', type: 'Story', note: 'Link to PPV' },
  { title: 'Behind the scenes reel', date: 'Fri 5 Apr', time: '5:30 PM', type: 'Video', note: '' },
  { title: 'Weekend special PPV', date: 'Sat 6 Apr', time: '8:00 PM', type: 'PPV', note: '$15 price point' },
]

const typeColor = { Photo: '#eaf0f8', Video: '#eaf5ee', Story: '#fdf3e6', PPV: '#fde8e6' }
const typeText = { Photo: '#4a6fa8', Video: '#4a8a5f', Story: '#a07828', PPV: '#a04a4a' }

export default function SchedulePage() {
  const [showForm, setShowForm] = useState(false)
  const [view, setView] = useState('calendar')
  const [form, setForm] = useState({ title: '', date: '', time: '', type: 'Photo', note: '' })
  const [selectedDay, setSelectedDay] = useState(null)

  const today = 29
  const daysInMonth = 30
  const startOffset = 0

  return (
    <div style={s.page}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
        <div>
          <p style={s.pageTitle}>Content Schedule</p>
          <p style={s.pageSubtitle}>Plan weeks ahead. Never scramble again.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['calendar', 'queue'].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              fontFamily: 'var(--font-body)', fontSize: 12, padding: '7px 14px', borderRadius: 8,
              border: `1px solid ${view === v ? c.gold : c.border}`,
              background: view === v ? c.gold : 'transparent',
              color: view === v ? c.black : c.muted, cursor: 'pointer', textTransform: 'capitalize',
            }}>{v}</button>
          ))}
          <button style={s.btn} onClick={() => setShowForm(v => !v)}>
            {showForm ? 'Cancel' : '+ New post'}
          </button>
        </div>
      </div>

      {/* New post form */}
      {showForm && (
        <div style={{ ...s.card, marginBottom: 24, background: c.surface }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, color: c.black, marginBottom: 16 }}>Schedule a post</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={s.label}>Title</label>
              <input style={s.input} placeholder="What's this post?" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            </div>
            <div>
              <label style={s.label}>Date</label>
              <input type="date" style={s.input} value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            </div>
            <div>
              <label style={s.label}>Time</label>
              <input type="time" style={s.input} value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} />
            </div>
            <div>
              <label style={s.label}>Type</label>
              <select style={s.input} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                <option>Photo</option><option>Video</option><option>Story</option><option>PPV</option>
              </select>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={s.label}>Notes</label>
              <input style={s.input} placeholder="Optional notes..." value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} />
            </div>
          </div>
          <button style={{ ...s.btn, marginTop: 16 }}>Schedule post</button>
        </div>
      )}

      {/* Calendar view */}
      {view === 'calendar' && (
        <div style={s.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 400, color: c.black }}>April 2026</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ background: 'none', border: `1px solid ${c.border}`, borderRadius: 6, padding: '4px 10px', cursor: 'pointer', color: c.muted }}>‹</button>
              <button style={{ background: 'none', border: `1px solid ${c.border}`, borderRadius: 6, padding: '4px 10px', cursor: 'pointer', color: c.muted }}>›</button>
            </div>
          </div>

          {/* Day headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, marginBottom: 1 }}>
            {days.map(d => (
              <div key={d} style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: c.muted, textAlign: 'center', padding: '0 0 10px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
            {Array.from({ length: startOffset }).map((_, i) => (
              <div key={`empty-${i}`} style={{ minHeight: 90, background: '#fafaf8', borderRadius: 6 }} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const posts = scheduled[day] || []
              const isToday = day === today
              return (
                <div
                  key={day}
                  onClick={() => setSelectedDay(day === selectedDay ? null : day)}
                  style={{
                    minHeight: 90, padding: '8px 6px',
                    background: selectedDay === day ? '#fff8ef' : isToday ? '#fdf8f2' : '#fafafa',
                    border: `1px solid ${selectedDay === day ? c.gold : isToday ? '#e8d5b0' : c.border}`,
                    borderRadius: 8, cursor: 'pointer', transition: 'border-color 0.15s',
                  }}
                >
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: 12,
                    color: isToday ? c.gold : c.muted, fontWeight: isToday ? 500 : 400,
                    marginBottom: 4,
                  }}>{day}</p>
                  {posts.map((p, j) => (
                    <div key={j} style={{
                      fontSize: 10, fontFamily: 'var(--font-body)',
                      background: p.status === 'draft' ? '#f5f0e8' : '#0e0e0e',
                      color: p.status === 'draft' ? c.muted : '#F5F0E8',
                      borderRadius: 4, padding: '2px 5px', marginBottom: 2,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>{p.time} · {p.title}</div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Queue view */}
      {view === 'queue' && (
        <div style={s.card}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 400, color: c.black, marginBottom: 20 }}>Upload queue</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {queue.map((post, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '16px 0', borderBottom: i < queue.length - 1 ? `1px solid ${c.border}` : 'none' }}>
                <div style={{ width: 44, height: 44, borderRadius: 8, background: typeColor[post.type], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: typeText[post.type], fontWeight: 500 }}>{post.type}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: c.black, margin: '0 0 2px' }}>{post.title}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: c.muted, margin: 0 }}>{post.date} at {post.time}{post.note ? ` · ${post.note}` : ''}</p>
                </div>
                <button style={{ background: 'none', border: `1px solid ${c.border}`, borderRadius: 6, padding: '5px 10px', fontFamily: 'var(--font-body)', fontSize: 12, color: c.muted, cursor: 'pointer' }}>
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}